CURDIR := $(shell pwd)

all: xcodeproj bundle

bundle:
	@xcodebuild -project out/jsc-ios/{{slug project.name}}.xcodeproj

xcodeproj:
	@{{falkor.base}}/deps/bastian/tools/gyp_bastian \
	-Dbastian_engine=jsc -Dbastian_project=${CURDIR} \
	-DOS=ios {{slug project.name}}.gyp

