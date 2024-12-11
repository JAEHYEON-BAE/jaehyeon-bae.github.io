---
layout: page
title: Jekyll
permalink: /jekyll/
categories: jekyll
---
<h1>Technology Posts</h1>
<ul>
  {% assign tag_posts = site.posts | where: "categories", page.categories %}
  {% for post in tag_posts %}
    <li>
      <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
      <span>{{ post.date | date: "%Y-%m-%d" }}</span>
    </li>
  {% endfor %}
</ul>