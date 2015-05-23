curdir := $(shell dirname $(realpath $(lastword $(MAKEFILE_LIST))))

# Functions

lowercase = $(shell echo $1 | tr A-Z a-z)

# Environment

ndk_release := r10
ndk_version := 32
ndk_fullversion := ${ndk_version}-${ndk_release}

sys_name := $(shell uname -s)
sys_name := $(call lowercase,${sys_name})
sys_machine := $(shell uname -m)
sys_fullname := ${sys_name}-${sys_machine}

third_party_path := ${curdir}/third_party

ndk_path := ${third_party_path}/android-ndk
ndk_bin := ${ndk_path}/toolchains/arm-linux-androideabi-4.8/prebuilt/linux-x86_64/bin
ndk_base_url := http://dl.google.com/android/ndk

ojdk_base_url := https://bitbucket.org/alexkasko/openjdk-unofficial-builds/downloads
ojdk_version := 1.7.0-u60-unofficial
ojdk_sys_name := ${sys_fullname}
ojdk_sys_name := $(subst linux-x86_64,linux-amd64,${ojdk_sys_name})
ojdk_sys_name := $(subst linux-i686,linux-i586,${ojdk_sys_name})
ojdk_sys_name := $(subst darwin,macosx,${ojdk_sys_name})

ant_base_url := http://mirror.bbln.org/apache/ant/binaries
ant_version := 1.9.4

ofx_base_url := https://github.com/openframeworks/openFrameworks/archive
ofx_version := 0.8.4

v8_base_url := https://github.com/phantasien/v8/releases/download
v8_version := 3.27.7

droid_sdk_base_url := http://dl.google.com/android
droid_sdk_version := r23.0.2
droid_sdk_sys_name := ${sys_name}
droid_sdk_sys_name := $(subst darwin,macosx,${droid_sdk_sys_name})
droid_sdk_archive_name := android-sdk_${droid_sdk_version}-${droid_sdk_sys_name}.tgz
droid_sdk_archive_name := $(subst macosx.tgz,macosx.zip,${droid_sdk_archive_name})

droid_platform := android-15

ios_sources := $(shell find ${curdir}/src/ios -name "*.cc")
ios_objects := $(foreach source,${ios_sources},$(subst .cc,.o,${source}))
ios_sim_cxx := /Applications/Xcode.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/usr/bin/g++

print:
	@echo ${ios_objects}

all: deps install build

clean:
	@rm -rf src/android/objs src/android/libs src/android/bin

install: droid-platform-install

droid-platform-install:
	@JAVA_HOME=${third_party_path}/openjdk \
	 ${third_party_path}/android-sdk/tools/android \
	   update sdk -u -t ${droid_platform},tools,platform-tools,build-tools-20.0.0

build: jni-build src/android/libs/auryn.jar

src/android/libs/auryn.jar:
	@cd src/android && \
	    JAVA_HOME=${third_party_path}/openjdk \
	    ANDROID_HOME=${third_party_path}/android-sdk \
	    ${third_party_path}/ant/bin/ant release
	@mv src/android/bin/classes.jar src/android/libs/auryn.jar

jni-build: 
	@cd src/android && \
		V8_HOME=${third_party_path}/v8 \
	    JAVA_HOME=${third_party_path}/openjdk \
	    ANDROID_HOME=${third_party_path}/android-sdk \
	    ${ndk_path}/ndk-build

v8-build: v8-dependencies
	 @cd ${third_party_path}/v8 && \
	  make ANDROID_NDK_ROOT=${third_party_path}/android-ndk \
	       CC=${ndk_bin}/arm-linux-androideabi-gcc \
	       CXX={ndk_bin}/arm-linux-androideabi-g++ \
	       AR=${ndk_bin}/arm-linux-androideabi-ar \
	       RANLIB=${ndk_bin}/arm-linux-androideabi-ranlib \
	       android_arm.release i18nsupport=off werror=no -j8

v8-dependencies: ${third_party_path}/depot_tools
	@cd ${third_party_path}/v8 && \
	 make PATH=$$PATH:${third_party_path}/depot_tools \
	      dependencies

ios-sim-lib: ${ios_objects} src/ios/auryn.a

src/ios/auryn.a:
	@ar -cq src/ios/auryn.a ${ios_objects}

src/ios/%.o: src/ios/%.cc
	@$(ios_sim_cxx) -c $< -o $@

deps: ${third_party_path}/v8 \
      ${third_party_path}/openjdk \
      ${third_party_path}/ant \
      ${third_party_path}/android-ndk \
      ${third_party_path}/android-sdk

${third_party_path}/android-ndk: ${third_party_path}/android-ndk.tar.bz2
	@tar -C ${third_party_path} -jxf ${third_party_path}/android-ndk.tar.bz2
	@mv ${third_party_path}/android-ndk-${ndk_release} ${third_party_path}/android-ndk

${third_party_path}/android-ndk.tar.bz2: ${third_party_path}
	@curl -L ${ndk_base_url}/android-ndk${ndk_fullversion}-${sys_fullname}.tar.bz2 \
	      > ${third_party_path}/android-ndk.tar.bz2

${third_party_path}/depot_tools: ${third_party_path}
	@svn checkout http://src.chromium.org/svn/trunk/tools/depot_tools ${third_party_path}/depot_tools

${third_party_path}/v8: ${third_party_path}/v8.tar.bz2
	@tar -C ${third_party_path} -jxf ${third_party_path}/v8.tar.bz2
	@mv ${third_party_path}/v8-${v8_version}-${sys_fullname} ${third_party_path}/v8

${third_party_path}/v8.tar.bz2: ${third_party_path}
	@curl -L ${v8_base_url}/${v8_version}/v8-${v8_version}-${sys_fullname}.tar.bz2 \
	      > ${third_party_path}/v8.tar.bz2

${third_party_path}/openjdk: ${third_party_path}/openjdk.zip
	@unzip -d ${third_party_path} ${third_party_path}/openjdk.zip
	@mv ${third_party_path}/openjdk-${ojdk_version}-${ojdk_sys_name}-image ${third_party_path}/openjdk

${third_party_path}/openjdk.zip: ${third_party_path}
	@-curl -L ${ojdk_base_url}/openjdk-${ojdk_version}-${ojdk_sys_name}-image.zip \
	      > ${third_party_path}/openjdk.zip

${third_party_path}/ant: ${third_party_path}/ant.tar.bz2
	@tar -C ${third_party_path} -jxf ${third_party_path}/ant.tar.bz2
	@mv ${third_party_path}/apache-ant-${ant_version} ${third_party_path}/ant

${third_party_path}/ant.tar.bz2: ${third_party_path}
	@curl -L ${ant_base_url}/apache-ant-${ant_version}-bin.tar.bz2 \
	     > ${third_party_path}/ant.tar.bz2

${third_party_path}/android-sdk: ${third_party_path}/android-sdk.tgz
	@tar -C ${third_party_path} -zxf ${third_party_path}/android-sdk.tgz
	@mv ${third_party_path}/android-sdk-${droid_sdk_sys_name} ${third_party_path}/android-sdk

${third_party_path}/android-sdk.tgz: ${third_party_path}
	@curl -L ${droid_sdk_base_url}/${droid_sdk_archive_name} \
	      > ${third_party_path}/android-sdk.tgz

${third_party_path}/ofx: ${third_party_path}/ofx.tar.gz
	@tar -C ${third_party_path} -zxf ${third_party_path}/ofx.tar.gz
	@mv ${third_party_path}/openFrameworks-${ofx_version} ${third_party_path}/ofx

${third_party_path}/ofx.tar.gz: ${third_party_path}
	@curl -L ${ofx_base_url}/${ofx_version}.tar.gz \
	      > ${third_party_path}/ofx.tar.gz

${third_party_path}:
	@mkdir -p ${third_party_path}

