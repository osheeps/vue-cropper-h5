var K=Object.defineProperty,Q=Object.defineProperties;var _=Object.getOwnPropertyDescriptors;var T=Object.getOwnPropertySymbols;var ee=Object.prototype.hasOwnProperty,te=Object.prototype.propertyIsEnumerable;var N=(n,v,E)=>v in n?K(n,v,{enumerable:!0,configurable:!0,writable:!0,value:E}):n[v]=E,W=(n,v)=>{for(var E in v||(v={}))ee.call(v,E)&&N(n,E,v[E]);if(T)for(var E of T(v))te.call(v,E)&&N(n,E,v[E]);return n},L=(n,v)=>Q(n,_(v));(function(n,v){typeof exports=="object"&&typeof module!="undefined"?module.exports=v(require("vue")):typeof define=="function"&&define.amd?define(["vue"],v):(n=typeof globalThis!="undefined"?globalThis:n||self,n.H5Cropper=v(n.Vue))})(this,function(n){"use strict";var v="";const E={};E.getData=e=>new Promise((t,i)=>{let o={};(function(s){let h=null;return new Promise((r,a)=>{if(s.src)if(/^data\:/i.test(s.src))h=function(d){d=d.replace(/^data\:([^\;]+)\;base64,/gim,"");for(var u=atob(d),m=u.length,g=new ArrayBuffer(m),w=new Uint8Array(g),f=0;f<m;f++)w[f]=u.charCodeAt(f);return g}(s.src),r(h);else if(/^blob\:/i.test(s.src)){var l=new FileReader;l.onload=function(d){h=d.target.result,r(h)},function(d,u){var m=new XMLHttpRequest;m.open("GET",d,!0),m.responseType="blob",m.onload=function(g){this.status!=200&&this.status!==0||u(this.response)},m.send()}(s.src,function(d){l.readAsArrayBuffer(d)})}else{var c=new XMLHttpRequest;c.onload=function(){if(this.status!=200&&this.status!==0)throw"Could not load image";h=c.response,r(h),c=null},c.open("GET",s.src,!0),c.responseType="arraybuffer",c.send(null)}else a("img error")})})(e).then(s=>{o.arrayBuffer=s,o.orientation=function(h){var r,a,l,c,d,u,m,g,w,f=new DataView(h),p=f.byteLength;if(f.getUint8(0)===255&&f.getUint8(1)===216)for(g=2;g<p;){if(f.getUint8(g)===255&&f.getUint8(g+1)===225){u=g;break}g++}if(u&&(a=u+10,function(C,b,y){var x,S="";for(x=b,y+=b;x<y;x++)S+=String.fromCharCode(C.getUint8(x));return S}(f,u+4,4)==="Exif"&&((c=(d=f.getUint16(a))===18761)||d===19789)&&f.getUint16(a+2,c)===42&&(l=f.getUint32(a+4,c))>=8&&(m=a+l)),m){for(p=f.getUint16(m,c),w=0;w<p;w++)if(g=m+12*w+2,f.getUint16(g,c)===274){g+=8,r=f.getUint16(g,c);break}}return r}(s),t(o)}).catch(s=>{i(s)})});const B=n.defineComponent({data:function(){return{w:0,h:0,scale:1,x:0,y:0,loading:!0,trueWidth:0,trueHeight:0,move:!0,moveX:0,moveY:0,crop:!1,cropping:!1,cropW:0,cropH:0,cropOldW:0,cropOldH:0,canChangeX:!1,canChangeY:!1,changeCropTypeX:1,changeCropTypeY:1,cropX:0,cropY:0,cropChangeX:0,cropChangeY:0,cropOffsertX:0,cropOffsertY:0,support:"",touches:[],touchNow:!1,rotate:0,isIos:!1,orientation:0,imgs:"",coe:.2,scaling:!1,scalingSet:"",coeStatus:"",isCanShow:!0}},props:{img:{type:[String,Blob,null,File],default:""},outputSize:{type:Number,default:1},outputType:{type:String,default:"jpeg"},info:{type:Boolean,default:!0},canScale:{type:Boolean,default:!0},autoCrop:{type:Boolean,default:!1},autoCropWidth:{type:[Number,String],default:0},autoCropHeight:{type:[Number,String],default:0},fixed:{type:Boolean,default:!1},fixedNumber:{type:Array,default:()=>[1,1]},fixedBox:{type:Boolean,default:!1},full:{type:Boolean,default:!1},canMove:{type:Boolean,default:!0},canMoveBox:{type:Boolean,default:!0},original:{type:Boolean,default:!1},centerBox:{type:Boolean,default:!1},high:{type:Boolean,default:!0},infoTrue:{type:Boolean,default:!1},maxImgSize:{type:[Number,String],default:2e3},enlarge:{type:[Number,String],default:1},preW:{type:[Number,String],default:0},mode:{type:String,default:"contain"},limitMinSize:{type:[Number,Array,String],default:()=>10}},computed:{cropInfo(){let e={};if(e.top=this.cropOffsertY>21?"-21px":"0px",e.width=this.cropW>0?this.cropW:0,e.height=this.cropH>0?this.cropH:0,this.infoTrue){let t=1;this.high&&!this.full&&(t=window.devicePixelRatio),this.enlarge!==1&!this.full&&(t=Math.abs(Number(this.enlarge))),e.width=e.width*t,e.height=e.height*t,this.full&&(e.width=e.width/this.scale,e.height=e.height/this.scale)}return e.width=e.width.toFixed(0),e.height=e.height.toFixed(0),e},isIE:()=>!!window.ActiveXObject||"ActiveXObject"in window,passive(){return this.isIE?null:{passive:!1}}},watch:{img(){this.checkedImg()},imgs(e){e!==""&&this.reload()},cropW(){this.showPreview()},cropH(){this.showPreview()},cropOffsertX(){this.showPreview()},cropOffsertY(){this.showPreview()},scale(e,t){this.showPreview()},x(){this.showPreview()},y(){this.showPreview()},autoCrop(e){e&&this.goAutoCrop()},autoCropWidth(){this.autoCrop&&this.goAutoCrop()},autoCropHeight(){this.autoCrop&&this.goAutoCrop()},mode(){this.checkedImg()},rotate(){this.showPreview(),(this.autoCrop||this.cropW>0||this.cropH>0)&&this.goAutoCrop(this.cropW,this.cropH)}},methods:{getVersion(e){var t=navigator.userAgent.split(" "),i="";let o=0;const s=new RegExp(e,"i");for(var h=0;h<t.length;h++)s.test(t[h])&&(i=t[h]);return o=i?i.split("/")[1].split("."):["0","0","0"],o},checkOrientationImage(e,t,i,o){if(this.getVersion("chrome")[0]>=81)t=-1;else if(this.getVersion("safari")[0]>=605){const r=this.getVersion("version");r[0]>13&&r[1]>1&&(t=-1)}else{const r=navigator.userAgent.toLowerCase().match(/cpu iphone os (.*?) like mac os/);if(r){let a=r[1];a=a.split("_"),(a[0]>13||a[0]>=13&&a[1]>=4)&&(t=-1)}}let s=document.createElement("canvas"),h=s.getContext("2d");switch(h.save(),t){case 2:s.width=i,s.height=o,h.translate(i,0),h.scale(-1,1);break;case 3:s.width=i,s.height=o,h.translate(i/2,o/2),h.rotate(180*Math.PI/180),h.translate(-i/2,-o/2);break;case 4:s.width=i,s.height=o,h.translate(0,o),h.scale(1,-1);break;case 5:s.height=i,s.width=o,h.rotate(.5*Math.PI),h.scale(1,-1);break;case 6:s.width=o,s.height=i,h.translate(o/2,i/2),h.rotate(90*Math.PI/180),h.translate(-i/2,-o/2);break;case 7:s.height=i,s.width=o,h.rotate(.5*Math.PI),h.translate(i,-o),h.scale(-1,1);break;case 8:s.height=i,s.width=o,h.translate(o/2,i/2),h.rotate(-90*Math.PI/180),h.translate(-i/2,-o/2);break;default:s.width=i,s.height=o}h.drawImage(e,0,0,i,o),h.restore(),s.toBlob(r=>{let a=URL.createObjectURL(r);URL.revokeObjectURL(this.imgs),this.imgs=a},"image/"+this.outputType,1)},checkedImg(){if(this.img===null||this.img==="")return this.imgs="",void this.clearCrop();this.loading=!0,this.scale=1,this.rotate=0,this.clearCrop();let e=new Image;if(e.onload=()=>{if(this.img==="")return this.$emit("imgLoad","error"),this.$emit("img-load","error"),!1;let i=e.width,o=e.height;E.getData(e).then(s=>{this.orientation=s.orientation||1;let h=Number(this.maxImgSize);!this.orientation&&i<h&o<h?this.imgs=this.img:(i>h&&(o=o/i*h,i=h),o>h&&(i=i/o*h,o=h),this.checkOrientationImage(e,this.orientation,i,o))})},e.onerror=()=>{this.$emit("imgLoad","error"),this.$emit("img-load","error")},this.img.substr(0,4)!=="data"&&(e.crossOrigin=""),this.isIE){var t=new XMLHttpRequest;t.onload=function(){var i=URL.createObjectURL(this.response);e.src=i},t.open("GET",this.img,!0),t.responseType="blob",t.send()}else e.src=this.img},startMove(e){if(e.preventDefault(),this.move&&!this.crop){if(!this.canMove)return!1;this.moveX=("clientX"in e?e.clientX:e.touches[0].clientX)-this.x,this.moveY=("clientY"in e?e.clientY:e.touches[0].clientY)-this.y,e.touches?(window.addEventListener("touchmove",this.moveImg),window.addEventListener("touchend",this.leaveImg),e.touches.length==2&&(this.touches=e.touches,window.addEventListener("touchmove",this.touchScale),window.addEventListener("touchend",this.cancelTouchScale))):(window.addEventListener("mousemove",this.moveImg),window.addEventListener("mouseup",this.leaveImg)),this.$emit("imgMoving",{moving:!0,axis:this.getImgAxis()}),this.$emit("img-moving",{moving:!0,axis:this.getImgAxis()})}else this.cropping=!0,window.addEventListener("mousemove",this.createCrop),window.addEventListener("mouseup",this.endCrop),window.addEventListener("touchmove",this.createCrop),window.addEventListener("touchend",this.endCrop),this.cropOffsertX=e.offsetX?e.offsetX:e.touches[0].pageX-this.$refs.cropper.offsetLeft,this.cropOffsertY=e.offsetY?e.offsetY:e.touches[0].pageY-this.$refs.cropper.offsetTop,this.cropX="clientX"in e?e.clientX:e.touches[0].clientX,this.cropY="clientY"in e?e.clientY:e.touches[0].clientY,this.cropChangeX=this.cropOffsertX,this.cropChangeY=this.cropOffsertY,this.cropW=0,this.cropH=0},touchScale(e){e.preventDefault();let t=this.scale;var i=this.touches[0].clientX,o=this.touches[0].clientY,s=e.touches[0].clientX,h=e.touches[0].clientY,r=this.touches[1].clientX,a=this.touches[1].clientY,l=e.touches[1].clientX,c=e.touches[1].clientY,d=Math.sqrt(Math.pow(i-r,2)+Math.pow(o-a,2)),u=Math.sqrt(Math.pow(s-l,2)+Math.pow(h-c,2))-d,m=1,g=(m=(m=m/this.trueWidth>m/this.trueHeight?m/this.trueHeight:m/this.trueWidth)>.1?.1:m)*u;if(!this.touchNow){if(this.touchNow=!0,u>0?t+=Math.abs(g):u<0&&t>Math.abs(g)&&(t-=Math.abs(g)),this.touches=e.touches,setTimeout(()=>{this.touchNow=!1},8),!this.checkoutImgAxis(this.x,this.y,t))return!1;this.scale=t}},cancelTouchScale(e){window.removeEventListener("touchmove",this.touchScale)},moveImg(e){if(e.preventDefault(),e.touches&&e.touches.length===2)return this.touches=e.touches,window.addEventListener("touchmove",this.touchScale),window.addEventListener("touchend",this.cancelTouchScale),window.removeEventListener("touchmove",this.moveImg),!1;let t,i,o="clientX"in e?e.clientX:e.touches[0].clientX,s="clientY"in e?e.clientY:e.touches[0].clientY;t=o-this.moveX,i=s-this.moveY,this.$nextTick(()=>{if(this.centerBox){let h,r,a,l,c=this.getImgAxis(t,i,this.scale),d=this.getCropAxis(),u=this.trueHeight*this.scale,m=this.trueWidth*this.scale;switch(this.rotate){case 1:case-1:case 3:case-3:h=this.cropOffsertX-this.trueWidth*(1-this.scale)/2+(u-m)/2,r=this.cropOffsertY-this.trueHeight*(1-this.scale)/2+(m-u)/2,a=h-u+this.cropW,l=r-m+this.cropH;break;default:h=this.cropOffsertX-this.trueWidth*(1-this.scale)/2,r=this.cropOffsertY-this.trueHeight*(1-this.scale)/2,a=h-m+this.cropW,l=r-u+this.cropH}c.x1>=d.x1&&(t=h),c.y1>=d.y1&&(i=r),c.x2<=d.x2&&(t=a),c.y2<=d.y2&&(i=l)}this.x=t,this.y=i,this.$emit("imgMoving",{moving:!0,axis:this.getImgAxis()}),this.$emit("img-moving",{moving:!0,axis:this.getImgAxis()})})},leaveImg(e){window.removeEventListener("mousemove",this.moveImg),window.removeEventListener("touchmove",this.moveImg),window.removeEventListener("mouseup",this.leaveImg),window.removeEventListener("touchend",this.leaveImg),this.$emit("imgMoving",{moving:!1,axis:this.getImgAxis()}),this.$emit("img-moving",{moving:!1,axis:this.getImgAxis()})},scaleImg(){this.canScale&&window.addEventListener(this.support,this.changeSize,this.passive)},cancelScale(){this.canScale&&window.removeEventListener(this.support,this.changeSize)},changeSize(e){e.preventDefault();let t=this.scale;var i=e.deltaY||e.wheelDelta;i=navigator.userAgent.indexOf("Firefox")>0?30*i:i,this.isIE&&(i=-i);var o=this.coe,s=(o=o/this.trueWidth>o/this.trueHeight?o/this.trueHeight:o/this.trueWidth)*i;s<0?t+=Math.abs(s):t>Math.abs(s)&&(t-=Math.abs(s));let h=s<0?"add":"reduce";if(h!==this.coeStatus&&(this.coeStatus=h,this.coe=.2),this.scaling||(this.scalingSet=setTimeout(()=>{this.scaling=!1,this.coe=this.coe+=.01},50)),this.scaling=!0,!this.checkoutImgAxis(this.x,this.y,t))return!1;this.scale=t},changeScale(e){let t=this.scale;e=e||1;var i=20;if((e*=i=i/this.trueWidth>i/this.trueHeight?i/this.trueHeight:i/this.trueWidth)>0?t+=Math.abs(e):t>Math.abs(e)&&(t-=Math.abs(e)),!this.checkoutImgAxis(this.x,this.y,t))return!1;this.scale=t},createCrop(e){e.preventDefault();var t="clientX"in e?e.clientX:e.touches?e.touches[0].clientX:0,i="clientY"in e?e.clientY:e.touches?e.touches[0].clientY:0;this.$nextTick(()=>{var o=t-this.cropX,s=i-this.cropY;if(o>0?(this.cropW=o+this.cropChangeX>this.w?this.w-this.cropChangeX:o,this.cropOffsertX=this.cropChangeX):(this.cropW=this.w-this.cropChangeX+Math.abs(o)>this.w?this.cropChangeX:Math.abs(o),this.cropOffsertX=this.cropChangeX+o>0?this.cropChangeX+o:0),this.fixed){var h=this.cropW/this.fixedNumber[0]*this.fixedNumber[1];h+this.cropOffsertY>this.h?(this.cropH=this.h-this.cropOffsertY,this.cropW=this.cropH/this.fixedNumber[1]*this.fixedNumber[0],this.cropOffsertX=o>0?this.cropChangeX:this.cropChangeX-this.cropW):this.cropH=h,this.cropOffsertY=this.cropOffsertY}else s>0?(this.cropH=s+this.cropChangeY>this.h?this.h-this.cropChangeY:s,this.cropOffsertY=this.cropChangeY):(this.cropH=this.h-this.cropChangeY+Math.abs(s)>this.h?this.cropChangeY:Math.abs(s),this.cropOffsertY=this.cropChangeY+s>0?this.cropChangeY+s:0)})},changeCropSize(e,t,i,o,s){e.preventDefault(),window.addEventListener("mousemove",this.changeCropNow),window.addEventListener("mouseup",this.changeCropEnd),window.addEventListener("touchmove",this.changeCropNow),window.addEventListener("touchend",this.changeCropEnd),this.canChangeX=t,this.canChangeY=i,this.changeCropTypeX=o,this.changeCropTypeY=s,this.cropX="clientX"in e?e.clientX:e.touches[0].clientX,this.cropY="clientY"in e?e.clientY:e.touches[0].clientY,this.cropOldW=this.cropW,this.cropOldH=this.cropH,this.cropChangeX=this.cropOffsertX,this.cropChangeY=this.cropOffsertY,this.fixed&&this.canChangeX&&this.canChangeY&&(this.canChangeY=0),this.$emit("change-crop-size",{width:this.cropW,height:this.cropH})},changeCropNow(e){e.preventDefault();var t="clientX"in e?e.clientX:e.touches?e.touches[0].clientX:0,i="clientY"in e?e.clientY:e.touches?e.touches[0].clientY:0;let o=this.w,s=this.h,h=0,r=0;if(this.centerBox){let a=this.getImgAxis(),l=a.x2,c=a.y2;h=a.x1>0?a.x1:0,r=a.y1>0?a.y1:0,o>l&&(o=l),s>c&&(s=c)}this.$nextTick(()=>{var a=t-this.cropX,l=i-this.cropY;if(this.canChangeX&&(this.changeCropTypeX===1?this.cropOldW-a>0?(this.cropW=o-this.cropChangeX-a<=o-h?this.cropOldW-a:this.cropOldW+this.cropChangeX-h,this.cropOffsertX=o-this.cropChangeX-a<=o-h?this.cropChangeX+a:h):(this.cropW=Math.abs(a)+this.cropChangeX<=o?Math.abs(a)-this.cropOldW:o-this.cropOldW-this.cropChangeX,this.cropOffsertX=this.cropChangeX+this.cropOldW):this.changeCropTypeX===2&&(this.cropOldW+a>0?(this.cropW=this.cropOldW+a+this.cropOffsertX<=o?this.cropOldW+a:o-this.cropOffsertX,this.cropOffsertX=this.cropChangeX):(this.cropW=o-this.cropChangeX+Math.abs(a+this.cropOldW)<=o-h?Math.abs(a+this.cropOldW):this.cropChangeX-h,this.cropOffsertX=o-this.cropChangeX+Math.abs(a+this.cropOldW)<=o-h?this.cropChangeX-Math.abs(a+this.cropOldW):h))),this.canChangeY&&(this.changeCropTypeY===1?this.cropOldH-l>0?(this.cropH=s-this.cropChangeY-l<=s-r?this.cropOldH-l:this.cropOldH+this.cropChangeY-r,this.cropOffsertY=s-this.cropChangeY-l<=s-r?this.cropChangeY+l:r):(this.cropH=Math.abs(l)+this.cropChangeY<=s?Math.abs(l)-this.cropOldH:s-this.cropOldH-this.cropChangeY,this.cropOffsertY=this.cropChangeY+this.cropOldH):this.changeCropTypeY===2&&(this.cropOldH+l>0?(this.cropH=this.cropOldH+l+this.cropOffsertY<=s?this.cropOldH+l:s-this.cropOffsertY,this.cropOffsertY=this.cropChangeY):(this.cropH=s-this.cropChangeY+Math.abs(l+this.cropOldH)<=s-r?Math.abs(l+this.cropOldH):this.cropChangeY-r,this.cropOffsertY=s-this.cropChangeY+Math.abs(l+this.cropOldH)<=s-r?this.cropChangeY-Math.abs(l+this.cropOldH):r))),this.canChangeX&&this.fixed){var c=this.cropW/this.fixedNumber[0]*this.fixedNumber[1];c+this.cropOffsertY>s?(this.cropH=s-this.cropOffsertY,this.cropW=this.cropH/this.fixedNumber[1]*this.fixedNumber[0]):this.cropH=c}if(this.canChangeY&&this.fixed){var d=this.cropH/this.fixedNumber[1]*this.fixedNumber[0];d+this.cropOffsertX>o?(this.cropW=o-this.cropOffsertX,this.cropH=this.cropW/this.fixedNumber[0]*this.fixedNumber[1]):this.cropW=d}})},checkCropLimitSize(){let{cropW:e,cropH:t,limitMinSize:i}=this,o=new Array;return o=Array.isArray[i]?i:[i,i],e=parseFloat(o[0]),t=parseFloat(o[1]),[e,t]},changeCropEnd(e){window.removeEventListener("mousemove",this.changeCropNow),window.removeEventListener("mouseup",this.changeCropEnd),window.removeEventListener("touchmove",this.changeCropNow),window.removeEventListener("touchend",this.changeCropEnd)},endCrop(){this.cropW===0&&this.cropH===0&&(this.cropping=!1),window.removeEventListener("mousemove",this.createCrop),window.removeEventListener("mouseup",this.endCrop),window.removeEventListener("touchmove",this.createCrop),window.removeEventListener("touchend",this.endCrop)},startCrop(){this.crop=!0},stopCrop(){this.crop=!1},clearCrop(){this.cropping=!1,this.cropW=0,this.cropH=0},cropMove(e){if(e.preventDefault(),!this.canMoveBox)return this.crop=!1,this.startMove(e),!1;if(e.touches&&e.touches.length===2)return this.crop=!1,this.startMove(e),this.leaveCrop(),!1;window.addEventListener("mousemove",this.moveCrop),window.addEventListener("mouseup",this.leaveCrop),window.addEventListener("touchmove",this.moveCrop),window.addEventListener("touchend",this.leaveCrop);let t,i,o="clientX"in e?e.clientX:e.touches[0].clientX,s="clientY"in e?e.clientY:e.touches[0].clientY;t=o-this.cropOffsertX,i=s-this.cropOffsertY,this.cropX=t,this.cropY=i,this.$emit("cropMoving",{moving:!0,axis:this.getCropAxis()}),this.$emit("crop-moving",{moving:!0,axis:this.getCropAxis()})},moveCrop(e,t){let i=0,o=0;e&&(e.preventDefault(),i="clientX"in e?e.clientX:e.touches[0].clientX,o="clientY"in e?e.clientY:e.touches[0].clientY),this.$nextTick(()=>{let s,h,r=i-this.cropX,a=o-this.cropY;if(t&&(r=this.cropOffsertX,a=this.cropOffsertY),s=r<=0?0:r+this.cropW>this.w?this.w-this.cropW:r,h=a<=0?0:a+this.cropH>this.h?this.h-this.cropH:a,this.centerBox){let l=this.getImgAxis();s<=l.x1&&(s=l.x1),s+this.cropW>l.x2&&(s=l.x2-this.cropW),h<=l.y1&&(h=l.y1),h+this.cropH>l.y2&&(h=l.y2-this.cropH)}this.cropOffsertX=s,this.cropOffsertY=h,this.$emit("cropMoving",{moving:!0,axis:this.getCropAxis()}),this.$emit("crop-moving",{moving:!0,axis:this.getCropAxis()})})},getImgAxis(e,t,i){e=e||this.x,t=t||this.y,i=i||this.scale;let o={x1:0,x2:0,y1:0,y2:0},s=this.trueWidth*i,h=this.trueHeight*i;switch(this.rotate){case 0:o.x1=e+this.trueWidth*(1-i)/2,o.x2=o.x1+this.trueWidth*i,o.y1=t+this.trueHeight*(1-i)/2,o.y2=o.y1+this.trueHeight*i;break;case 1:case-1:case 3:case-3:o.x1=e+this.trueWidth*(1-i)/2+(s-h)/2,o.x2=o.x1+this.trueHeight*i,o.y1=t+this.trueHeight*(1-i)/2+(h-s)/2,o.y2=o.y1+this.trueWidth*i;break;default:o.x1=e+this.trueWidth*(1-i)/2,o.x2=o.x1+this.trueWidth*i,o.y1=t+this.trueHeight*(1-i)/2,o.y2=o.y1+this.trueHeight*i}return o},getCropAxis(){let e={x1:0,x2:0,y1:0,y2:0};return e.x1=this.cropOffsertX,e.x2=e.x1+this.cropW,e.y1=this.cropOffsertY,e.y2=e.y1+this.cropH,e},leaveCrop(e){window.removeEventListener("mousemove",this.moveCrop),window.removeEventListener("mouseup",this.leaveCrop),window.removeEventListener("touchmove",this.moveCrop),window.removeEventListener("touchend",this.leaveCrop),this.$emit("cropMoving",{moving:!1,axis:this.getCropAxis()}),this.$emit("crop-moving",{moving:!1,axis:this.getCropAxis()})},getCropChecked(e){let t=document.createElement("canvas"),i=new Image,o=this.rotate,s=this.trueWidth,h=this.trueHeight,r=this.cropOffsertX,a=this.cropOffsertY;function l(c,d){t.width=Math.round(c),t.height=Math.round(d)}i.onload=()=>{if(this.cropW!==0){let c=t.getContext("2d"),d=1;this.high&!this.full&&(d=window.devicePixelRatio),this.enlarge!==1&!this.full&&(d=Math.abs(Number(this.enlarge)));let u=this.cropW*d,m=this.cropH*d,g=s*this.scale*d,w=h*this.scale*d,f=(this.x-r+this.trueWidth*(1-this.scale)/2)*d,p=(this.y-a+this.trueHeight*(1-this.scale)/2)*d;switch(l(u,m),c.save(),o){case 0:this.full?(l(u/this.scale,m/this.scale),c.drawImage(i,f/this.scale,p/this.scale,g/this.scale,w/this.scale)):c.drawImage(i,f,p,g,w);break;case 1:case-3:this.full?(l(u/this.scale,m/this.scale),f=f/this.scale+(g/this.scale-w/this.scale)/2,p=p/this.scale+(w/this.scale-g/this.scale)/2,c.rotate(90*o*Math.PI/180),c.drawImage(i,p,-f-w/this.scale,g/this.scale,w/this.scale)):(f+=(g-w)/2,p+=(w-g)/2,c.rotate(90*o*Math.PI/180),c.drawImage(i,p,-f-w,g,w));break;case 2:case-2:this.full?(l(u/this.scale,m/this.scale),c.rotate(90*o*Math.PI/180),f/=this.scale,p/=this.scale,c.drawImage(i,-f-g/this.scale,-p-w/this.scale,g/this.scale,w/this.scale)):(c.rotate(90*o*Math.PI/180),c.drawImage(i,-f-g,-p-w,g,w));break;case 3:case-1:this.full?(l(u/this.scale,m/this.scale),f=f/this.scale+(g/this.scale-w/this.scale)/2,p=p/this.scale+(w/this.scale-g/this.scale)/2,c.rotate(90*o*Math.PI/180),c.drawImage(i,-p-g/this.scale,f,g/this.scale,w/this.scale)):(f+=(g-w)/2,p+=(w-g)/2,c.rotate(90*o*Math.PI/180),c.drawImage(i,-p-g,f,g,w));break;default:this.full?(l(u/this.scale,m/this.scale),c.drawImage(i,f/this.scale,p/this.scale,g/this.scale,w/this.scale)):c.drawImage(i,f,p,g,w)}c.restore()}else{let c=s*this.scale,d=h*this.scale,u=t.getContext("2d");switch(u.save(),o){case 0:l(c,d),u.drawImage(i,0,0,c,d);break;case 1:case-3:l(d,c),u.rotate(90*o*Math.PI/180),u.drawImage(i,0,-d,c,d);break;case 2:case-2:l(c,d),u.rotate(90*o*Math.PI/180),u.drawImage(i,-c,-d,c,d);break;case 3:case-1:l(d,c),u.rotate(90*o*Math.PI/180),u.drawImage(i,-c,0,c,d);break;default:l(c,d),u.drawImage(i,0,0,c,d)}u.restore()}e(t)},this.img.substr(0,4)!=="data"&&(i.crossOrigin="Anonymous"),i.src=this.imgs},getCropData(e){this.getCropChecked(t=>{e(t.toDataURL("image/"+this.outputType,this.outputSize))})},getCropBlob(e){this.getCropChecked(t=>{t.toBlob(i=>e(i),"image/"+this.outputType,this.outputSize)})},showPreview(){if(!this.isCanShow)return!1;this.isCanShow=!1,setTimeout(()=>{this.isCanShow=!0},16);let e=this.cropW,t=this.cropH,i=this.scale;var o={};o.div={width:`${e}px`,height:`${t}px`};let s=(this.x-this.cropOffsertX)/i,h=(this.y-this.cropOffsertY)/i;o.w=e,o.h=t,o.url=this.imgs,o.img={width:`${this.trueWidth}px`,height:`${this.trueHeight}px`,transform:`scale(${i})translate3d(${s}px, ${h}px, 0px)rotateZ(${90*this.rotate}deg)`},o.html=`
      <div class="show-preview" style="width: ${o.w}px; height: ${o.h}px,; overflow: hidden">
        <div style="width: ${e}px; height: ${t}px">
          <img src=${o.url} style="width: ${this.trueWidth}px; height: ${this.trueHeight}px; transform:
          scale(${i})translate3d(${s}px, ${h}px, 0px)rotateZ(${90*this.rotate}deg)">
        </div>
      </div>`,this.$emit("realTime",o),this.$emit("real-time",o)},reload(){let e=new Image;e.onload=()=>{this.w=parseFloat(window.getComputedStyle(this.$refs.cropper).width),this.h=parseFloat(window.getComputedStyle(this.$refs.cropper).height),this.trueWidth=e.width,this.trueHeight=e.height,this.original?this.scale=1:this.scale=this.checkedMode(),this.$nextTick(()=>{this.x=-(this.trueWidth-this.trueWidth*this.scale)/2+(this.w-this.trueWidth*this.scale)/2,this.y=-(this.trueHeight-this.trueHeight*this.scale)/2+(this.h-this.trueHeight*this.scale)/2,this.loading=!1,this.autoCrop&&this.goAutoCrop(),this.$emit("img-load","success"),this.$emit("imgLoad","success"),setTimeout(()=>{this.showPreview()},20)})},e.onerror=()=>{this.$emit("imgLoad","error"),this.$emit("img-load","error")},e.src=this.imgs},checkedMode(){let e=1,t=this.trueWidth,i=this.trueHeight;const o=this.mode.split(" ");switch(o[0]){case"contain":this.trueWidth>this.w&&(e=this.w/this.trueWidth),this.trueHeight*e>this.h&&(e=this.h/this.trueHeight);break;case"cover":t=this.w,e=t/this.trueWidth,i*=e,i<this.h&&(i=this.h,e=i/this.trueHeight);break;default:try{let s=o[0];if(s.search("px")!==-1){s=s.replace("px",""),t=parseFloat(s);const h=t/this.trueWidth;let r=1,a=o[1];a.search("px")!==-1&&(a=a.replace("px",""),i=parseFloat(a),r=i/this.trueHeight),e=Math.min(h,r)}if(s.search("%")!==-1&&(s=s.replace("%",""),t=parseFloat(s)/100*this.w,e=t/this.trueWidth),o.length===2&&s==="auto"){let h=o[1];h.search("px")!==-1&&(h=h.replace("px",""),i=parseFloat(h),e=i/this.trueHeight),h.search("%")!==-1&&(h=h.replace("%",""),i=parseFloat(h)/100*this.h,e=i/this.trueHeight)}}catch{e=1}}return e},goAutoCrop(e,t){if(this.imgs===""||this.imgs===null)return;this.clearCrop(),this.cropping=!0;let i=this.w,o=this.h;if(this.centerBox){const r=Math.abs(this.rotate)%2>0;let a=(r?this.trueHeight:this.trueWidth)*this.scale,l=(r?this.trueWidth:this.trueHeight)*this.scale;i=a<i?a:i,o=l<o?l:o}var s=e||parseFloat(this.autoCropWidth),h=t||parseFloat(this.autoCropHeight);s!==0&&h!==0||(s=.8*i,h=.8*o),s=s>i?i:s,h=h>o?o:h,this.fixed&&(h=s/this.fixedNumber[0]*this.fixedNumber[1]),h>this.h&&(s=(h=this.h)/this.fixedNumber[1]*this.fixedNumber[0]),this.changeCrop(s,h)},changeCrop(e,t){if(this.centerBox){let i=this.getImgAxis();e>i.x2-i.x1&&(t=(e=i.x2-i.x1)/this.fixedNumber[0]*this.fixedNumber[1]),t>i.y2-i.y1&&(e=(t=i.y2-i.y1)/this.fixedNumber[1]*this.fixedNumber[0])}this.cropW=e,this.cropH=t,this.checkCropLimitSize(),this.$nextTick(()=>{this.cropOffsertX=(this.w-this.cropW)/2,this.cropOffsertY=(this.h-this.cropH)/2,this.centerBox&&this.moveCrop(null,!0)})},refresh(){this.img,this.imgs="",this.scale=1,this.crop=!1,this.rotate=0,this.w=0,this.h=0,this.trueWidth=0,this.trueHeight=0,this.clearCrop(),this.$nextTick(()=>{this.checkedImg()})},rotateLeft(){this.rotate=this.rotate<=-3?0:this.rotate-1},rotateRight(){this.rotate=this.rotate>=3?0:this.rotate+1},rotateClear(){this.rotate=0},checkoutImgAxis(e,t,i){e=e||this.x,t=t||this.y,i=i||this.scale;let o=!0;if(this.centerBox){let s=this.getImgAxis(e,t,i),h=this.getCropAxis();s.x1>=h.x1&&(o=!1),s.x2<=h.x2&&(o=!1),s.y1>=h.y1&&(o=!1),s.y2<=h.y2&&(o=!1)}return o}},mounted(){this.support="onwheel"in document.createElement("div")?"wheel":document.onmousewheel!==void 0?"mousewheel":"DOMMouseScroll";let e=this;var t=navigator.userAgent;this.isIOS=!!t.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),HTMLCanvasElement.prototype.toBlob||Object.defineProperty(HTMLCanvasElement.prototype,"toBlob",{value:function(i,o,s){for(var h=atob(this.toDataURL(o,s).split(",")[1]),r=h.length,a=new Uint8Array(r),l=0;l<r;l++)a[l]=h.charCodeAt(l);i(new Blob([a],{type:e.type||"image/png"}))}}),this.showPreview(),this.checkedImg()},destroyed(){window.removeEventListener("mousemove",this.moveCrop),window.removeEventListener("mouseup",this.leaveCrop),window.removeEventListener("touchmove",this.moveCrop),window.removeEventListener("touchend",this.leaveCrop),this.cancelScale()}});n.pushScopeId("data-v-48aab112");const z={key:0,class:"cropper-box"},$=["src"],A={class:"cropper-view-box"},V=["src"],D={key:1};n.popScopeId(),B.render=function(e,t,i,o,s,h){return n.openBlock(),n.createElementBlock("div",{class:"vue-cropper",ref:"cropper",onMouseover:t[28]||(t[28]=(...r)=>e.scaleImg&&e.scaleImg(...r)),onMouseout:t[29]||(t[29]=(...r)=>e.cancelScale&&e.cancelScale(...r))},[e.imgs?(n.openBlock(),n.createElementBlock("div",z,[n.withDirectives(n.createElementVNode("div",{class:"cropper-box-canvas",style:n.normalizeStyle({width:e.trueWidth+"px",height:e.trueHeight+"px",transform:"scale("+e.scale+","+e.scale+") translate3d("+e.x/e.scale+"px,"+e.y/e.scale+"px,0)rotateZ("+90*e.rotate+"deg)"})},[n.createElementVNode("img",{src:e.imgs,alt:"cropper-img",ref:"cropperImg"},null,8,$)],4),[[n.vShow,!e.loading]])])):n.createCommentVNode("",!0),n.createElementVNode("div",{class:n.normalizeClass(["cropper-drag-box",{"cropper-move":e.move&&!e.crop,"cropper-crop":e.crop,"cropper-modal":e.cropping}]),onMousedown:t[0]||(t[0]=(...r)=>e.startMove&&e.startMove(...r)),onTouchstart:t[1]||(t[1]=(...r)=>e.startMove&&e.startMove(...r))},null,34),n.withDirectives(n.createElementVNode("div",{class:"cropper-crop-box",style:n.normalizeStyle({width:e.cropW+"px",height:e.cropH+"px",transform:"translate3d("+e.cropOffsertX+"px,"+e.cropOffsertY+"px,0)"})},[n.createElementVNode("span",A,[n.createElementVNode("img",{style:n.normalizeStyle({width:e.trueWidth+"px",height:e.trueHeight+"px",transform:"scale("+e.scale+","+e.scale+") translate3d("+(e.x-e.cropOffsertX)/e.scale+"px,"+(e.y-e.cropOffsertY)/e.scale+"px,0)rotateZ("+90*e.rotate+"deg)"}),src:e.imgs,alt:"cropper-img"},null,12,V)]),n.createElementVNode("span",{class:"cropper-face cropper-move",onMousedown:t[2]||(t[2]=(...r)=>e.cropMove&&e.cropMove(...r)),onTouchstart:t[3]||(t[3]=(...r)=>e.cropMove&&e.cropMove(...r))},null,32),e.info?(n.openBlock(),n.createElementBlock("span",{key:0,class:"crop-info",style:n.normalizeStyle({top:e.cropInfo.top})},n.toDisplayString(e.cropInfo.width)+" \xD7 "+n.toDisplayString(e.cropInfo.height),5)):n.createCommentVNode("",!0),e.fixedBox?n.createCommentVNode("",!0):(n.openBlock(),n.createElementBlock("span",D,[n.createElementVNode("span",{class:"crop-line line-w",onMousedown:t[4]||(t[4]=r=>e.changeCropSize(r,!1,!0,0,1)),onTouchstart:t[5]||(t[5]=r=>e.changeCropSize(r,!1,!0,0,1))},null,32),n.createElementVNode("span",{class:"crop-line line-a",onMousedown:t[6]||(t[6]=r=>e.changeCropSize(r,!0,!1,1,0)),onTouchstart:t[7]||(t[7]=r=>e.changeCropSize(r,!0,!1,1,0))},null,32),n.createElementVNode("span",{class:"crop-line line-s",onMousedown:t[8]||(t[8]=r=>e.changeCropSize(r,!1,!0,0,2)),onTouchstart:t[9]||(t[9]=r=>e.changeCropSize(r,!1,!0,0,2))},null,32),n.createElementVNode("span",{class:"crop-line line-d",onMousedown:t[10]||(t[10]=r=>e.changeCropSize(r,!0,!1,2,0)),onTouchstart:t[11]||(t[11]=r=>e.changeCropSize(r,!0,!1,2,0))},null,32),n.createElementVNode("span",{class:"crop-point point1",onMousedown:t[12]||(t[12]=r=>e.changeCropSize(r,!0,!0,1,1)),onTouchstart:t[13]||(t[13]=r=>e.changeCropSize(r,!0,!0,1,1))},null,32),n.createElementVNode("span",{class:"crop-point point2",onMousedown:t[14]||(t[14]=r=>e.changeCropSize(r,!1,!0,0,1)),onTouchstart:t[15]||(t[15]=r=>e.changeCropSize(r,!1,!0,0,1))},null,32),n.createElementVNode("span",{class:"crop-point point3",onMousedown:t[16]||(t[16]=r=>e.changeCropSize(r,!0,!0,2,1)),onTouchstart:t[17]||(t[17]=r=>e.changeCropSize(r,!0,!0,2,1))},null,32),n.createElementVNode("span",{class:"crop-point point4",onMousedown:t[18]||(t[18]=r=>e.changeCropSize(r,!0,!1,1,0)),onTouchstart:t[19]||(t[19]=r=>e.changeCropSize(r,!0,!1,1,0))},null,32),n.createElementVNode("span",{class:"crop-point point5",onMousedown:t[20]||(t[20]=r=>e.changeCropSize(r,!0,!1,2,0)),onTouchstart:t[21]||(t[21]=r=>e.changeCropSize(r,!0,!1,2,0))},null,32),n.createElementVNode("span",{class:"crop-point point6",onMousedown:t[22]||(t[22]=r=>e.changeCropSize(r,!0,!0,1,2)),onTouchstart:t[23]||(t[23]=r=>e.changeCropSize(r,!0,!0,1,2))},null,32),n.createElementVNode("span",{class:"crop-point point7",onMousedown:t[24]||(t[24]=r=>e.changeCropSize(r,!1,!0,0,2)),onTouchstart:t[25]||(t[25]=r=>e.changeCropSize(r,!1,!0,0,2))},null,32),n.createElementVNode("span",{class:"crop-point point8",onMousedown:t[26]||(t[26]=r=>e.changeCropSize(r,!0,!0,2,2)),onTouchstart:t[27]||(t[27]=r=>e.changeCropSize(r,!0,!0,2,2))},null,32)]))],4),[[n.vShow,e.cropping]])],544)},B.__scopeId="data-v-48aab112",typeof window!="undefined"&&window.Vue&&window.Vue.createApp({}).component("VueCropper",B);var ie="",P=(e,t)=>{for(const[i,o]of t)e[i]=o;return e};const R=n.defineComponent({name:"H5Cropper",components:{VueCropper:B},props:{hideInput:{type:Boolean,default:()=>!1},option:{type:Object,default:()=>{}}},setup(e,t){const i=n.ref(null),o=n.ref(null),s=n.ref(""),h={ceilbutton:!1,outputSize:1,outputType:"png",info:!1,canScale:!0,autoCrop:!1,autoCropWidth:0,autoCropHeight:0,fixed:!0,fixedNumber:[1,1],full:!1,fixedBox:!0,canMove:!0,canMoveBox:!1,original:!1,centerBox:!0,high:!0,infoTrue:!1,maxImgSize:2e3,enlarge:1,mode:"100%",cancelButtonText:"\u53D6\u6D88",confirmButtonText:"\u786E\u5B9A",cancelButtonBackgroundColor:"#606266",confirmButtonBackgroundColor:"#ed594c",cancelButtonTextColor:"#ffffff",confirmButtonTextColor:"#ffffff"},r=n.reactive({config:W(W({},h),e.option)});n.watch(()=>e.option,()=>{var p;console.log("\u6539\u53D8\u53C2\u6570"),delete e.option.autoCrop,typeof((p=e==null?void 0:e.option)==null?void 0:p.outputType)=="string"&&["jpeg","png","webp"].indexOf(e.option.outputType)===-1&&(console.warn("Option.outputType is not [jpeg, png, webp]"),delete e.option.outputType),r.config=Object.assign(r.config,e.option)},{deep:!0,immediate:!0});function a(p){let C=document.getElementsByClassName("cropper-modal")[0];p.moving?C.style="background-color: rgba(0,0,0,0.5);transition: 0.88s":C.style="background-color: rgba(0,0,0,0.8);transition: 0.88s"}async function l(p){let C=p.target.files[0];o.value.value=null,C!=null&&(t.emit("imgorigoinf",C),s.value=await c(C),r.config.autoCrop=!0,setTimeout(()=>{g()},10))}function c(p){return new Promise(function(C,b){let y=new FileReader;y.readAsDataURL(p),y.onload=x=>{C(x.target.result)}})}function d(){s.value="",t.emit("canceltailor")}function u(){i.value.getCropData(p=>{t.emit("getbase64Data",p),t.emit("getbase64",p),s.value="",r.config.autoCrop=!1}),i.value.getCropBlob(p=>{t.emit("getblobData",p),t.emit("getblob",p);const C={jpeg:"jpg",png:"png",webp:"webp"}[r.config.outputType],b=new Date().getTime(),y=new File([p],`${b}.${C}`,{type:`image/${r.config.outputType}`});t.emit("getFile",y),t.emit("get-file",y),s.value="",r.config.autoCrop=!1})}function m(){i.value.rotateRight();let p=document.getElementsByClassName("cropper-modal")[0];p.style="background-color: rgba(0,0,0,0.5);transition: 0.88s"}function g(){if(document.getElementById("vertical")==null){let p=document.getElementsByClassName("cropper-crop-box")[0],C=document.createElement("div");C.id="vertical",C.style.width="1px",C.style.height="100%",C.style.top="0px",C.style.left="33%",C.style.position="absolute",C.style.backgroundColor="#fff",C.style.zIndex="522",C.style.opacity="0.5";let b=document.createElement("div");b.style.width="1px",b.style.height="100%",b.style.top="0px",b.style.right="33%",b.style.position="absolute",b.style.backgroundColor="#fff",b.style.zIndex="522",b.style.opacity="0.5";let y=document.createElement("div");y.style.width="100%",y.style.height="1px",y.style.top="33%",y.style.left="0px",y.style.position="absolute",y.style.backgroundColor="#fff",y.style.zIndex="522",y.style.opacity="0.5";let x=document.createElement("div");x.style.width="100%",x.style.height="1px",x.style.bottom="33%",x.style.left="0px",x.style.position="absolute",x.style.backgroundColor="#fff",x.style.zIndex="522",x.style.opacity="0.5";let S=document.createElement("div");S.style.width="30px",S.style.height="4px",S.style.top="-4px",S.style.left="-4px",S.style.position="absolute",S.style.backgroundColor="#fff",S.style.zIndex="522",S.style.opacity="1";let M=document.createElement("div");M.style.width="4px",M.style.height="30px",M.style.top="-4px",M.style.left="-4px",M.style.position="absolute",M.style.backgroundColor="#fff",M.style.zIndex="522",M.style.opacity="1";let I=document.createElement("div");I.style.width="30px",I.style.height="4px",I.style.top="-4px",I.style.right="-4px",I.style.position="absolute",I.style.backgroundColor="#fff",I.style.zIndex="522",I.style.opacity="1";let X=document.createElement("div");X.style.width="4px",X.style.height="30px",X.style.top="-4px",X.style.right="-4px",X.style.position="absolute",X.style.backgroundColor="#fff",X.style.zIndex="522",X.style.opacity="1";let k=document.createElement("div");k.style.width="30px",k.style.height="4px",k.style.bottom="-4px",k.style.left="-4px",k.style.position="absolute",k.style.backgroundColor="#fff",k.style.zIndex="522",k.style.opacity="1";let H=document.createElement("div");H.style.width="4px",H.style.height="30px",H.style.bottom="-4px",H.style.left="-4px",H.style.position="absolute",H.style.backgroundColor="#fff",H.style.zIndex="522",H.style.opacity="1";let O=document.createElement("div");O.style.width="30px",O.style.height="4px",O.style.bottom="-4px",O.style.right="-4px",O.style.position="absolute",O.style.backgroundColor="#fff",O.style.zIndex="522",O.style.opacity="1";let Y=document.createElement("div");Y.style.width="4px",Y.style.height="30px",Y.style.bottom="-4px",Y.style.right="-4px",Y.style.position="absolute",Y.style.backgroundColor="#fff",Y.style.zIndex="522",Y.style.opacity="1",p.appendChild(C),p.appendChild(b),p.appendChild(y),p.appendChild(x),p.appendChild(S),p.appendChild(M),p.appendChild(I),p.appendChild(X),p.appendChild(k),p.appendChild(H),p.appendChild(O),p.appendChild(Y)}}function w(p){if(p instanceof File)c(p).then(C=>{s.value=C,setTimeout(()=>{r.config.autoCrop=!0,g()},10)});else throw new Error("Arguments file is not File")}function f(p){if(typeof p!="string")throw new Error("Arguments base64 is not string");const C=p.split(",");if(!/^data:image\/(.*?);base64$/.test(C[0]))throw new Error("Arguments base64 MIME is not image/*");if(!/^[\/]?([\da-zA-Z]+[\/+]+)*[\da-zA-Z]+([+=]{1,2}|[\/])?$/.test(C[1]))throw new Error("Not standard base64");s.value=p,setTimeout(()=>{r.config.autoCrop=!0,g()},10)}return L(W({},n.toRefs(r)),{moving:a,upphoto:l,img:s,cropper:i,headinput:o,canceltailor:d,tailoring:u,rotating:m,loadBase64:f,loadFile:w})}}),U={class:"upbtn"},F={key:1,class:"bg"},j={key:0,class:"btndiv"},q={class:"wrapper"},Z={key:1,class:"btndiv"};function G(e,t,i,o,s,h){const r=n.resolveComponent("vueCropper");return n.openBlock(),n.createElementBlock("div",U,[e.hideInput?n.createCommentVNode("",!0):(n.openBlock(),n.createElementBlock("input",{key:0,style:{opacity:"0"},class:"upbtn",type:"file",accept:"image/*",onChange:t[0]||(t[0]=a=>e.upphoto(a)),ref:"headinput"},null,544)),e.img?(n.openBlock(),n.createElementBlock("div",F,[e.config.ceilbutton?(n.openBlock(),n.createElementBlock("div",j,[n.createElementVNode("div",{class:"btn",onClick:t[1]||(t[1]=(...a)=>e.canceltailor&&e.canceltailor(...a)),style:n.normalizeStyle({backgroundColor:e.config.cancelButtonBackgroundColor,color:e.config.cancelButtonTextColor})},n.toDisplayString(e.config.cancelButtonText),5),n.createElementVNode("div",{class:"img",onClick:t[2]||(t[2]=(...a)=>e.rotating&&e.rotating(...a))}),n.createElementVNode("div",{class:"btn",onClick:t[3]||(t[3]=(...a)=>e.tailoring&&e.tailoring(...a)),style:n.normalizeStyle({backgroundColor:e.config.confirmButtonBackgroundColor,color:e.config.confirmButtonTextColor})},n.toDisplayString(e.config.confirmButtonText),5)])):n.createCommentVNode("",!0),n.createElementVNode("div",q,[n.createVNode(r,{id:"cropper",ref:"cropper",img:e.img,outputSize:e.config.outputSize,outputType:e.config.outputType,info:e.config.info,canScale:e.config.canScale,autoCrop:e.config.autoCrop,autoCropWidth:e.config.autoCropWidth,autoCropHeight:e.config.autoCropHeight,fixed:e.config.fixed,fixedNumber:e.config.fixedNumber,full:e.config.full,fixedBox:e.config.fixedBox,canMove:e.config.canMove,canMoveBox:e.config.canMoveBox,original:e.config.original,centerBox:e.config.centerBox,high:e.config.high,infoTrue:e.config.infoTrue,maxImgSize:e.config.maxImgSize,enlarge:e.config.enlarge,mode:e.config.mode,onCropMoving:t[4]||(t[4]=a=>e.moving(a)),onImgMoving:t[5]||(t[5]=a=>e.moving(a))},null,8,["img","outputSize","outputType","info","canScale","autoCrop","autoCropWidth","autoCropHeight","fixed","fixedNumber","full","fixedBox","canMove","canMoveBox","original","centerBox","high","infoTrue","maxImgSize","enlarge","mode"])]),e.config.ceilbutton?n.createCommentVNode("",!0):(n.openBlock(),n.createElementBlock("div",Z,[n.createElementVNode("div",{class:"btn",onClick:t[6]||(t[6]=(...a)=>e.canceltailor&&e.canceltailor(...a)),style:n.normalizeStyle({backgroundColor:e.config.cancelButtonBackgroundColor,color:e.config.cancelButtonTextColor})},n.toDisplayString(e.config.cancelButtonText),5),n.createElementVNode("div",{class:"img",onClick:t[7]||(t[7]=(...a)=>e.rotating&&e.rotating(...a))}),n.createElementVNode("div",{class:"btn",onClick:t[8]||(t[8]=(...a)=>e.tailoring&&e.tailoring(...a)),style:n.normalizeStyle({backgroundColor:e.config.confirmButtonBackgroundColor,color:e.config.confirmButtonTextColor})},n.toDisplayString(e.config.confirmButtonText),5)]))])):n.createCommentVNode("",!0)])}var J=P(R,[["render",G],["__scopeId","data-v-3cb67fea"]]);return J});
