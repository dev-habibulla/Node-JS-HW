const fs = require("fs/promises");
const { watch } = require("fs");

(async () => {
  let CREATE_MENU = "create menu";
  let CREATE_BANNER = "create banner";
  let CREATE_ABOUT = "create about";

  
  let DELETE_MENU = "delete menu";
  let DELETE_BANNER = "delete banner";
  let DELETE_ABOUT = "delete about";



  let indexPath = "./index.html";
  let myfilePath = "./myfile.txt";

  const initializeHTMLFile = async () => {
    try {
      await fs.access(indexPath);
    } catch (e) {
      const initialContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Dynamic HTML Elements</title>
      <style>
        /* Styles will be added dynamically */
      </style>
    </head>
    <body>
    </body>
    </html>`;
      await fs.writeFile(indexPath, initialContent, "utf-8");
    }
  };

  const appendMenuToHTML = async () => {
    const menuHTML = `
  <div id="menu" style="display: flex; justify-content: center; align-items: center; margin: 0; padding: 10px; font-family: Arial, sans-serif; background-color: #333;">
    <div style="display: flex; list-style-type: none; justify-content: space-around; width: 100%; max-width: 600px;">
      <a href="#home" style="display: block; color: #ffffff; text-decoration: none; padding: 10px 15px; font-weight: bold; text-align: center;">Home</a>
      <a href="#about" style="display: block; color: #ffffff; text-decoration: none; padding: 10px 15px; font-weight: bold; text-align: center;">About</a>
      <a href="#services" style="display: block; color: #ffffff; text-decoration: none; padding: 10px 15px; font-weight: bold; text-align: center;">Services</a>
      <a href="#contact" style="display: block; color: #ffffff; text-decoration: none; padding: 10px 15px; font-weight: bold; text-align: center;">Contact</a>
    </div>
  </div>`;
    await appendToBody(menuHTML);
    console.log("Menu added Done");
  };

  const appendBannerToHTML = async () => {
    const bannerHTML = `
    <div id="banner" style="font-family: Arial, sans-serif; display: flex; justify-content: center; align-items: center; margin: 0; padding: 0; background-color: #f4f4f4;">
      <div style="position: relative; width: 100%; max-width: 1200px; height: 250px; background-image: url('https://via.placeholder.com/1200x300'); background-size: cover; background-position: center; border-radius: 8px;">
        <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); color: #ffffff; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 10px;">
          <h1 style="font-size: 2em; margin: 5px 0;">Welcome to Our Website</h1>
          <p style="font-size: 1em; margin: 5px 0;">Discover amazing services and products with us!</p>
          <a href="#learn-more" style="display: inline-block; background-color: #ff6347; color: #ffffff; padding: 8px 15px; text-decoration: none; font-weight: bold; border-radius: 5px; transition: background-color 0.3s ease;">Learn More</a>
        </div>
      </div>
    </div>`;
    await appendToBody(bannerHTML);
    console.log("Banner added Done");
  };

  const appendAboutToHTML = async () => {
    const aboutHTML = `
    <div id="about" style="display: flex; justify-content: center; align-items: center; margin: 0; padding: 10px; background-color: #f4f4f4; font-family: Arial, sans-serif;">
      <div style="max-width: 800px; background-color: #ffffff; padding: 15px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); text-align: center;">
        <h1 style="font-size: 2em; color: #333; margin: 10px 0;">About Us</h1>
        <p style="font-size: 1em; color: #666; line-height: 1.4; margin: 10px 0;">
          We are a passionate team dedicated to delivering exceptional products and services. Our mission is to provide reliable and efficient services tailored to meet your unique needs.
        </p>
        <img src="https://via.placeholder.com/600x300" alt="About Us Image" style="width: 100%; max-width: 600px; border-radius: 8px; margin-top: 10px;">
      </div>
    </div>`;
    await appendToBody(aboutHTML);
    console.log("About added Done");
  };



  const appendToBody = async (content) => {
    const html = await fs.readFile(indexPath, "utf-8");
    const updatedHTML = html.replace("</body>", `${content}\n</body>`);
    await fs.writeFile(indexPath, updatedHTML, "utf-8");
  };


const removeSectionById = async (id) => {
  const html = await fs.readFile(indexPath, "utf-8");
  const regex = new RegExp(`<div id="${id}".*?</div>`, "gs");
  const updatedHTML = html.replace(regex, "");
  await fs.writeFile(indexPath, updatedHTML, "utf-8");

  console.log(`${id} removed`);
};

const handleFileChange = async () => {
  const content = await fs.readFile(myfilePath, "utf-8");
  if (content.startsWith(CREATE_MENU)) {
    await appendMenuToHTML();
  } else if (content.startsWith(CREATE_BANNER)) {
    await appendBannerToHTML();
  } else if (content.startsWith(CREATE_ABOUT)) {
    await appendAboutToHTML();
  } else if (content.startsWith(DELETE_MENU)) {
    await removeSectionById("menu");
  } else if (content.startsWith(DELETE_BANNER)) {
    await removeSectionById("banner");
  } else if (content.startsWith(DELETE_ABOUT)) {
    await removeSectionById("about");
  } else {
    console.log("No matching action found!");
  }
};


  await initializeHTMLFile();

  watch(myfilePath, async (eventType) => {
    if (eventType === "change") {
      await handleFileChange();
    }
  });
})();
