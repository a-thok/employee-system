<template>
  <div class="compact">
    <form class="form" @submit.prevent="submit">
      <p class="alert danger center" :class="{hidden: !error}">{{error}}</p>

      <div class="form-group">
        <label for="title">问题概括：</label>
        <input type="text" class="input block" id="title" name="title" placeholder="使用简短、精确的语言概括您将要提交的问题" v-model.lazy.trim="bug.title" required>
        <small>例：配送表单页需要新增一个收货地址字段、产品详情页的图片尺寸不正确</small>
      </div>

      <div class="form-group">
        <label for="project">所属项目：</label>
        <div class="select">
          <select class="input block" id="project" name="project" v-model="bug.project" required>
            <option v-for="project of projects" :value="project.value">{{project.name}}</option>
          </select>
        </div>
      </div>

      <fieldset class="form-group">
        <legend>重要等级：</legend>
        <label class="radio" v-for="rank of ranks">
          <input type="radio" name="rank" :value="rank.value" v-model="bug.rank">
          <span>{{rank.name}}</span>
        </label>
      </fieldset>

      <fieldset class="form-group">
        <legend for="category">涉及人员：</legend>
        <label class="checkbox" v-for="category of categories">
          <input type="checkbox" name="category[]" :value="category.value" v-model="bug.category">
          <span>{{category.name}}</span>
        </label>
      </fieldset>

      <div class="form-group">
        <label for="desc">详细描述：</label>
        <textarea
          class="input block" id="desc" name="desc" rows="4" placeholder="详尽地描述您将要提交的需求或bug..." required
          v-model.lazy="bug.desc" @keydown="autoHeight"
        ></textarea>
        <small class="form-tip">如果您提交的是bug，请尽可能准确地描述该bug的重现条件</small>
      </div>

      <div class="form-group">
        <label for="images">相关图片：</label>
        <div class="uploader">
          <input type="file" name="images" id="images" multiple accept="image/*" @change="pickImage($event)">

          <div class="previews input block" :class="{'is-empty': !files.length && !bug.images.length}" contenteditable="true" @paste="pasteImage">
            <div class="preview" v-for="(image, i) of bug.images">
              <div class="dim">
                <div class="btn danger" @click.prevent="removeImage(i)">删除</div>
              </div>
              <img class="image" :src="`/${image}`">
            </div>

            <div class="preview" v-for="(file, i) of files">
              <div class="dim">
                <div class="btn danger" @click.prevent="removeFile(i)">删除</div>
              </div>
              <img class="image" :src="file.preview">
            </div>

            <label for="images" class="picker btn primary">选取文件</label>
          </div>
        </div>
      </div>

      <button class="btn block primary">
        {{id ? '修改' : '提交'}}
      </button>
    </form>
  </div>
</template>

<script>
  export { default } from './BugForm';
</script>

<style>
  /* upload image */
  .uploader > input[type="file"] {
    display: none;
  }

  .previews {
    position: relative;
    display: flex !important;
    height: 160px;
    background: #fff;
  }

  .previews.is-empty {
    justify-content: center;
    align-items: center;
  }

  .previews.is-empty::before {
    content: "直接黏贴图片到此处，或点击右下角按钮选择图片";
    color: #999;
  }

  .previews .picker {
    position: absolute;
    right: 0;
    bottom: 0;
    margin: 0;
    font-size: .75em;
  }

  .preview {
    position: relative;
    flex-basis: 140px;
    padding: .3125em;
    border: 1px solid rgba(0, 0, 0, .15);
    margin-right: .625em;
  }

  .preview .image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .preview .dim {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.5s ease;
  }

  .preview:hover .dim {
    visibility: visible;
    opacity: 1;
  }
</style>
