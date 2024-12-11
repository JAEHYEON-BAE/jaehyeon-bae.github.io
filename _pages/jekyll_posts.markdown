---
layout: page
title: Jekyll Posts
permalink: /jekyll_posts/
---
<h1>Jekyll Posts</h1>
<ul>
  {% assign tag_posts = site.posts | where: "categories", "jekyll_posts" %}
  {% for post in tag_posts %}
    <li>
      <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
      <span>{{ post.date | date: "%Y-%m-%d" }}</span>
    </li>
  {% endfor %}
</ul>