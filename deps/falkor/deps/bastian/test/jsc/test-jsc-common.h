#ifndef TEST_JSC_COMMON
#define TEST_JSC_COMMON

#include <bastian.h>

#include <JavascriptCore/JavascriptCore.h>
#include <vector>

class TestContext {

  public:
    TestContext();
    void AddFunction(const char * export_name, bastian::jsc_func);
    void RunJS(const char *);

  private:
    std::vector<bastian::jsc_func_export> functions_;
};

#endif