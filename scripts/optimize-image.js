const fs = require('fs');
const sharp = require('sharp');

/**
 * get images from folder
 * @param folder {string}
 * @param extensions {string[]}
 * @return {string[]}
 */
const getImages = (folder, extensions = ['png', 'jpg', 'jpeg']) => {
    const directories = fs.readdirSync(folder);
    const images = [];
    directories.forEach((directory) => {
        const stat = fs.statSync(`${folder}/${directory}`);
        if (stat.isDirectory()) {
            images.push(...getImages(`${folder}/${directory}`, extensions));
        } else {
            const extension = directory.split('.').pop();
            if (extensions.includes(extension)) {
                images.push(`${folder}/${directory}`);
            }
        }
    });
    return images;
};

/**
 * convert image to webp
 * @param image {string}
 */
const toWebp = (image) => {
    const webp = image.replace(/\.[a-zA-Z]+$/, '.webp');
    if (image.endsWith('.webp') || fs.existsSync(webp)) {
        return;
    }
    void sharp(image)
        .webp({ quality: 100, lossless: true })
        .toFile(webp)
        .then(() => console.log(`${image} converted to ${webp}`))
        .catch((err) => console.log(err));
};

getImages('./public/images').forEach((image) => toWebp(image));
