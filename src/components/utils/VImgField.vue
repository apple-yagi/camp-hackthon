<template>
  <div>
    <v-row v-if="uploadedImage" justify="center" align="center">
      <v-sheet width="300">
        <v-img :src="uploadedImage" />
      </v-sheet>
    </v-row>
    <div v-cloak @drop.prevent="addDropFile" @dragover.prevent>
      <v-row justify="center" align="center">
        <v-col cols="11" sm="8" md="6">
          <v-file-input
            v-model="file"
            accept="image/png, image/jpeg, image/jpg, image/bmp"
            prepend-icon="mdi-camera"
            placeholder="画像ファイル(png, jpeg, jpg, bmp)を選択"
          />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  SetupContext,
  ref,
  watch,
} from "@vue/composition-api";

// アップロードを許可する拡張子
const allowExts: string[] = ["jpg", "jpeg", "png", "bmp"];

// ファイル名から拡張子を取得する関数
const getExt = (filename: string): string => {
  const pos = filename.lastIndexOf(".");
  if (pos === -1) {
    return "";
  }
  return filename.slice(pos + 1);
};

// ファイルが許可されている拡張子か確認する関数
const checkExt = (file: File | undefined): boolean => {
  if (file) {
    const ext = getExt(file.name).toLowerCase();
    if (allowExts.indexOf(ext) === -1) {
      return false;
    }
  }
  return true;
};

// 画像ファイルをBase64に変換
const getBase64 = (file: File): Promise<string | ArrayBuffer | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export default defineComponent({
  setup(props, context: SetupContext) {
    const uploadedImage = ref<string | ArrayBuffer | null>(null);
    const file = ref<File | undefined>(undefined);

    const addDropFile = (e: DragEvent) => {
      const dt: DataTransfer | null = e.dataTransfer;
      if (dt) {
        file.value = dt.files[0];
      }
    };

    watch(file, (newFile, oldFile) => {
      if (checkExt(newFile)) {
        if (newFile) {
          getBase64(newFile).then((image: string | ArrayBuffer | null) => {
            uploadedImage.value = image;
            context.emit("change-file", uploadedImage.value);
          });
        } else {
          uploadedImage.value = null;
        }
      } else {
        file.value = oldFile;
        context.emit("error-occurred", "ファイル形式が正しくありません");
      }
    });

    return {
      uploadedImage,
      file,
      addDropFile,
    };
  },
});
</script>

<style scoped>
label > input {
  display: none;
}

label {
  padding: 0 1rem;
  border: solid 1px #888;
}

label::after {
  content: "+";
  font-size: 1rem;
  color: #888;
  padding-left: 1rem;
}
</style>
