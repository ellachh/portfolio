/* ============================================================
   experience-loader.js
   reads data.json and builds the experience + activities cards.
   uses the same css classes as the rest of the site, so the
   look is unchanged — only the source of the content moved.
   ============================================================ */
(function () {
  const TAPE = { "": "tape", green: "tape tape--green", blush: "tape tape--blush" };

  // small helper: make an element with an optional class + text
  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;   // textContent = safe, no HTML injection
    return node;
  }

  function bulletList(bullets) {
    const ul = document.createElement("ul");
    (bullets || []).forEach(function (b) {
      if (b && b.trim()) ul.appendChild(el("li", null, b.trim()));
    });
    return ul;
  }

  function cardHead(role, date) {
    const head = el("div", "card__head");
    head.appendChild(el("h3", null, role || ""));
    if (date) head.appendChild(el("span", "card__date", date));
    return head;
  }

  function orgLine(org, link) {
    const p = el("p", "card__org", org || "");
    if (link) {
      const a = el("a", "card__link", "visit \u2192");
      a.href = link;
      a.target = "_blank";
      a.rel = "noopener";
      p.append(" ", a);
    }
    return p;
  }

  function renderExperience(container, items) {
    container.innerHTML = "";
    items.forEach(function (item) {
      const article = el("article", "card");

      const fig = el("figure", "polaroid card__photo");
      fig.appendChild(el("span", TAPE[item.tape] || "tape"));
      const photo = el("div", "photo");
      if (item.image) {
        const img = document.createElement("img");
        img.src = item.image;
        img.alt = item.role || "";
        photo.appendChild(img);
      } else {
        photo.appendChild(el("span", "photo__hint", "add a photo"));
      }
      fig.appendChild(photo);
      article.appendChild(fig);

      const body = el("div", "card__body");
      body.appendChild(cardHead(item.role, item.date));
      body.appendChild(orgLine(item.org, item.link));
      body.appendChild(bulletList(item.bullets));
      article.appendChild(body);

      container.appendChild(article);
    });
  }

  function renderActivities(container, items) {
    container.innerHTML = "";
    items.forEach(function (item) {
      const article = el("article", "mini");
      article.appendChild(cardHead(item.role, item.date));
      article.appendChild(orgLine(item.org, item.link));
      article.appendChild(bulletList(item.bullets));
      container.appendChild(article);
    });
  }

  fetch("data.json")
    .then(function (r) {
      if (!r.ok) throw new Error("data.json not found (status " + r.status + ")");
      return r.json();
    })
    .then(function (data) {
      const exp = document.getElementById("expList");
      const act = document.getElementById("activitiesList");
      if (exp && Array.isArray(data.experience)) renderExperience(exp, data.experience);
      if (act && Array.isArray(data.activities)) renderActivities(act, data.activities);
    })
    .catch(function (err) {
      console.error("Could not load data.json:", err);
    });
})();
