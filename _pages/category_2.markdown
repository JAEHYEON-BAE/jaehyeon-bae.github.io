---
layout: page
title: category_2
permalink: /category_2/
---

<h1>Menu Test</h1>
<ul>
  {% assign tag_posts = site.posts | where: "categories", "category_2" %}
  {% for post in tag_posts %}
    <li>
      <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
      <span>{{ post.date | date: "%Y-%m-%d" }}</span>
    </li>
  {% endfor %}
</ul>