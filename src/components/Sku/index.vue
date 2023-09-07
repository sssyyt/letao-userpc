//规格显示图片
<template>
  <div class="skulist-sku">
    <!-- <dl v-for="item in skulist.skulist" :key="item.id">
      <dt>{{ item.name }}</dt> -->
    <dd>
      <template v-for="onesku in skulist " :key="onesku.id">
        <!-- <img :class="{ selected: onesku.selected, disabled: onesku.disabled }" @click="clickSpecs(onesku)" -->
        <!-- v-if="onesku.hasImage" :src="onesku.hasImage" /> -->
        <!-- <img :class="{ selected: onesku.selected, disabled: onesku.disabled }" @click="clickSpecs(onesku)" -->
        <!-- v-else :src="onesku.hasImage" /> -->
        <span :class="{ selected: onesku.selected, disabled: onesku.disabled }" @click="clickSpecs(onesku)">{{
          onesku.skuName
        }}</span>
      </template>
    </dd>
    <!-- </dl> -->
  </div>
</template>


<script>
import { watchEffect } from 'vue'
import { ref } from 'vue'

//const spliter = '★'
// 根据skus数据得到路径字典对象
const selectsku = ref({})
// 初始化禁用状态
function initDisabledStatus(skulist) {
  if (skulist && skulist.length > 0) {
    //初始化selected未选择，disabled未禁用
    skulist.map(v => { return { ...v, selected: 0, disabled: 0 } })
    skulist.forEach(onesku => {
      if (onesku.stock === 0)
        onesku.disabled = 1
    })
  }
  //console.log('初始化禁用状态', skulist, selectsku);
}

function updateSelect(skulist) {
  selectsku.value = null
  skulist.forEach(onesku => {
    if (onesku.selected) {
      selectsku.value = onesku
    }

  })
  //console.log('更新选择状态', skulist, selectsku);

}



// 更新按钮的禁用状态
// const updateDisabledStatus = (skulist) => {
//   // 遍历每一种规格

//     // 遍历每一个按钮
//     skulist.forEach(onesku => {
//       if (!onesku.selected) {

//         const key = selectedArr.filter(value => value).join(spliter)
//         onesku.disabled = !pathMap[key]
//       }
//     })
//   }



export default {
  //name: 'GoodSku',
  props: {
    skulist: {
      type: Array,
      default: () => []
    }

  },
  emits: ['change'],
  setup(props, { emit }) {
    // console.log('参数传进来了吗', props.skulist);
    watchEffect(() => {

      initDisabledStatus(props.skulist)
    })

    const clickSpecs = (onesku) => {
      if (onesku.disabled) return false
      // 选中与取消选中逻辑
      if (onesku.selected) {
        onesku.selected = false
      } else {
        props.skulist.forEach(bv => { bv.selected = false })
        onesku.selected = true
      }
      // 点击之后再次更新选中状态
      updateSelect(props.skulist)
      // updateDisabledStatus(props.skulist)
      // 把选择的sku信息传出去给父组件
      // 触发change事件将sku数据传递出去
      //const selectedArr = getSelectedArr(props.skulist).filter(value => value)
      // 如果选中得规格数量和传入得规格总数相等则传出完整信息(都选择了)
      // 否则传出空对象
      //console.log('更新完selectsku啦', selectsku.value);


      if (selectsku.value !== null) {
       // console.log('传递数据给父组件', selectsku.value);
        emit('change', {
          id: selectsku.value.id,
          price: selectsku.value.price,
          stock: selectsku.value.stock,
          skuName: selectsku.value.skuName,
          hasImage: selectsku.value.hasImage,
          descript: selectsku.value.descript,

        })
      } else {
       // console.log('传递数据给父组件的是空对象啊', selectsku.value);
        emit('change', {})

      }
    }
    return { clickSpecs }
  }
}
</script>

<style scoped lang="scss">
@mixin sku-state-mixin {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;

  &.selected {
    border-color: $letaoColor;
  }

  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}

.skulist-sku {
  padding-left: 10px;
  padding-top: 20px;


  dd {
    flex: 1;
    color: #666;

    >img {
      width: 50px;
      height: 50px;
      margin-bottom: 4px;
      @include sku-state-mixin;
    }

    >span {
      display: inline-block;
      height: 30px;
      line-height: 28px;
      padding: 0 20px;
      margin-bottom: 4px;
      @include sku-state-mixin;
    }
  }

}
</style>