module.exports = {
  data() {
    return {
      layout: "layouts/home.njk",
      title: "Blog"
    };
  },
  async render(data) {
    return `<h1>${data.title}</h1>
    <small>${data.meta.description}</small>
    ${data.collections.all.forEach(collection => {
      if(collection.template.frontMatter.data.title) {
        return `<p>${collection.template.frontMatter.data.title}</p>`
      }
    })}
    <p>Hello!</p>
    ${await this.jsImg({ 
      src: "./assets/images/groupe-diplome-sejour-folle.jpg",
      alt: "" 
    })}`;
  }
};