<template>
  <aside class="filter">
    <form class="filter__form form" action="#" method="get" @submit.prevent="submitFilter">

      <!--///////// Цена /////////-->
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label class="form__label form__label--price" for="filterInputMinPrice">
          <input class="form__input" type="text" name="min-price" v-model.number="currentMinPrice"
                 id="filterInputMinPrice">
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price" for="filterInputMaxPrice">
          <input class="form__input" type="text" name="max-price" v-model.number="currentMaxPrice"
                 id="filterInputMaxPrice">
          <span class="form__value">До</span>
        </label>
      </fieldset>

      <!--///////// Категория /////////-->
      <fieldset class="form__block">
        <legend class="form__legend">Категория</legend>

        <label class="form__label form__label--select" for="filterSelectCategory">
          <transition name="fade" mode="out-in">
            <div v-if="isCategoriesDataLoading"
                 key="isCategoriesDataLoading"
                 class="note__centered transition-fade-duration">
              <fulfilling-bouncing-circle-spinner
                :animation-duration="4000"
                :size="20"
                :color="'#e02d71'"/>
            </div>

            <div v-else-if="categoriesDataLoadingFail"
                 key="categoriesDataLoadingFail"
                 class="note__error transition-fade-duration">
              Произошла ошибка загрузки категорий:<br>
              "{{ categoriesDataLoadingFail }}"<br><br>
              <button type="button" @click.prevent="loadCategoriesData">Попробуйте еще раз</button>
            </div>

            <div v-else
                 key="categoriesData"
                 class="transition-fade-duration">
              <select class="form__select"
                      name="category"
                      id="filterSelectCategory"
                      v-model="currentCategoryId">
                <option value="0">Все категории</option>
                <option v-for="category in categories" :key="category.id" :value="category.id">
                  {{ category.title }}
                </option>
              </select>
            </div>
          </transition>
        </label>
      </fieldset>

      <!--///////// Цвет /////////-->
      <fieldset class="form__block">
        <legend class="form__legend">Цвет</legend>

        <transition name="fade" mode="out-in">
          <div v-if="isColorsDataLoading"
               key="isColorsDataLoading"
               class="note__centered transition-fade-duration">
            <fulfilling-bouncing-circle-spinner
              :animation-duration="4000"
              :size="20"
              :color="'#e02d71'"/>
          </div>

          <div v-else-if="colorsDataLoadingFail"
               key="colorsDataLoadingFail"
               class="note__error transition-fade-duration">
            Произошла ошибка загрузки цветов:<br>
            "{{ colorsDataLoadingFail }}"<br><br>
            <button type="button" @click.prevent="loadColorsData">Попробуйте еще раз</button>
          </div>

          <ul v-else
              key="colorsData"
              class="check-list check-list-color transition-fade-duration">
            <li v-for="color in colors"
                :key="color.id"
                class="check-list__item">
              <label class="check-list__label"
                     :for="'filterInputColor'+color.title"
                     :title="color.title">
                <input class="check-list__check sr-only"
                       type="checkbox"
                       name="color"
                       :id="'filterInputColor'+color.title"
                       :value="color.id"
                       v-model="checkedColors">
                <span class="check-list__desc">
                <span class="check-list__desc__color-round"
                      :style="{'background': color.code}"></span>
              </span>
              </label>
            </li>
          </ul>
        </transition>
      </fieldset>

      <!--///////// Материал /////////-->
      <fieldset class="form__block">
        <legend class="form__legend">Материал</legend>

        <transition name="fade" mode="out-in">
          <div v-if="isMaterialsDataLoading"
               key="isMaterialsDataLoading"
               class="note__centered transition-fade-duration">
            <fulfilling-bouncing-circle-spinner
              :animation-duration="4000"
              :size="20"
              :color="'#e02d71'"/>
          </div>

          <div v-else-if="materialsDataLoadingFail"
               key="materialsDataLoadingFail"
               class="note__error transition-fade-duration">
            Произошла ошибка загрузки материалов:<br>
            "{{ materialsDataLoadingFail }}"<br><br>
            <button type="button" @click.prevent="loadMaterialsData">Попробуйте еще раз</button>
          </div>

          <ul v-else
              key="materialsData"
              class="check-list transition-fade-duration">
            <li class="check-list__item"
                v-for="material in materials" :key="material.id">
              <label class="check-list__label" :for="'filterInputMaterial'+material.code">
                <input class="check-list__check sr-only"
                       type="checkbox"
                       name="material"
                       :id="'filterInputMaterial'+material.code"
                       :value="material.id"
                       v-model="checkedMaterials">
                <span class="check-list__desc">
                {{ material.title }}
                <span>({{ material.productsCount }})</span>
              </span>
              </label>
            </li>
          </ul>
        </transition>
      </fieldset>

      <!--///////// Коллекция /////////-->
      <fieldset class="form__block">
        <legend class="form__legend">Коллекция</legend>

        <transition name="fade" mode="out-in">
          <div v-if="isSeasonsDataLoading"
               key="isSeasonsDataLoading"
               class="note__centered transition-fade-duration">
            <fulfilling-bouncing-circle-spinner
              :animation-duration="4000"
              :size="20"
              :color="'#e02d71'"/>
          </div>

          <div v-else-if="seasonsDataLoadingFail"
               key="seasonsDataLoadingFail"
               class="note__error transition-fade-duration">
            Произошла ошибка загрузки коллекций:<br>
            "{{ seasonsDataLoadingFail }}"<br><br>
            <button type="button" @click.prevent="loadSeasonsData">Попробуйте еще раз</button>
          </div>

          <ul v-else
              key="seasonsData"
              class="check-list transition-fade-duration">
            <li class="check-list__item"
                v-for="season in seasons"
                :key="season.id">
              <label class="check-list__label" :for="'filterInputSeason'+season.code">
                <input class="check-list__check sr-only"
                       type="checkbox"
                       name="collection"
                       :id="'filterInputSeason'+season.code"
                       :value="season.id"
                       v-model="checkedSeasons">
                <span class="check-list__desc">
                    {{ season.title }}
                    <span>({{ season.productsCount }})</span>
                  </span>
              </label>
            </li>
          </ul>
        </transition>
      </fieldset>

      <button class="filter__submit button button--primery" type="submit">
        Применить
      </button>
      <button v-if="isFieldsSet" class="filter__reset button button--second" type="reset"
              @click.prevent="resetFilter">
        Сбросить
      </button>
    </form>
  </aside>
</template>

<script>
import axios from 'axios';
import { FulfillingBouncingCircleSpinner } from 'epic-spinners';
import API_BASE_URL from '@/config';

export default {
  props: ['minPrice', 'maxPrice', 'categoryId', 'page', 'colorIds', 'materialIds', 'seasonIds'],
  components: {
    FulfillingBouncingCircleSpinner,
  },
  data() {
    return {
      currentMinPrice: 0,
      currentMaxPrice: 0,
      currentCategoryId: 0,

      categoriesData: {},
      isCategoriesDataLoading: false,
      categoriesDataLoadingFail: '',

      colorsData: {},
      isColorsDataLoading: false,
      colorsDataLoadingFail: '',
      checkedColors: [],

      materialsData: {},
      isMaterialsDataLoading: false,
      materialsDataLoadingFail: '',
      checkedMaterials: [],

      seasonsData: {},
      isSeasonsDataLoading: false,
      seasonsDataLoadingFail: '',
      checkedSeasons: [],

      isFieldsSet: false,
    };
  },
  computed: {
    categories() {
      return this.categoriesData ? this.categoriesData.items : [];
    },
    colors() {
      return this.colorsData ? this.colorsData.items : [];
    },
    materials() {
      return this.materialsData ? this.materialsData.items : [];
    },
    seasons() {
      return this.seasonsData ? this.seasonsData.items : [];
    },
  },
  methods: {
    submitFilter() {
      this.$emit('update:minPrice', this.currentMinPrice);
      this.$emit('update:maxPrice', this.currentMaxPrice);
      this.$emit('update:categoryId', this.currentCategoryId);
      this.$emit('update:colorIds', this.checkedColors);
      this.$emit('update:materialIds', this.checkedMaterials);
      this.$emit('update:seasonIds', this.checkedSeasons);
      this.$emit('update:page', 1);

      if (this.currentMinPrice > 0
        || this.currentMaxPrice > 0
        || this.currentCategoryId > 0
        || this.checkedColors.length > 0
        || this.checkedMaterials.length > 0
        || this.checkedSeasons.length > 0) {
        this.isFieldsSet = true;
      } else {
        this.isFieldsSet = false;
      }
    },
    resetFilter() {
      this.currentMinPrice = 0;
      this.currentMaxPrice = 0;
      this.currentCategoryId = 0;
      this.checkedColors = [];
      this.checkedMaterials = [];
      this.checkedSeasons = [];
      this.submitFilter();
    },
    async loadCategoriesData() {
      try {
        this.isCategoriesDataLoading = true;
        this.categoriesDataLoadingFail = '';
        const response = await axios({
          method: 'get',
          url: `${API_BASE_URL}/api/productCategories`,
        });
        this.categoriesData = response.data;
      } catch (error) {
        this.categoriesDataLoadingFail = error.message;
      } finally {
        this.isCategoriesDataLoading = false;
      }
    },
    async loadColorsData() {
      try {
        this.isColorsDataLoading = true;
        this.colorsDataLoadingFail = '';
        const response = await axios({
          method: 'get',
          url: `${API_BASE_URL}/api/colors`,
        });
        this.colorsData = response.data;
      } catch (error) {
        this.colorsDataLoadingFail = error.message;
      } finally {
        this.isColorsDataLoading = false;
      }
    },
    async loadMaterialsData() {
      try {
        this.isMaterialsDataLoading = true;
        this.materialsDataLoadingFail = '';
        const response = await axios({
          method: 'get',
          url: `${API_BASE_URL}/api/materials`,
        });
        this.materialsData = response.data;
      } catch (error) {
        this.materialsDataLoadingFail = error.message;
      } finally {
        this.isMaterialsDataLoading = false;
      }
    },
    async loadSeasonsData() {
      try {
        this.isSeasonsDataLoading = true;
        this.seasonsDataLoadingFail = '';
        const response = await axios({
          method: 'get',
          url: `${API_BASE_URL}/api/seasons`,
        });
        this.seasonsData = response.data;
      } catch (error) {
        this.seasonsDataLoadingFail = error.message;
      } finally {
        this.isSeasonsDataLoading = false;
      }
    },
  },
  created() {
    this.loadCategoriesData();
    this.loadColorsData();
    this.loadMaterialsData();
    this.loadSeasonsData();
  },
};
</script>

<style scoped lang="stylus">
.check-list-color
  .check-list__item
    display inline-block
    margin 0
    padding 0 3px

  .check-list__desc
    padding 0

    &::before,
    &::after
      display none

    &__color-round
      display inline-block
      width 22px
      height 22px
      border-radius 50%
      border 2px solid #bfbfbf

  .check-list__check
    &:checked
      + .check-list__desc
        .check-list__desc__color-round
          outline 1px solid #000000
</style>
