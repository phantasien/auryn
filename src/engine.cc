  // Copyright David Corticchiato
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
// ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
// OR OTHER DEALINGS IN THE SOFTWARE.

#include "src/engine.h"

namespace bastian {

//
// V8 Engine
//


#ifdef BASTIAN_V8

static v8::Isolate* isolate = v8::Isolate::New();
static v8::Isolate::Scope isolatescope(isolate);
static v8::HandleScope handle_scope(isolate);

Handle<Engine> Engine::New(v8_obj_generator obj_generator) {
  V8Engine* engine = new V8Engine(obj_generator);
  Handle<Engine> handle(reinterpret_cast<Engine*>(engine));
  
  return handle;
}

V8Engine::V8Engine(v8_obj_generator obj_generator) {
  obj_generator_ = obj_generator;
}

void V8Engine::Run(const char * raw_source) {}

#endif

//
// JavascriptCore Engine
//


#ifdef BASTIAN_JSC

Handle<Engine> Engine::New(jsc_obj_generator obj_generator) {
  JSCEngine* engine = new JSCEngine(obj_generator);
  Handle<Engine> handle(reinterpret_cast<Engine*>(engine));

  return handle;
}

JSCEngine::JSCEngine(jsc_obj_generator obj_generator) {
  obj_generator_ = obj_generator;  
}

void JSCEngine::Run(const char * raw_source) {}

#endif

}  // namespace bastian
