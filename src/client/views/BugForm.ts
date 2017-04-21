import * as Vue from 'vue';
import Component from 'vue-class-component';
import { projects, ranks, categories } from '../constants';
import { ajax } from '../utils';

@Component({})
export default class BugFormView extends Vue {
  id = '';
  projects = projects;
  ranks = ranks;
  categories = categories;
  bug: NewBug = {
    title: '',
    project: projects[0].value,
    rank: ranks[0].value,
    category: [],
    desc: '',
    images: [],
  };
  files: ImageFile[] = [];
  error = '';

  async created() {
    const { id } = this.$route.params;
    if (id) {
      const data = await ajax.get(`/bug/${id}`, true);
      Object.assign(this.bug, data.result);
      this.id = id;
    }
  }

  autoHeight(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    setTimeout(() => {
      const height = textarea.scrollHeight + 2; // 2 is for border
      textarea.style.cssText = `height: ${height}px`;
    });
  }

  readFile(file: File) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.files.push({
        file,
        preview: reader.result,
      });
    });
    reader.readAsDataURL(file);
  }

  pickImage(event: Event) {
    const el = event.target as HTMLInputElement;
    const { files } = el;
    for (let file of files as any) {
      this.readFile(file);
    }
    el.value = '';
  }

  pasteImage(event: ClipboardEvent) {
    event.preventDefault();

    const { clipboardData } = event;

    if (clipboardData) {
      const items = clipboardData.items;
      if (items) {
        const types = clipboardData.types || [];
        for (let i = 0; i < types.length; i++) {
          if (types[i] === 'Files') {
            const item = items[i];
            if (item && item.kind === 'file' && item.type.match(/^image\//i)) {
              this.readFile(item.getAsFile() as File);
            }
            break;
          }
        }
      }
    }
  }

  removeFile(index: number) {
    this.files.splice(index, 1);
  }

  removeImage(index: number) {
    this.bug.images.splice(index, 1);
  }

  async submit(event: Event) {
    this.error = '';

    const el = event.target as HTMLFormElement;
    const formData = new FormData(el);
    this.bug.images.forEach(image => formData.append('images[]', image));
    this.files.forEach((file) => {
      formData.append('files[]', file.file);
    });

    const method = this.id ? 'patch' : 'post';
    const url = this.id ? `/bug/${this.id}` : '/bug';

    const data = await ajax[method](url, formData, true);
    if (data.success) {
      this.$router.push('/bug-list');
    } else if (data.error) {
      this.error = data.error;
    }
  }
}
