---
layout: page
title: Menu_Test
permalink: /menu_test/
---

<h1>Menu Test</h1>
<ul>
  {% assign tag_posts = site.posts | where: "categories", "menu_test" %}
  {% for post in tag_posts %}
    <li>
      <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
      <span>{{ post.date | date: "%Y-%m-%d" }}</span>
    </li>
  {% endfor %}
</ul>