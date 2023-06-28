<template>
  <div v-if="isWrite">
    <el-form ref="form" label-width="80px">
      <el-form-item label="设备位置">
        <el-select
          size="small"
          style="width: 100%"
          v-model="address"
          clearable
          filterable
          remote
          reserve-keyword
          placeholder="请输入地址"
          :remote-method="autoSearch"
          @change="regeoCode"
          :loading="loading"
        >
          <el-option v-for="item in mapAddrOptions" :key="item.value" :label="item.name" :value="item.value"> </el-option>
        </el-select>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="设备经度">
            <el-input @blur="lonLatChange" size="small" v-model="longitude" placeholder=""></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="设备纬度">
            <el-input @blur="lonLatChange" size="small" v-model="latitude" placeholder=""></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="设备地图">
        <div id="rwMap" class="mapContainer" />
      </el-form-item>
    </el-form>
  </div>
  <div v-else>
    <el-descriptions :column="2" border :labelStyle="{ 'font-weight': 'bold' }">
      <el-descriptions-item label="设备经度">{{longitude}}</el-descriptions-item>
      <el-descriptions-item label="设备纬度">{{latitude}}</el-descriptions-item>
      <el-descriptions-item label="设备位置">{{address}}</el-descriptions-item>
    </el-descriptions>
    <div id="rMap" class="mapContainer" />
  </div>
</template>

<script setup lang="ts">
import AMapLoader from '@amap/amap-jsapi-loader'
import { propTypes } from '@/utils/propTypes'
window._AMapSecurityConfig = {
  securityJsCode: 'df23e76ff4be248ce583def2a848cc63',
}
const state = reactive({
    lonLat : '',
    address : '',
    loading: false,
    //纬度、经度
      latitude: '',
      longitude: '',
      //地图对象
      map: null,
	  mapAddrOptions: [],
	  //标记对象
	  mapMarker:null,
      geocoder: null,
      autoComplete: null,
      //搜索提示
      tips: [],
})
const props = defineProps({
    clickMap: propTypes.boolean.def(false),
    isWrite: propTypes.boolean.def(false),
    center:propTypes.string.def(''),
})
const loadMap=()=> {
    state.address = ''
    state.latitude = ''
    state.longitude = ''
      AMapLoader.load({
        key: 'a6347f91e48a9830a5005eefad6fbff1', // 申请好的Web端开发者Key，首次调用 load 时必填
        version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: [
          //逆解析插件
          'AMap.Geocoder',
          'AMap.AutoComplete',
        ],
      }).then(() => {
        initMap()
        if(props.clickMap){
            state.map.on('click', mapClick())
        }
        initGeocoder()
        initAutoComplete()
		if(''!=props.center){
			regeoCode(props.center)
		}
      })
    }

    const initMap=()=> {
	  let mapId=props.isWrite?'rwMap':'rMap'
      state.map = new AMap.Map(mapId, {
        resizeEnable: true,
        zoom: 11, //地图显示的缩放级别
        keyboardEnable: false,
      })
    }

    const initGeocoder=()=> {
        state.geocoder = new AMap.Geocoder({
        city: '010', //城市设为北京，默认：“全国”
        radius: 500, //范围，默认：500
        extensions: 'all'
      })
    }

    const initAutoComplete=()=> {
      const autoOptions = {
        city: '全国',
        zoom: '',
      }
      state.autoComplete = new AMap.AutoComplete(autoOptions);
    }

    const autoSearch=(queryValue:string)=> {
        state.autoComplete.search(queryValue, (status, result) => {
        var res = result.tips || [] // 搜索成功时，result即是对应的匹配数据
		var temp=[]
		res.forEach((p) => {
			if(p.name,p.location.lng&&p.location.lat){
				temp.push({
					name:p.district + p.name,
					value:p.location.lng + ',' + p.location.lat
				})
			}
		})
		state.mapAddrOptions=temp
      })
    }

    // 地图点击事件
    const mapClick=(e:any)=> {
      if (state.map !== undefined) {
        state.lonLat=e.lnglat.lng + ',' + e.lnglat.lat
        regeoCode(state.lonLat)
      }
    }

    //经纬度转化为地址、添加标记点
    const regeoCode=(lonLat:string)=>{
      if (lonLat) {
        let lnglat = lonLat.split(',')
        this.latitude = lnglat[0]
        this.longitude = lnglat[1]
        this.$emit('locateChange', lnglat)
        this.setMarker(lnglat)
        this.getAddress(lnglat)
      }
    }

    //添加标记点
    const setMarker=(lnglat:any)=> {
      if (lnglat) {
        if (state.mapMarker !== null) {
          // 如果点标记已存在则先移除原点
          state.map.remove(state.mapMarker)
          state.lonLat = ''
        }
        state.mapMarker = new AMap.Marker({
          // 定义点标记对象
          position: new AMap.LngLat(lnglat[0], lnglat[1]),
        })
        state.map.add(state.mapMarker) // 添加点标记在地图上
        state.map.setCenter(lnglat)
        state.map.setZoom(16)
        state.mapMarker.setPosition(lnglat)
      }
    }

    // 把拿到的经纬度转化为地址信息
    const getAddress=(lnglat)=> {
        state.geocoder.getAddress(lnglat, (status, result) => {
        if (status === 'complete' && result.info === 'OK') {
          if (result && result.regeocode) {
			state.address=result.regeocode.formattedAddress
          }
        }
      })
    }

    const lonLatChange=()=> {
	  if (state.longitude != '' && this.latitude != '') {
	    this.regeoCode(this.longitude + ',' + this.latitude)
	  }
	}
onMounted(() => {
    loadMap()
})
</script>
