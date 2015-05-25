CURDIR := $(shell pwd)

lowercase = $(shell echo $1 | tr A-Z a-z)

GYP := ${CURDIR}/deps/bastian/tools/gyp_bastian
SYS_NAME := $(shell uname -s)
SYS_NAME_LOWER := $(call lowercase,${SYS_NAME})
SYS_MACHINE := $(shell uname -m)
ANDROID_NDK_PREBUILT = ${ANDROID_NDK_ROOT}/toolchains/arm-linux-androideabi-4.8/prebuilt/${SYS_NAME_LOWER}-${SYS_MACHINE}


test: test-android

test-android: deps/bastian/out/v8-android_arm
	@cd test/android && \
	V8_HOME=${CURDIR}/deps/bastian/deps/v8 \
	V8_LIBS_PATH=${CURDIR}/out/v8-android_arm/Debug/obj.target/deps/bastian/deps/v8/tools/gyp \
	BASTIAN_HOME=${CURDIR}/deps/bastian \
	BASTIAN_LIBS_PATH=${CURDIR}/out/v8-android_arm/Debug/obj.target/deps/bastian \
	FALKOR_HOME=${CURDIR} \
	FALKOR_LIBS_PATH=${CURDIR}/out/v8-android_arm/Debug/obj.target \
	${ANDROID_NDK_ROOT}/ndk-build
	@ant -q -f ./test/android/build.xml debug -Dsdk.dir=${ANDROID_HOME}

out/v8-android_arm:
	@CC="${ANDROID_NDK_PREBUILT}/bin/arm-linux-androideabi-gcc" \
	CXX="${ANDROID_NDK_PREBUILT}/bin/arm-linux-androideabi-g++" \
	${GYP} -Dbastian_project=${CURDIR} -Dbastian_engine=v8 -Dtarget_arch=arm \
	       -Dandroid_target_platform=15 \
 	       -Darm_version=7 -DOS=android \
	       falkor.gyp
	@AR="${ANDROID_NDK_PREBUILT}/bin/arm-linux-androideabi-ar" \
	RANLIB="${ANDROID_NDK_PREBUILT}/bin/arm-linux-androideabi-ranlib" \
	make -C out/v8-android_arm

.PHONY: test