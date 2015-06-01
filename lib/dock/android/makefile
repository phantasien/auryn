all: jni bundle

bundle:
	@ant debug 2>&1 >> build.log

jni:
	@ANDROID_NDK_ROOT={{android.ndk}} \
	V8_HOME={{falkor.base}}/deps/bastian/deps/v8 \
	BASTIAN_HOME={{falkor.base}}/deps/bastian \
	FALKOR_HOME={{falkor.base}} \
	V8_LIBS_PATH={{falkor.base}}/out/v8-android_arm/Debug/obj.target/deps/bastian/deps/v8/tools/gyp \
	BASTIAN_LIBS_PATH={{falkor.base}}/out/v8-android_arm/Debug/obj.target/deps/bastian \
	FALKOR_LIBS_PATH={{falkor.base}}/out/v8-android_arm/Debug/obj.target \
	{{android.ndk}}/ndk-build 2>&1 >> build.log

.PHONY: jni