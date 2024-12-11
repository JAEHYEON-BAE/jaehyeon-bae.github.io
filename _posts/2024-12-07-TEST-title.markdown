---
layout: post
title: "TEST title"
date: 2024-12-07 10:28:00 +0900
categories: jekyll
---

This is test page. Hello!

'2024'
`2024`

code snippets:

{% highlight python %}
def print_hello()
  print("Hello, world!")
print_hello()
{% endhighlight %}

{% highlight cpp %}
#include <iostream>

int main() {
    std::cout << "Hello, world!" << std::endl;
    return 0;
}
// It writes "Hello, world!" in standard out
{% endhighlight %}

```cpp
#include <iostream>

int main() {
    std::cout << "Hello, world!" << std::endl;
    return 0;
}
// It writes "Hello, world!" in standard out
```

{% highlight cpp %}
int main() {
  std::ios_base::sync_with_stdio(false);
  std::cin.tie(NULL);
  std::cout.tie(NULL);

  int n;
  std::cin >> n;
  std::vector<long long int> p(n);
  long long int result = 0;
  for (int i = 0; i < n; ++i) {
    std::cin >> p[i];
    result += p[i];
  }
  return 0;
}
// example!
/* another comment
example
*/
{% endhighlight %}