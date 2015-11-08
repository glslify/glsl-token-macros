#define NO_VALUE
#define BOOLEAN_TRUE true
#define BOOLEAN_FALSE false
#define    INTEGER 42
#define FLOAT      42.0
#define VECTOR vec3(4)
#define TERMINATED vec4(0);
#define WRAPPED_PARENS        (vec4(0, 0, 2, 3))
#define ONE_ARGUMENT(a)      a * 0.5 + 0.5
#define ONE_ARGUMENT_WITH_FUNCTION(a) race(a) * 0.5 + 0.5
#define TWO_ARGUMENT(a, b) (a * 0.5 + b)
#define TWO_ARGUMENT_WITH_FUNCTION(a, b)    (race(b) * 0.5 + race(a))
#pragma DISTRACTION
#ifdef NO_VALUE
  #define NESTED_NO_VALUE
  #define NESTED_VALUE 42
  #define NESTED_ARGUMENT(a) (a * 0.5 + 0.5)
#endif
