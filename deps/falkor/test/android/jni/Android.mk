LOCAL_PATH := $(call my-dir)

# V8
include $(CLEAR_VARS)
LOCAL_MODULE    := v8-base
LOCAL_SRC_FILES := $(V8_LIBS_PATH)/libv8_base.a
include $(PREBUILT_STATIC_LIBRARY)

include $(CLEAR_VARS)
LOCAL_MODULE    := v8-libbase
LOCAL_SRC_FILES := $(V8_LIBS_PATH)/libv8_libbase.a
include $(PREBUILT_STATIC_LIBRARY)

include $(CLEAR_VARS)
LOCAL_MODULE    := v8-snapshot
LOCAL_SRC_FILES := $(V8_LIBS_PATH)/libv8_snapshot.a
include $(PREBUILT_STATIC_LIBRARY)

include $(CLEAR_VARS)
LOCAL_MODULE    := v8-platform
LOCAL_SRC_FILES := $(V8_LIBS_PATH)/libv8_libplatform.a
include $(PREBUILT_STATIC_LIBRARY)


# BASTIAN
include $(CLEAR_VARS)
LOCAL_MODULE    := bastian
LOCAL_SRC_FILES := $(BASTIAN_LIBS_PATH)/libbastian.a
LOCAL_STATIC_LIBRARIES += v8-base v8-libbase v8-platform v8-snapshot
include $(PREBUILT_STATIC_LIBRARY)


# FALKOR
include $(CLEAR_VARS)
LOCAL_MODULE    := falkor
LOCAL_SRC_FILES := $(FALKOR_LIBS_PATH)/libfalkor.a
LOCAL_STATIC_LIBRARIES += bastian
include $(PREBUILT_STATIC_LIBRARY)


# Falkor test

include $(CLEAR_VARS)


LOCAL_MODULE := falkor-test
LOCAL_SRC_FILES := main.cc
LOCAL_C_INCLUDES += $(FALKOR_HOME)/include $(BASTIAN_HOME)/include $(V8_HOME)/include
LOCAL_STATIC_LIBRARIES += falkor
LOCAL_WHOLE_STATIC_LIBRARIES := libstlport_static
LOCAL_CFLAGS := -DBASTIAN_V8
LOCAL_LDLIBS := -llog
include $(BUILD_SHARED_LIBRARY)