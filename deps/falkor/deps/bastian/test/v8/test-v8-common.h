#ifndef TEST_V8_COMMON
#define TEST_V8_COMMON

#include <v8.h>

class TestContext {

  public:
    TestContext();
    void AddFunction(const char *, void (*func)(const v8::FunctionCallbackInfo<v8::Value>&));
    void RunJS(const char *);

  private:
    v8::Handle<v8::ObjectTemplate> global_;
};

#endif