module.exports = {
  extends: [
    "../base",
    "plugin:vue/vue3-essential",
  ],
  rules: {
    "vue/block-order": [
      "error",
      {
        order: ["script", "template", "style"],
      },
    ],
  }
};
