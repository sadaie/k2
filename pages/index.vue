<template>
  <div class="uk-container uk-container-small main-container">
    <h2 class="uk-heading-primary uk-text-center uk-text-bold">石高算出機 弐</h2>
    <form id="main-form" class="uk-grid-small uk-form-stacked" @submit.prevent="submit">
      <div class="uk-width-1-1@s">
        <label class="uk-form-label" for="form-stacked-text">
          お名前
          <span
            uk-icon="icon: question; ratio: 0.8"
            uk-tooltip="title: 結果の表示とTwitterへの投稿時にのみ使用します"
          ></span>
        </label>
        <input
          id="name"
          class="uk-input"
          v-model="name"
          name="name"
          placeholder="例: 松平定家"
          type="text"
        />
      </div>
      <div class="uk-width-1-1@s">
        <label class="uk-form-label" for="form-stacked-text">
          親愛度
          <span
            uk-icon="icon: question; ratio: 0.8"
            uk-tooltip="title: ミリシタの劇場 > アイドル > アイドル詳細 > 徳川まつりを選択すると画面に表示されます"
          ></span>
        </label>
        <div class="uk-form-cntrols">
          <input
            id="closeness"
            class="uk-input"
            v-model="closeness"
            name="closeness"
            placeholder="例: 600000"
            type="text"
          />
        </div>
      </div>
      <div class="uk-width-1-1@s">
        <label class="uk-form-label" for="form-stacked-text">
          ファン数
          <span
            uk-icon="icon: question; ratio: 0.8"
            uk-tooltip="title: ミリシタの劇場 > アイドル > アイドル詳細 > 徳川まつりを選択すると画面に表示されます"
          ></span>
        </label>
        <div class="uk-form-cntrols">
          <input
            id="num-fans"
            class="uk-input"
            v-model="numFans"
            name="numFans"
            placeholder="例: 2000000"
            type="text"
          />
        </div>
      </div>
      <div class="uk-width-1-1@s">
        <label class="uk-form-label" for="form-stacked-text">
          UNI-ON@IR!!!!の姫ランキング順位
          <span
            uk-icon="icon: question; ratio: 0.8"
            uk-tooltip="title: ミリシタのナビ > プロフィール > イベント実績 > UNI-ON@AIR!!!!を選択すると画面にアイドル別実績として表示されます"
          ></span>
        </label>
        <div class="uk-form-controls">
          <input
            id="uoa-rank"
            class="uk-input"
            v-model="uoaRank"
            name="uoaRank"
            placeholder="例: 100"
            type="text"
          />
        </div>
      </div>
      <div class="uk-width-1-1@s">
        <button
          id="submit-button"
          class="uk-button uk-button-primary uk-width-1-1 uk-margin-top bg-matsuri-iro"
          type="submit"
        >算出する</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import UIKit from 'uikit'
import toJapanese from 'jp-num/toJapanese'

class Han {
  region: string
  name: string
  scale: number

  constructor(region: string, name: string, scale: number) {
    this.region = region
    this.name = name
    this.scale = scale
  }
}

const stringData = `加賀,前田,1200000
薩摩,島津,728000
仙台,伊達,620000
尾張,徳川,619500
紀州,徳川,555000
熊本,細川,540000
福岡,黒田,473000
広島,浅野,426000
長州,毛利,360000
佐賀,鍋島,357000
水戸,徳川,350000
津,藤堂,323900
福井,松平,320000
岡山,池田,315000
会津,徳川,280000
徳島,蜂須賀,257000
土佐,山内,240000
彦根,井伊,230000
久留米,有馬,210000
久保田,佐竹,205000
松江,松平,186000`

const data = stringData
  .split('\n')
  .map((l) => l.split(','))
  .map((r) => new Han(r[0], r[1], parseInt(r[2])))
  .reverse()

enum Class {
  Over,
  CloseTo,
  Less
}

function findClosestHan(target: number): [Class, Han | null] {
  if (target < data[0].scale) {
    return [Class.Less, null]
  } else if (target > data[data.length - 1].scale) {
    return [Class.Over, null]
  } else {
    const closest = data.reduce((accm, current) =>
      Math.abs(current.scale - target) < Math.abs(accm.scale - target)
        ? current
        : accm
    )
    return [Class.CloseTo, closest]
  }
}

function calculate_kokudaka(
  closeness: number,
  numFans: number,
  uoaRank: number
): number {
  const a = closeness + numFans - uoaRank * 100000
  if (a <= 300) {
    return (closeness + numFans) / 10
  } else {
    return a
  }
}

export default Vue.extend({
  data() {
    return {
      name: '',
      closeness: '',
      numFans: '',
      uoaRank: ''
    }
  },
  methods: {
    submit() {
      const modal = document.getElementById('result-modal')
      const titleLabel = document.getElementById('result-title')
      const resultLabel = document.getElementById('result-paragraph')
      const closeButton = document.getElementById('close-button')
      const resultButtons = document.getElementById('result-buttons')

      if (modal && titleLabel && resultLabel && closeButton && resultButtons) {
        const tb = document.getElementById('tweet-button')
        if (tb) {
          resultButtons.removeChild(tb)
        }
        
        if (this.closeness && this.numFans && this.uoaRank) {
          let title = "名乗るほどでもない家臣"
          if (this.name) {
            title = this.name
          }
          titleLabel.textContent = title

          const kokudaka = calculate_kokudaka(
            parseInt(this.closeness),
            parseInt(this.numFans),
            parseInt(this.uoaRank)
          )
          const [c, h] = findClosestHan(kokudaka)
          const kansujinized = toJapanese(`${kokudaka}`)
          switch (c) {
            case Class.Over:
              resultLabel.textContent = `${kansujinized}石なのです。加賀の前田さん家よりわんだほーなのです！`
              break
            case Class.Less:
              resultLabel.textContent = `${kansujinized}石なのです。`
              break
            case Class.CloseTo:
              const han = h!
              resultLabel.textContent = `${kansujinized}石なのです。${han.region}の${han.name}さん家くらいなのです。`
              break
            default:
              console.log('must not reach this clause')
              break
          }

          const tweetButton = `<a id="tweet-button" href="https://twitter.com/intent/tweet?text=${title}は${resultLabel.textContent}%0a@sadaie_p%20さんから%0a%0a&url=https://kokudaka.matsuri-hi.me/&hashtags=あなたの石高,徳川まつり,imas_ml" onClick="window.open(encodeURI(decodeURI(this.href)), 'tweetwindow', 'width=650, height=470, personalbar=0, toolbar=0, scrollbars=1, sizable=1'); return false;" rel="nofollow" class="uk-button bg-matsuri-iro uk-margin-left">ツイートする</a>`
          closeButton.insertAdjacentHTML('afterend', tweetButton)
        }
        UIKit.modal(modal).show()
      }
    }
  }
})
</script>
