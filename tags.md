---
layout: page
title: Tags
permalink: /tags/
---

{% for tag in site.tags %}
<a href="?tag={{ tag | first }}"> {{ tag | first }}</a>
{% endfor %}
