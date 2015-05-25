#include <v8.h>
#include <functional>
#include <bastian.h>
#include "test-v8-common.h"


TestContext::TestContext() {
  global_ = v8::ObjectTemplate::New(v8::Isolate::GetCurrent());
}

void TestContext::AddFunction(const char * export_name, void (*func)(const v8::FunctionCallbackInfo<v8::Value>&)) {
  global_->Set(
    v8::String::NewFromUtf8(v8::Isolate::GetCurrent(), export_name),
    v8::FunctionTemplate::New(v8::Isolate::GetCurrent(), func));
}

void TestContext::RunJS(const char * rawSource) {
  // Create a new context.
  v8::Local<v8::Context> context = v8::Context::New(v8::Isolate::GetCurrent(), NULL, global_);

  // Enter the context for compiling and running the hello world script.
  v8::Context::Scope context_scope(context);

  v8::Local<v8::String> source = v8::String::NewFromUtf8(v8::Isolate::GetCurrent(), rawSource);
  v8::Local<v8::Script> script = v8::Script::Compile(source);

  script->Run();
}
