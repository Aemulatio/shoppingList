import md5 from "md5"

export const generateScopedName = (name: string, filename: string) => {
    const regex = /\/(\w*)\./;
    const fileName = [...filename.match(regex)];
    const newClassName = `${fileName[fileName.length - 1]}_${name}_`;
    const hash = md5(newClassName);

    return newClassName + hash.slice(0, 6);
};
