## 说明文档

### 主要用途

储存gulp的测试用例

### 主要功能

* [YUIODC]

#### YUIODC

> gulp yuidoc
> gulp yuidoc:watch 

jsdocoutput是输出文件夹

http://jerryni.github.io/gulp/jsdocoutput/index.html

这里有个问题git page 不支持下划线(_)的html路径

如 _Users_nirizhe_GitHub_Gulp_src_js_measureJS.js.html，所以yuidoc的没法直接链接如js源文件

## 更新日志

151207: 增加imagemin, 无损压缩(sho实践的成果)

在`src/images`文件夹, 放入图片, 生成到`images/dist/`文件夹中:

![imagemin]


[imagemin]: images/gulp-imagemin.png
[YUIODC]:#user-content-yuiodc
