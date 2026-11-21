(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e,t,n,r,i,a,o,s,c,l=1e3,u=1001,d=1002,f=1003,p=1004,m=1005,h=1006,g=1007,_=1008,v=1009,y=1010,b=1011,x=1012,S=1013,C=1014,w=1015,T=1016,E=1017,D=1018,O=1020,k=35902,A=35899,j=1021,M=1022,N=1023,ee=1026,P=1027,te=1028,F=1029,ne=1030,re=1031,ie=1033,ae=33776,oe=33777,se=33778,I=33779,L=35840,ce=35841,le=35842,ue=35843,de=36196,fe=37492,pe=37496,me=37488,he=37489,ge=37490,_e=37491,ve=37808,R=37809,ye=37810,be=37811,xe=37812,Se=37813,Ce=37814,we=37815,Te=37816,Ee=37817,De=37818,Oe=37819,ke=37820,Ae=37821,z=36492,je=36494,Me=36495,Ne=36283,B=36284,Pe=36285,Fe=36286,Ie=2300,Le=2301,Re=2302,ze=2303,Be=2400,Ve=2401,He=2402,Ue=3200,We=`srgb`,Ge=`srgb-linear`,Ke=`linear`,qe=`srgb`,Je=7680,Ye=35044,Xe=2e3;function Ze(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function Qe(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function $e(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}function et(){let e=$e(`canvas`);return e.style.display=`block`,e}var tt={};function nt(...e){let t=`THREE.`+e.shift();console.log(t,...e)}function rt(e){let t=e[0];if(typeof t==`string`&&t.startsWith(`TSL:`)){let t=e[1];t&&t.isStackTrace?e[0]+=` `+t.getLocation():e[1]=`Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.`}return e}function V(...e){e=rt(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function it(...e){e=rt(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function at(...e){let t=e.join(` `);t in tt||(tt[t]=!0,V(...e))}function ot(e,t,n){return new Promise(function(r,i){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:i();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:r()}}setTimeout(a,n)})}var st={0:0,2:6,4:4,3:5,1:1,6:2,7:7,5:3},ct=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let e=r.indexOf(t);e!==-1&&r.splice(e,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let t=n.slice(0);for(let n=0,r=t.length;n<r;n++)t[n].call(this,e);e.target=null}}},lt=`00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),ut=Math.PI/180,dt=180/Math.PI;function ft(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(lt[e&255]+lt[e>>8&255]+lt[e>>16&255]+lt[e>>24&255]+`-`+lt[t&255]+lt[t>>8&255]+`-`+lt[t>>16&15|64]+lt[t>>24&255]+`-`+lt[n&63|128]+lt[n>>8&255]+`-`+lt[n>>16&255]+lt[n>>24&255]+lt[r&255]+lt[r>>8&255]+lt[r>>16&255]+lt[r>>24&255]).toLowerCase()}function pt(e,t,n){return Math.max(t,Math.min(n,e))}function mt(e,t){return(e%t+t)%t}function ht(e,t,n){return(1-n)*e+n*t}function gt(e){return 2**Math.floor(Math.log(e)/Math.LN2)}function _t(e){switch(e.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function vt(e,t){if(t.constructor===Float32Array)return e;let n=_t(t);if(n===void 0)throw Error(`THREE.MathUtils: Invalid component type.`);return Math.max(e/n,-1)}function yt(e,t){if(t.constructor===Float32Array)return e;let n=_t(t);if(n===void 0)throw Error(`THREE.MathUtils: Invalid component type.`);return Math.round(e*n)}o=Symbol.iterator;var bt=class{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`THREE.Vector2: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`THREE.Vector2: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=pt(this.x,e.x,t.x),this.y=pt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=pt(this.x,e,t),this.y=pt(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(pt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(pt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[o](){yield this.x,yield this.y}};e=bt,e.prototype.isVector2=!0;var xt=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let s=n[r+0],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a+0],f=i[a+1],p=i[a+2],m=i[a+3];if(u!==m||s!==d||c!==f||l!==p){let e=s*d+c*f+l*p+u*m;e<0&&(d=-d,f=-f,p=-p,m=-m,e=-e);let t=1-o;if(e<.9995){let n=Math.acos(e),r=Math.sin(n);t=Math.sin(t*n)/r,o=Math.sin(o*n)/r,s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o}else{s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o;let e=1/Math.sqrt(s*s+c*c+l*l+u*u);s*=e,c*=e,l*=e,u*=e}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],s=n[r+1],c=n[r+2],l=n[r+3],u=i[a],d=i[a+1],f=i[a+2],p=i[a+3];return e[t]=o*p+l*u+s*f-c*d,e[t+1]=s*p+l*d+c*u-o*f,e[t+2]=c*p+l*f+o*d-s*u,e[t+3]=l*p-o*u-s*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,s=Math.sin,c=o(n/2),l=o(r/2),u=o(i/2),d=s(n/2),f=s(r/2),p=s(i/2);switch(a){case`XYZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`YXZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`ZXY`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`ZYX`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`YZX`:this._x=d*l*u+c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u-d*f*p;break;case`XZY`:this._x=d*l*u-c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u+d*f*p;break;default:V(`Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(pt(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,i=-i,a=-a,o=-o);let s=1-t;if(o<.9995){let e=Math.acos(o),c=Math.sin(e);s=Math.sin(s*e)/c,t=Math.sin(t*e)/c,this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this._onChangeCallback()}else this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}};s=Symbol.iterator;var H=class{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`THREE.Vector3: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`THREE.Vector3: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Ct.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Ct.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=pt(this.x,e.x,t.x),this.y=pt(this.y,e.y,t.y),this.z=pt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=pt(this.x,e,t),this.y=pt(this.y,e,t),this.z=pt(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(pt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return St.copy(this).projectOnVector(e),this.sub(St)}reflect(e){return this.sub(St.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(pt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[s](){yield this.x,yield this.y,yield this.z}};t=H,t.prototype.isVector3=!0;var St=new H,Ct=new xt,wt=class{constructor(e,t,n,r,i,a,o,s,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1),this}scale(e,t){return at(`Matrix3: .scale() is deprecated. Use .makeScale() instead.`),this.premultiply(Tt.makeScale(e,t)),this}rotate(e){return at(`Matrix3: .rotate() is deprecated. Use .makeRotation() instead.`),this.premultiply(Tt.makeRotation(-e)),this}translate(e,t){return at(`Matrix3: .translate() is deprecated. Use .makeTranslation() instead.`),this.premultiply(Tt.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};n=wt,n.prototype.isMatrix3=!0;var Tt=new wt,Et=new wt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Dt=new wt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Ot(){let e={enabled:!0,workingColorSpace:Ge,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n||(this.spaces[t].transfer===`srgb`&&(e.r=At(e.r),e.g=At(e.g),e.b=At(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===`srgb`&&(e.r=jt(e.r),e.g=jt(e.g),e.b=jt(e.b))),e},workingToColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},colorSpaceToWorking:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===``?Ke:this.spaces[e].transfer},getToneMappingMode:function(e){return this.spaces[e].outputColorSpaceConfig.toneMappingMode||`standard`},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[n].fromXYZ).multiply(this.spaces[t].toXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return e.define({[Ge]:{primaries:t,whitePoint:r,transfer:Ke,toXYZ:Et,fromXYZ:Dt,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:We},outputColorSpaceConfig:{drawingBufferColorSpace:We}},[We]:{primaries:t,whitePoint:r,transfer:qe,toXYZ:Et,fromXYZ:Dt,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:We}}}),e}var kt=Ot();function At(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function jt(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}var Mt,Nt=class{static getDataURL(e,t=`image/png`){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Mt===void 0&&(Mt=$e(`canvas`)),Mt.width=e.width,Mt.height=e.height;let t=Mt.getContext(`2d`);e instanceof ImageData?t.putImageData(e,0,0):t.drawImage(e,0,0,e.width,e.height),n=Mt}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=$e(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=At(i[e]/255)*255;return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(At(t[e]/255)*255):t[e]=At(t[e]);return{data:t,width:e.width,height:e.height}}return V(`ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}},Pt=0,Ft=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Pt++}),this.uuid=ft(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<`u`&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t===null?e.set(0,0,0):e.set(t.width||0,t.height||0,t.depth||0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(It(r[t].image)):e.push(It(r[t]))}else e=It(r);n.url=e}return t||(e.images[this.uuid]=n),n}};function It(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?Nt.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(V(`Texture: Unable to serialize Texture.`),{})}var Lt=0,Rt=new H,zt=class e extends ct{constructor(t=e.DEFAULT_IMAGE,n=e.DEFAULT_MAPPING,r=u,i=u,a=h,o=_,s=N,c=v,l=e.DEFAULT_ANISOTROPY,d=``){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Lt++}),this.uuid=ft(),this.name=``,this.source=new Ft(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=r,this.wrapT=i,this.magFilter=a,this.minFilter=o,this.anisotropy=l,this.format=s,this.internalFormat=null,this.type=c,this.offset=new bt(0,0),this.repeat=new bt(1,1),this.center=new bt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new wt,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(Rt).x}get height(){return this.source.getSize(Rt).y}get depth(){return this.source.getSize(Rt).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.mipmapsAutoUpdate=e.mipmapsAutoUpdate,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isPMREMTexture=e.isPMREMTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){V(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];r===void 0?V(`Texture.setValues(): property '${t}' does not exist.`):r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case l:e.x-=Math.floor(e.x);break;case u:e.x=e.x<0?0:1;break;case d:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x-=Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case l:e.y-=Math.floor(e.y);break;case u:e.y=e.y<0?0:1;break;case d:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y-=Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};zt.DEFAULT_IMAGE=null,zt.DEFAULT_MAPPING=300,zt.DEFAULT_ANISOTROPY=1,c=Symbol.iterator;var Bt=class{constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`THREE.Vector4: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`THREE.Vector4: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,s=e.elements,c=s[0],l=s[4],u=s[8],d=s[1],f=s[5],p=s[9],m=s[2],h=s[6],g=s[10];if(Math.abs(l-d)<a&&Math.abs(u-m)<a&&Math.abs(p-h)<a){if(Math.abs(l+d)<o&&Math.abs(u+m)<o&&Math.abs(p+h)<o&&Math.abs(c+f+g-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(c+1)/2,s=(f+1)/2,_=(g+1)/2,v=(l+d)/4,y=(u+m)/4,b=(p+h)/4;return e>s&&e>_?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=v/n,i=y/n):s>_?s<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(s),n=v/r,i=b/r):_<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),n=y/i,r=b/i),this.set(n,r,i,t),this}let _=Math.sqrt((h-p)*(h-p)+(u-m)*(u-m)+(d-l)*(d-l));return Math.abs(_)<.001&&(_=1),this.x=(h-p)/_,this.y=(u-m)/_,this.z=(d-l)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=pt(this.x,e.x,t.x),this.y=pt(this.y,e.y,t.y),this.z=pt(this.z,e.z,t.z),this.w=pt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=pt(this.x,e,t),this.y=pt(this.y,e,t),this.z=pt(this.z,e,t),this.w=pt(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(pt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[c](){yield this.x,yield this.y,yield this.z,yield this.w}};r=Bt,r.prototype.isVector4=!0;var Vt=class extends ct{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:h,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Bt(0,0,e,t),this.scissorTest=!1,this.viewport=new Bt(0,0,e,t),this.textures=[];let r=n.count;for(let i=0;i<r;i++)this.textures[i]=new zt({width:e,height:t,depth:n.depth}),this.textures[i].isRenderTargetTexture=!0,this.textures[i].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:h,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.mipmapsAutoUpdate!==void 0&&(t.mipmapsAutoUpdate=e.mipmapsAutoUpdate),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let e=0;e<this.textures.length;e++)this.textures[e].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,i=this.textures.length;r<i;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let n=Object.assign({},e.textures[t].image);this.textures[t].source=new Ft(n)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null){if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture}else this.depthTexture=null;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:`dispose`})}},Ht=class extends Vt{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Ut=class extends zt{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=f,this.minFilter=f,this.wrapR=u,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},Wt=class extends zt{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=f,this.minFilter=f,this.wrapR=u,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}},Gt=class e{constructor(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,r=1/Kt.setFromMatrixColumn(e,0).length(),i=1/Kt.setFromMatrixColumn(e,1).length(),a=1/Kt.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else if(e.order===`YXZ`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*c,t[1]=a*u,t[5]=a*l,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*s}else if(e.order===`ZXY`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e-i*o,t[4]=-a*u,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*l,t[9]=i-e*o,t[2]=-a*c,t[6]=o,t[10]=a*s}else if(e.order===`ZYX`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=r*c-n,t[8]=e*c+i,t[1]=s*u,t[5]=i*c+e,t[9]=n*c-r,t[2]=-c,t[6]=o*s,t[10]=a*s}else if(e.order===`YZX`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=i-e*u,t[8]=r*u+n,t[1]=u,t[5]=a*l,t[9]=-o*l,t[2]=-c*l,t[6]=n*u+r,t[10]=e-i*u}else if(e.order===`XZY`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=-u,t[8]=c*l,t[1]=e*u+i,t[5]=a*l,t[9]=n*u-r,t[2]=r*u-n,t[6]=o*l,t[10]=i*u+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Jt,e,Yt)}lookAt(e,t,n){let r=this.elements;return Qt.subVectors(e,t),Qt.lengthSq()===0&&(Qt.z=1),Qt.normalize(),Xt.crossVectors(n,Qt),Xt.lengthSq()===0&&(Math.abs(n.z)===1?Qt.x+=1e-4:Qt.z+=1e-4,Qt.normalize(),Xt.crossVectors(n,Qt)),Xt.normalize(),Zt.crossVectors(Qt,Xt),r[0]=Xt.x,r[4]=Zt.x,r[8]=Qt.x,r[1]=Xt.y,r[5]=Zt.y,r[9]=Qt.y,r[2]=Xt.z,r[6]=Zt.z,r[10]=Qt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],O=r[13],k=r[2],A=r[6],j=r[10],M=r[14],N=r[3],ee=r[7],P=r[11],te=r[15];return i[0]=a*x+o*T+s*k+c*N,i[4]=a*S+o*E+s*A+c*ee,i[8]=a*C+o*D+s*j+c*P,i[12]=a*w+o*O+s*M+c*te,i[1]=l*x+u*T+d*k+f*N,i[5]=l*S+u*E+d*A+f*ee,i[9]=l*C+u*D+d*j+f*P,i[13]=l*w+u*O+d*M+f*te,i[2]=p*x+m*T+h*k+g*N,i[6]=p*S+m*E+h*A+g*ee,i[10]=p*C+m*D+h*j+g*P,i[14]=p*w+m*O+h*M+g*te,i[3]=_*x+v*T+y*k+b*N,i[7]=_*S+v*E+y*A+b*ee,i[11]=_*C+v*D+y*j+b*P,i[15]=_*w+v*O+y*M+b*te,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15],_=s*f-c*d,v=o*f-c*u,y=o*d-s*u,b=a*f-c*l,x=a*d-s*l,S=a*u-o*l;return t*(m*_-h*v+g*y)-n*(p*_-h*b+g*x)+r*(p*v-m*b+g*S)-i*(p*y-m*x+h*S)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[1],a=e[5],o=e[9],s=e[2],c=e[6],l=e[10];return t*(a*l-o*c)-n*(i*l-o*s)+r*(i*c-a*s)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=t*o-n*a,v=t*s-r*a,y=t*c-i*a,b=n*s-r*o,x=n*c-i*o,S=r*c-i*s,C=l*m-u*p,w=l*h-d*p,T=l*g-f*p,E=u*h-d*m,D=u*g-f*m,O=d*g-f*h,k=_*O-v*D+y*E+b*T-x*w+S*C;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/k;return e[0]=(o*O-s*D+c*E)*A,e[1]=(r*D-n*O-i*E)*A,e[2]=(m*S-h*x+g*b)*A,e[3]=(d*x-u*S-f*b)*A,e[4]=(s*T-a*O-c*w)*A,e[5]=(t*O-r*T+i*w)*A,e[6]=(h*y-p*S-g*v)*A,e[7]=(l*S-d*y+f*v)*A,e[8]=(a*D-o*T+c*C)*A,e[9]=(n*T-t*D-i*C)*A,e[10]=(p*x-m*y+g*_)*A,e[11]=(u*y-l*x-f*_)*A,e[12]=(o*w-a*E-s*C)*A,e[13]=(t*E-n*w+r*C)*A,e[14]=(m*v-p*b-h*_)*A,e[15]=(l*b-u*v+d*_)*A,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let i=this.determinantAffine();if(i===0)return n.set(1,1,1),t.identity(),this;let a=Kt.set(r[0],r[1],r[2]).length(),o=Kt.set(r[4],r[5],r[6]).length(),s=Kt.set(r[8],r[9],r[10]).length();i<0&&(a=-a),qt.copy(this);let c=1/a,l=1/o,u=1/s;return qt.elements[0]*=c,qt.elements[1]*=c,qt.elements[2]*=c,qt.elements[4]*=l,qt.elements[5]*=l,qt.elements[6]*=l,qt.elements[8]*=u,qt.elements[9]*=u,qt.elements[10]*=u,t.setFromRotationMatrix(qt),n.x=a,n.y=o,n.z=s,this}makePerspective(e,t,n,r,i,a,o=Xe,s=!1){let c=this.elements,l=2*i/(t-e),u=2*i/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),p,m;if(s)p=i/(a-i),m=a*i/(a-i);else if(o===2e3)p=-(a+i)/(a-i),m=-2*a*i/(a-i);else if(o===2001)p=-a/(a-i),m=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=Xe,s=!1){let c=this.elements,l=2/(t-e),u=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r),p,m;if(s)p=1/(a-i),m=a/(a-i);else if(o===2e3)p=-2/(a-i),m=-(a+i)/(a-i);else if(o===2001)p=-1/(a-i),m=-i/(a-i);else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};i=Gt,i.prototype.isMatrix4=!0;var Kt=new H,qt=new Gt,Jt=new H(0,0,0),Yt=new H(1,1,1),Xt=new H,Zt=new H,Qt=new H,$t=new Gt,en=new xt,tn=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10];switch(t){case`XYZ`:this._y=Math.asin(pt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-pt(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(pt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-pt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(pt(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-pt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:V(`Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return $t.makeRotationFromQuaternion(e),this.setFromRotationMatrix($t,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return en.setFromEuler(this),this.setFromQuaternion(en,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};tn.DEFAULT_ORDER=`XYZ`;var nn=class{constructor(){this.mask=1}set(e){this.mask=1<<e>>>0}enable(e){this.mask|=1<<e}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e}disable(e){this.mask&=~(1<<e)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&1<<e)}},rn=0,an=new H,on=new xt,sn=new Gt,cn=new H,ln=new H,un=new H,dn=new xt,fn=new H(1,0,0),pn=new H(0,1,0),mn=new H(0,0,1),hn={type:`added`},gn={type:`removed`},_n={type:`childadded`,child:null},vn={type:`childremoved`,child:null},yn=class e extends ct{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:rn++}),this.uuid=ft(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new H,n=new tn,r=new xt,i=new H(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Gt},normalMatrix:{value:new wt}}),this.matrix=new Gt,this.matrixWorld=new Gt,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new nn,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return on.setFromAxisAngle(e,t),this.quaternion.multiply(on),this}rotateOnWorldAxis(e,t){return on.setFromAxisAngle(e,t),this.quaternion.premultiply(on),this}rotateX(e){return this.rotateOnAxis(fn,e)}rotateY(e){return this.rotateOnAxis(pn,e)}rotateZ(e){return this.rotateOnAxis(mn,e)}translateOnAxis(e,t){return an.copy(e).applyQuaternion(this.quaternion),this.position.add(an.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(fn,e)}translateY(e){return this.translateOnAxis(pn,e)}translateZ(e){return this.translateOnAxis(mn,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(sn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?cn.copy(e):cn.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),ln.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?sn.lookAt(ln,cn,this.up):sn.lookAt(cn,ln,this.up),this.quaternion.setFromRotationMatrix(sn),r&&(sn.extractRotation(r.matrixWorld),on.setFromRotationMatrix(sn),this.quaternion.premultiply(on.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?(it(`Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(hn),_n.child=e,this.dispatchEvent(_n),_n.child=null):it(`Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(gn),vn.child=e,this.dispatchEvent(vn),vn.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),sn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),sn.multiply(e.parent.matrixWorld)),e.applyMatrix4(sn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(hn),_n.child=e,this.dispatchEvent(_n),_n.child=null,this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ln,e,un),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ln,dn,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,i=this.matrix.elements;i[12]+=t-i[0]*t-i[4]*n-i[8]*r,i[13]+=n-i[1]*t-i[5]*n-i[9]*r,i[14]+=r-i[2]*t-i[6]*n-i[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let e=this.children;for(let t=0,r=e.length;t<r;t++)e[t].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox?e.boundingBox.toJSON():void 0,boundingSphere:e.boundingSphere?e.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(e=>({...e})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0){if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material)}if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),s=a(e.shapes),c=a(e.skeletons),l=a(e.animations),u=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),s.length>0&&(n.shapes=s),c.length>0&&(n.skeletons=c),l.length>0&&(n.animations=l),u.length>0&&(n.nodes=u)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot===null?null:e.pivot.clone(),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}dispose(){this.dispatchEvent({type:`dispose`})}};yn.DEFAULT_UP=new H(0,1,0),yn.DEFAULT_MATRIX_AUTO_UPDATE=!0,yn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var bn=class extends yn{constructor(){super(),this.isGroup=!0,this.type=`Group`}},xn={type:`move`},Sn=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new bn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new bn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new H,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new H),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new bn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new H,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new H,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,i=null,a=null,o=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(c&&e.hand){a=!0;for(let r of e.hand.values()){let e=t.getJointPose(r,n),i=this._getHandJoint(c,r);e!==null&&(i.matrix.fromArray(e.transform.matrix),i.matrix.decompose(i.position,i.quaternion,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=e.radius),i.visible=e!==null}let r=c.joints[`index-finger-tip`],i=c.joints[`thumb-tip`],o=r.position.distanceTo(i.position);c.inputState.pinching&&o>.025?(c.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!c.inputState.pinching&&o<=.015&&(c.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(s.matrix.fromArray(i.transform.matrix),s.matrix.decompose(s.position,s.quaternion,s.scale),s.matrixWorldNeedsUpdate=!0,i.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(i.linearVelocity)):s.hasLinearVelocity=!1,i.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(i.angularVelocity)):s.hasAngularVelocity=!1,s.eventsEnabled&&s.dispatchEvent({type:`gripUpdated`,data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&i!==null&&(r=i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(xn)))}return o!==null&&(o.visible=r!==null),s!==null&&(s.visible=i!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new bn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Cn={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},wn={h:0,s:0,l:0},Tn={h:0,s:0,l:0};function En(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var U=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=We){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,kt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=kt.workingColorSpace){return this.r=e,this.g=t,this.b=n,kt.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=kt.workingColorSpace){if(e=mt(e,1),t=pt(t,0,1),n=pt(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=En(i,r,e+1/3),this.g=En(i,r,e),this.b=En(i,r,e-1/3)}return kt.colorSpaceToWorking(this,r),this}setStyle(e,t=We){function n(t){t!==void 0&&parseFloat(t)<1&&V(`Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseFloat(i[1]))/100,Math.min(100,parseFloat(i[2]))/100,Math.min(100,parseFloat(i[3]))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:V(`Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);V(`Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=We){let n=Cn[e.toLowerCase()];return n===void 0?V(`Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=At(e.r),this.g=At(e.g),this.b=At(e.b),this}copyLinearToSRGB(e){return this.r=jt(e.r),this.g=jt(e.g),this.b=jt(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=We){return kt.workingToColorSpace(Dn.copy(this),e),Math.round(pt(Dn.r*255,0,255))*65536+Math.round(pt(Dn.g*255,0,255))*256+Math.round(pt(Dn.b*255,0,255))}getHexString(e=We){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=kt.workingColorSpace){kt.workingToColorSpace(Dn.copy(this),t);let n=Dn.r,r=Dn.g,i=Dn.b,a=Math.max(n,r,i),o=Math.min(n,r,i),s,c,l=(o+a)/2;if(o===a)s=0,c=0;else{let e=a-o;switch(c=l<=.5?e/(a+o):e/(2-a-o),a){case n:s=(r-i)/e+(r<i?6:0);break;case r:s=(i-n)/e+2;break;case i:s=(n-r)/e+4}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=kt.workingColorSpace){return kt.workingToColorSpace(Dn.copy(this),t),e.r=Dn.r,e.g=Dn.g,e.b=Dn.b,e}getStyle(e=We){kt.workingToColorSpace(Dn.copy(this),e);let t=Dn.r,n=Dn.g,r=Dn.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(wn),this.setHSL(wn.h+e,wn.s+t,wn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(wn),e.getHSL(Tn);let n=ht(wn.h,Tn.h,t),r=ht(wn.s,Tn.s,t),i=ht(wn.l,Tn.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Dn=new U;U.NAMES=Cn;var On=class e{constructor(e,t=1,n=1e3){this.isFog=!0,this.name=``,this.color=new U(e),this.near=t,this.far=n}clone(){return new e(this.color,this.near,this.far)}toJSON(){return{type:`Fog`,name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},kn=class extends yn{constructor(){super(),this.isScene=!0,this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new tn,this.environmentIntensity=1,this.environmentRotation=new tn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}copy(e,t){return super.copy(e,t),this.background=e.background===null?null:e.background.clone(),this.environment=e.environment===null?null:e.environment.clone(),this.fog=e.fog===null?null:e.fog.clone(),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),this.overrideMaterial=e.overrideMaterial===null?null:e.overrideMaterial.clone(),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},An=new H,jn=new H,Mn=new H,Nn=new H,Pn=new H,Fn=new H,In=new H,Ln=new H,Rn=new H,zn=new H,Bn=new Bt,Vn=new Bt,Hn=new Bt,Un=class e{constructor(e=new H,t=new H,n=new H){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),An.subVectors(e,t),r.cross(An);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,n,r,i){An.subVectors(r,t),jn.subVectors(n,t),Mn.subVectors(e,t);let a=An.dot(An),o=An.dot(jn),s=An.dot(Mn),c=jn.dot(jn),l=jn.dot(Mn),u=a*c-o*o;if(u===0)return i.set(0,0,0),null;let d=1/u,f=(c*s-o*l)*d,p=(a*l-o*s)*d;return i.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,Nn)!==null&&Nn.x>=0&&Nn.y>=0&&Nn.x+Nn.y<=1}static getInterpolation(e,t,n,r,i,a,o,s){return this.getBarycoord(e,t,n,r,Nn)===null?(s.x=0,s.y=0,`z`in s&&(s.z=0),`w`in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(i,Nn.x),s.addScaledVector(a,Nn.y),s.addScaledVector(o,Nn.z),s)}static getInterpolatedAttribute(e,t,n,r,i,a){return Bn.setScalar(0),Vn.setScalar(0),Hn.setScalar(0),Bn.fromBufferAttribute(e,t),Vn.fromBufferAttribute(e,n),Hn.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Bn,i.x),a.addScaledVector(Vn,i.y),a.addScaledVector(Hn,i.z),a}static isFrontFacing(e,t,n,r){return An.subVectors(n,t),jn.subVectors(e,t),An.cross(jn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return An.subVectors(this.c,this.b),jn.subVectors(this.a,this.b),An.cross(jn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,r,i,a){return e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,i=this.c,a,o;Pn.subVectors(r,n),Fn.subVectors(i,n),Ln.subVectors(e,n);let s=Pn.dot(Ln),c=Fn.dot(Ln);if(s<=0&&c<=0)return t.copy(n);Rn.subVectors(e,r);let l=Pn.dot(Rn),u=Fn.dot(Rn);if(l>=0&&u<=l)return t.copy(r);let d=s*u-l*c;if(d<=0&&s>=0&&l<=0&&s-l>0)return a=s/(s-l),t.copy(n).addScaledVector(Pn,a);zn.subVectors(e,i);let f=Pn.dot(zn),p=Fn.dot(zn);if(p>=0&&f<=p)return t.copy(i);let m=f*c-s*p;if(m<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(Fn,o);let h=l*p-f*u;if(h<=0&&u-l>=0&&f-p>=0)return In.subVectors(i,r),o=(u-l)/(u-l+(f-p)),t.copy(r).addScaledVector(In,o);let g=1/(h+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector(Pn,a).addScaledVector(Fn,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Wn=class{constructor(e=new H(1/0,1/0,1/0),t=new H(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Kn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Kn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Kn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0&&e.isBatchedMesh!==!0)for(let t=0,n=r.count;t<n;t++)e.isMesh===!0?e.getVertexPosition(t,Kn):Kn.fromBufferAttribute(r,t),Kn.applyMatrix4(e.matrixWorld),this.expandByPoint(Kn);else e.boundingBox===void 0?(n.boundingBox===null&&n.computeBoundingBox(),qn.copy(n.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),qn.copy(e.boundingBox)),qn.applyMatrix4(e.matrixWorld),this.union(qn)}let r=e.children;for(let e=0,n=r.length;e<n;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Kn),Kn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(er),tr.subVectors(this.max,er),Jn.subVectors(e.a,er),Yn.subVectors(e.b,er),Xn.subVectors(e.c,er),Zn.subVectors(Yn,Jn),Qn.subVectors(Xn,Yn),$n.subVectors(Jn,Xn);let t=[0,-Zn.z,Zn.y,0,-Qn.z,Qn.y,0,-$n.z,$n.y,Zn.z,0,-Zn.x,Qn.z,0,-Qn.x,$n.z,0,-$n.x,-Zn.y,Zn.x,0,-Qn.y,Qn.x,0,-$n.y,$n.x,0];return!ir(t,Jn,Yn,Xn,tr)||(t=[1,0,0,0,1,0,0,0,1],!ir(t,Jn,Yn,Xn,tr))?!1:(nr.crossVectors(Zn,Qn),t=[nr.x,nr.y,nr.z],ir(t,Jn,Yn,Xn,tr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Kn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Kn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()||(Gn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Gn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Gn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Gn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Gn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Gn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Gn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Gn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Gn)),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Gn=[new H,new H,new H,new H,new H,new H,new H,new H],Kn=new H,qn=new Wn,Jn=new H,Yn=new H,Xn=new H,Zn=new H,Qn=new H,$n=new H,er=new H,tr=new H,nr=new H,rr=new H;function ir(e,t,n,r,i){for(let a=0,o=e.length-3;a<=o;a+=3){rr.fromArray(e,a);let o=i.x*Math.abs(rr.x)+i.y*Math.abs(rr.y)+i.z*Math.abs(rr.z),s=t.dot(rr),c=n.dot(rr),l=r.dot(rr);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>o)return!1}return!0}var ar=new H,or=new bt,sr=0,cr=class extends ct{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:sr++}),this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=Ye,this.updateRanges=[],this.gpuType=w,this.version=0,this._normalizationScale=e===void 0?void 0:_t(e)}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this._normalizationScale=e._normalizationScale,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)or.fromBufferAttribute(this,t),or.applyMatrix3(e),this.setXY(t,or.x,or.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)ar.fromBufferAttribute(this,t),ar.applyMatrix3(e),this.setXYZ(t,ar.x,ar.y,ar.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)ar.fromBufferAttribute(this,t),ar.applyMatrix4(e),this.setXYZ(t,ar.x,ar.y,ar.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)ar.fromBufferAttribute(this,t),ar.applyNormalMatrix(e),this.setXYZ(t,ar.x,ar.y,ar.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)ar.fromBufferAttribute(this,t),ar.transformDirection(e),this.setXYZ(t,ar.x,ar.y,ar.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=this._denormalize(t)),t}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=this._denormalize(t)),t}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=this._denormalize(t)),t}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=this._denormalize(t)),t}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),r=this._normalize(r)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),r=this._normalize(r),i=this._normalize(i)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:`dispose`})}_denormalize(e){let t=this._normalizationScale;return t===void 0?vt(e,this.array):Math.max(e/t,-1)}_normalize(e){let t=this._normalizationScale;return t===void 0?yt(e,this.array):Math.round(e*t)}},lr=class extends cr{constructor(e,t,n){super(new Uint16Array(e),t,n)}},ur=class extends cr{constructor(e,t,n){super(new Uint32Array(e),t,n)}},dr=class extends cr{constructor(e,t,n){super(new Float32Array(e),t,n)}},fr=new Wn,pr=new H,mr=new H,hr=class{constructor(e=new H,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?fr.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;pr.subVectors(e,this.center);let t=pr.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(pr,n/e),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(mr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(pr.copy(e.center).add(mr)),this.expandByPoint(pr.copy(e.center).sub(mr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},gr=0,_r=new Gt,vr=new yn,yr=new H,br=new Wn,xr=new Wn,Sr=new H,Cr=class e extends ct{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:gr++}),this.uuid=ft(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return this.index=Array.isArray(e)?new(Ze(e)?ur:lr)(e,1):e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let t=new wt().getNormalMatrix(e);n.applyNormalMatrix(t),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return _r.makeRotationFromQuaternion(e),this.applyMatrix4(_r),this}rotateX(e){return _r.makeRotationX(e),this.applyMatrix4(_r),this}rotateY(e){return _r.makeRotationY(e),this.applyMatrix4(_r),this}rotateZ(e){return _r.makeRotationZ(e),this.applyMatrix4(_r),this}translate(e,t,n){return _r.makeTranslation(e,t,n),this.applyMatrix4(_r),this}scale(e,t,n){return _r.makeScale(e,t,n),this.applyMatrix4(_r),this}lookAt(e){return vr.lookAt(e),vr.updateMatrix(),this.applyMatrix4(vr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(yr).negate(),this.translate(yr.x,yr.y,yr.z),this}setFromPoints(e){let t=this.getAttribute(`position`);if(t===void 0){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}this.setAttribute(`position`,new dr(t,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let n=e[r];t.setXYZ(r,n.x,n.y,n.z||0)}e.length>t.count&&V(`BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Wn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)it(`BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`,this),this.boundingBox.set(new H(-1/0,-1/0,-1/0),new H(1/0,1/0,1/0));else{if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];br.setFromBufferAttribute(n),this.morphTargetsRelative?(Sr.addVectors(this.boundingBox.min,br.min),this.boundingBox.expandByPoint(Sr),Sr.addVectors(this.boundingBox.max,br.max),this.boundingBox.expandByPoint(Sr)):(this.boundingBox.expandByPoint(br.min),this.boundingBox.expandByPoint(br.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&it(`BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new hr);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)it(`BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`,this),this.boundingSphere.set(new H,1/0);else if(e){let n=this.boundingSphere.center;if(br.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];xr.setFromBufferAttribute(n),this.morphTargetsRelative?(Sr.addVectors(br.min,xr.min),br.expandByPoint(Sr),Sr.addVectors(br.max,xr.max),br.expandByPoint(Sr)):(br.expandByPoint(xr.min),br.expandByPoint(xr.max))}br.getCenter(n);let r=0;for(let t=0,i=e.count;t<i;t++)Sr.fromBufferAttribute(e,t),r=Math.max(r,n.distanceToSquared(Sr));if(t)for(let i=0,a=t.length;i<a;i++){let a=t[i],o=this.morphTargetsRelative;for(let t=0,i=a.count;t<i;t++)Sr.fromBufferAttribute(a,t),o&&(yr.fromBufferAttribute(e,t),Sr.add(yr)),r=Math.max(r,n.distanceToSquared(Sr))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&it(`BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){it(`BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=t.position,r=t.normal,i=t.uv,a=this.getAttribute(`tangent`);(a===void 0||a.count!==n.count)&&(a=new cr(new Float32Array(4*n.count),4),this.setAttribute(`tangent`,a));let o=[],s=[],c=new Uint8Array(n.count);for(let e=0;e<n.count;e++)o[e]=new H,s[e]=new H;let l=new H,u=new H,d=new H,f=new bt,p=new bt,m=new bt,h=new H,g=new H;function _(e,t,r){c[e]=c[t]=c[r]=1,l.fromBufferAttribute(n,e),u.fromBufferAttribute(n,t),d.fromBufferAttribute(n,r),f.fromBufferAttribute(i,e),p.fromBufferAttribute(i,t),m.fromBufferAttribute(i,r),u.sub(l),d.sub(l),p.sub(f),m.sub(f);let a=1/(p.x*m.y-m.x*p.y);isFinite(a)&&(h.copy(u).multiplyScalar(m.y).addScaledVector(d,-p.y).multiplyScalar(a),g.copy(d).multiplyScalar(p.x).addScaledVector(u,-m.x).multiplyScalar(a),o[e].add(h),o[t].add(h),o[r].add(h),s[e].add(g),s[t].add(g),s[r].add(g))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let t=0,n=v.length;t<n;++t){let n=v[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)_(e.getX(t+0),e.getX(t+1),e.getX(t+2))}let y=new H,b=new H,x=new H,S=new H;function C(e){x.fromBufferAttribute(r,e),S.copy(x);let t=o[e];y.copy(t),y.sub(x.multiplyScalar(x.dot(t))).normalize(),b.crossVectors(S,t);let n=b.dot(s[e])<0?-1:1;a.setXYZW(e,y.x,y.y,y.z,n)}for(let e=0,t=n.count;e<t;++e)c[e]&&C(e);this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0||n.count!==t.count)n=new cr(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0,t=n.count;e<t;e++)n.setXYZ(e,0,0,0);let r=new H,i=new H,a=new H,o=new H,s=new H,c=new H,l=new H,u=new H;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d+0),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),o.add(l),s.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(p,s.x,s.y,s.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),n.setXYZ(e+0,l.x,l.y,l.z),n.setXYZ(e+1,l.x,l.y,l.z),n.setXYZ(e+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Sr.fromBufferAttribute(e,t),Sr.normalize(),e.setXYZ(t,Sr.x,Sr.y,Sr.z)}toNonIndexed(){function t(e,t){let n=e.array,r=e.itemSize,i=e.normalized,a=new n.constructor(t.length*r),o=0,s=0;for(let i=0,c=t.length;i<c;i++){o=e.isInterleavedBufferAttribute?t[i]*e.data.stride+e.offset:t[i]*r;for(let e=0;e<r;e++)a[s++]=n[o++]}return new cr(a,r,i)}if(this.index===null)return V(`BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let n=new e,r=this.index.array,i=this.attributes;for(let e in i){let a=i[e],o=t(a,r);n.setAttribute(e,o)}let a=this.morphAttributes;for(let e in a){let i=[],o=a[e];for(let e=0,n=o.length;e<n;e++){let n=o[e],a=t(n,r);i.push(a)}n.morphAttributes[e]=i}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let e=0,t=o.length;e<t;e++){let t=o[e];n.addGroup(t.start,t.count,t.materialIndex)}return n}toJSON(){let e={metadata:{version:4.7,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?`BufferGeometry`:this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let t=this.parameters;for(let n in t)t[n]!==void 0&&(e[n]=t[n]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let t in n){let r=n[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},i=!1;for(let t in this.morphAttributes){let n=this.morphAttributes[t],a=[];for(let t=0,r=n.length;t<r;t++){let r=n[t];a.push(r.toJSON(e.data))}a.length>0&&(r[t]=a,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let e in r){let n=r[e];this.setAttribute(e,n.clone(t))}let i=e.morphAttributes;for(let e in i){let n=[],r=i[e];for(let e=0,i=r.length;e<i;e++)n.push(r[e].clone(t));this.morphAttributes[e]=n}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:`dispose`})}},wr=new H,Tr=new H,Er=new wt,Dr=class{constructor(e=new H(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=wr.subVectors(n,t).cross(Tr.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(wr),i=this.normal.dot(r);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/i;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Er.getNormalMatrix(e),r=this.coplanarPoint(wr).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Or=0,kr=class extends ct{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Or++}),this.uuid=ft(),this.name=``,this.type=`Material`,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new U(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Je,this.stencilZFail=Je,this.stencilZPass=Je,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){V(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];r===void 0?V(`Material: '${t}' is not a property of THREE.${this.type}.`):r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(e).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(e=>e.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}if(t){let t=r(e.textures),i=r(e.images);t.length>0&&(n.textures=t),i.length>0&&(n.images=i)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new U().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.diffuseRoughness!==void 0&&(this.diffuseRoughness=e.diffuseRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum),e.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1]),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(e=>new Dr().fromJSON(e))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(this.vertexColors=typeof e.vertexColors==`number`?e.vertexColors>0:e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let t=e.normalScale;Array.isArray(t)===!1&&(t=[t,t]),this.normalScale=new bt().fromArray(t)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new bt().fromArray(e.clearcoatNormalScale)),e.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=t[e.diffuseRoughnessMap]||null),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let e=t.length;n=Array(e);for(let r=0;r!==e;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}},Ar=new H,jr=new H,Mr=new H,Nr=new H,Pr=class{constructor(e=new H,t=new H(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ar)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Ar.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Ar.copy(this.origin).addScaledVector(this.direction,t),Ar.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){jr.copy(e).add(t).multiplyScalar(.5),Mr.copy(t).sub(e).normalize(),Nr.copy(this.origin).sub(jr);let i=e.distanceTo(t)*.5,a=-this.direction.dot(Mr),o=Nr.dot(this.direction),s=-Nr.dot(Mr),c=Nr.lengthSq(),l=Math.abs(1-a*a),u,d,f,p;if(l>0){if(u=a*s-o,d=a*o-s,p=i*l,u>=0){if(d>=-p){if(d<=p){let e=1/l;u*=e,d*=e,f=u*(u+a*d+2*o)+d*(a*u+d+2*s)+c}else d=i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d=-i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d<=-p?(u=Math.max(0,-(-a*i+o)),d=u>0?-i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c):d<=p?(u=0,d=Math.min(Math.max(-i,-s),i),f=d*(d+2*s)+c):(u=Math.max(0,-(a*i+o)),d=u>0?i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c)}else d=a>0?-i:i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(jr).addScaledVector(Mr,d),f}intersectSphere(e,t){if(e.radius<0)return null;Ar.subVectors(e.center,this.origin);let n=Ar.dot(this.direction),r=Ar.dot(Ar)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,Ar)!==null}intersectTriangle(e,t,n,r,i){let a=this.origin,o=this.direction,s=o.x,c=o.y,l=o.z,u=e.x-a.x,d=e.y-a.y,f=e.z-a.z,p=t.x-a.x,m=t.y-a.y,h=t.z-a.z,g=n.x-a.x,_=n.y-a.y,v=n.z-a.z,y=Math.abs(s),b=Math.abs(c),x=Math.abs(l),S,C,w,T,E,D,O,k,A,j,M,N;if(y>=b&&y>=x?(w=s,D=u,A=p,N=g,s>=0?(S=c,C=l,T=d,E=f,O=m,k=h,j=_,M=v):(S=l,C=c,T=f,E=d,O=h,k=m,j=v,M=_)):b>=x?(w=c,D=d,A=m,N=_,c>=0?(S=l,C=s,T=f,E=u,O=h,k=p,j=v,M=g):(S=s,C=l,T=u,E=f,O=p,k=h,j=g,M=v)):(w=l,D=f,A=h,N=v,l>=0?(S=s,C=c,T=u,E=d,O=p,k=m,j=g,M=_):(S=c,C=s,T=d,E=u,O=m,k=p,j=_,M=g)),w===0)return null;let ee=S/w,P=C/w,te=1/w,F=T-ee*D,ne=E-P*D,re=O-ee*A,ie=k-P*A,ae=j-ee*N,oe=M-P*N,se=ae*ie-oe*re,I=F*oe-ne*ae,L=re*ne-ie*F;if(r){if(se<0||I<0||L<0)return null}else if((se<0||I<0||L<0)&&(se>0||I>0||L>0))return null;let ce=se+I+L;if(ce===0)return null;let le=te*(se*D+I*A+L*N);return(ce>0?le<0:le>0)?null:this.at(le/ce,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Fr=class extends kr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type=`MeshBasicMaterial`,this.color=new U(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new tn,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Ir=new Gt,Lr=new Pr,Rr=new hr,zr=new H,Br=new H,Vr=new H,Hr=new H,Ur=new H,Wr=new H,Gr=new H,Kr=new H,qr=class extends yn{constructor(e=new Cr,t=new Fr){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.morphTargetInfluences=e.morphTargetInfluences===void 0?void 0:e.morphTargetInfluences.slice(),this.morphTargetDictionary=e.morphTargetDictionary===void 0?void 0:Object.assign({},e.morphTargetDictionary),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(i&&o){Wr.set(0,0,0);for(let n=0,r=i.length;n<r;n++){let r=o[n],s=i[n];r!==0&&(Ur.fromBufferAttribute(s,e),a?Wr.addScaledVector(Ur,r):Wr.addScaledVector(Ur.sub(t),r))}t.add(Wr)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Rr.copy(n.boundingSphere),Rr.applyMatrix4(i),Lr.copy(e.ray).recast(e.near),Rr.containsPoint(Lr.origin)===!1&&(Lr.intersectSphere(Rr,zr)===null||Lr.origin.distanceToSquared(zr)>(e.far-e.near)**2)||(Ir.copy(i).invert(),Lr.copy(e.ray).applyMatrix4(Ir),(n.boundingBox===null||Lr.intersectsBox(n.boundingBox)!==!1)&&this._computeIntersections(e,t,Lr)))}_computeIntersections(e,t,n){let r,i=this.geometry,a=this.material,o=i.index,s=i.attributes.position,c=i.attributes.uv,l=i.attributes.uv1,u=i.attributes.normal,d=i.groups,f=i.drawRange;if(o!==null){if(Array.isArray(a))for(let i=0,s=d.length;i<s;i++){let s=d[i],p=a[s.materialIndex],m=Math.max(s.start,f.start),h=Math.min(o.count,Math.min(s.start+s.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=o.getX(i),d=o.getX(i+1),f=o.getX(i+2);r=Yr(this,p,e,n,c,l,u,a,d,f),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=s.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),s=Math.min(o.count,f.start+f.count);for(let d=i,f=s;d<f;d+=3){let i=o.getX(d),s=o.getX(d+1),f=o.getX(d+2);r=Yr(this,a,e,n,c,l,u,i,s,f),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}}else if(s!==void 0){if(Array.isArray(a))for(let i=0,o=d.length;i<o;i++){let o=d[i],p=a[o.materialIndex],m=Math.max(o.start,f.start),h=Math.min(s.count,Math.min(o.start+o.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=i,s=i+1,d=i+2;r=Yr(this,p,e,n,c,l,u,a,s,d),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=o.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),o=Math.min(s.count,f.start+f.count);for(let s=i,d=o;s<d;s+=3){let i=s,o=s+1,d=s+2;r=Yr(this,a,e,n,c,l,u,i,o,d),r&&(r.faceIndex=Math.floor(s/3),t.push(r))}}}}};function Jr(e,t,n,r,i,a,o,s){let c;if(c=t.side===1?r.intersectTriangle(o,a,i,!0,s):r.intersectTriangle(i,a,o,t.side===0,s),c===null)return null;Kr.copy(s),Kr.applyMatrix4(e.matrixWorld);let l=n.ray.origin.distanceTo(Kr);return l<n.near||l>n.far?null:{distance:l,point:Kr.clone(),object:e}}function Yr(e,t,n,r,i,a,o,s,c,l){e.getVertexPosition(s,Br),e.getVertexPosition(c,Vr),e.getVertexPosition(l,Hr);let u=Jr(e,t,n,r,Br,Vr,Hr,Gr);if(u){let e=new H;Un.getBarycoord(Gr,Br,Vr,Hr,e),i&&(u.uv=Un.getInterpolatedAttribute(i,s,c,l,e,new bt)),a&&(u.uv1=Un.getInterpolatedAttribute(a,s,c,l,e,new bt)),o&&(u.normal=Un.getInterpolatedAttribute(o,s,c,l,e,new H),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let t={a:s,b:c,c:l,normal:new H,materialIndex:0};Un.getNormal(Br,Vr,Hr,t.normal),u.face=t,u.barycoord=e}return u}var Xr=class extends zt{constructor(e=null,t=1,n=1,r,i,a,o,s,c=f,l=f,u,d){super(null,a,o,s,c,l,r,i,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Zr=class extends cr{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Qr=new Gt,$r=new Gt,ei=[],ti=new Wn,ni=new Gt,ri=new qr,ii=new hr,ai=class extends qr{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Zr(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let e=0;e<n;e++)this.setMatrixAt(e,ni)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Wn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Qr),ti.copy(e.boundingBox).applyMatrix4(Qr),this.boundingBox.union(ti)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new hr),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Qr),ii.copy(e.boundingSphere).applyMatrix4(Qr),this.boundingSphere.union(ii)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),this.morphTexture=e.morphTexture===null?null:e.morphTexture.clone(),this.instanceColor=e.instanceColor===null?null:e.instanceColor.clone(),this.count=e.count,this.boundingBox=e.boundingBox===null?null:e.boundingBox.clone(),this.boundingSphere=e.boundingSphere===null?null:e.boundingSphere.clone(),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,i=e*(n.length+1)+1;for(let e=0;e<n.length;e++)n[e]=r[i+e]}raycast(e,t){let n=this.matrixWorld,r=this.count;if(ri.geometry=this.geometry,ri.material=this.material,ri.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ii.copy(this.boundingSphere),ii.applyMatrix4(n),e.ray.intersectsSphere(ii)!==!1))for(let i=0;i<r;i++){this.getMatrixAt(i,Qr),$r.multiplyMatrices(n,Qr),ri.matrixWorld=$r,ri.raycast(e,ei);for(let e=0,n=ei.length;e<n;e++){let n=ei[e];n.instanceId=i,n.object=this,t.push(n)}ei.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Zr(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new Xr(new Float32Array(r*this.count),r,this.count,te,w));let i=this.morphTexture.source.data.data,a=0;for(let e=0;e<n.length;e++)a+=n[e];let o=this.geometry.morphTargetsRelative?1:1-a,s=r*e;return i[s]=o,i.set(n,s+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.instanceMatrix.dispose(),this.instanceColor!==null&&this.instanceColor.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},oi=new hr,si=new bt(.5,.5),ci=new H,li=class{constructor(e=new Dr,t=new Dr,n=new Dr,r=new Dr,i=new Dr,a=new Dr){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Xe,n=!1){let r=this.planes,i=e.elements,a=i[0],o=i[1],s=i[2],c=i[3],l=i[4],u=i[5],d=i[6],f=i[7],p=i[8],m=i[9],h=i[10],g=i[11],_=i[12],v=i[13],y=i[14],b=i[15];if(r[0].setComponents(c-a,f-l,g-p,b-_).normalize(),r[1].setComponents(c+a,f+l,g+p,b+_).normalize(),r[2].setComponents(c+o,f+u,g+m,b+v).normalize(),r[3].setComponents(c-o,f-u,g-m,b-v).normalize(),n)r[4].setComponents(s,d,h,y).normalize(),r[5].setComponents(c-s,f-d,g-h,b-y).normalize();else if(r[4].setComponents(c-s,f-d,g-h,b-y).normalize(),t===2e3)r[5].setComponents(c+s,f+d,g+h,b+y).normalize();else if(t===2001)r[5].setComponents(s,d,h,y).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),oi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),oi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(oi)}intersectsSprite(e){return oi.center.set(0,0,0),oi.radius=.7071067811865476+si.distanceTo(e.center),oi.applyMatrix4(e.matrixWorld),this.intersectsSphere(oi)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(ci.x=r.normal.x>0?e.max.x:e.min.x,ci.y=r.normal.y>0?e.max.y:e.min.y,ci.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(ci)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},ui=new Gt,di=class e{constructor(){this.coordinateSystem=Xe,this._frustums=[],this._count=0}setFromArrayCamera(e){let t=e.cameras,n=this._frustums;for(let e=0;e<t.length;e++){let r=t[e];ui.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[e]===void 0&&(n[e]=new li),n[e].setFromProjectionMatrix(ui,r.coordinateSystem,r.reversedDepth)}return this._count=t.length,this}getFrustum(e){return this._frustums[e]}intersectsObject(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsObject(e))return!0;return!1}intersectsSprite(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSprite(e))return!0;return!1}intersectsSphere(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSphere(e))return!0;return!1}intersectsBox(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsBox(e))return!0;return!1}containsPoint(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;let t=this._frustums,n=e._frustums;for(let r=0;r<e._count;r++)t[r]===void 0&&(t[r]=new li),t[r].copy(n[r]);return this._count=e._count,this}clone(){return new e().copy(this)}},fi=class extends kr{constructor(e){super(),this.isLineBasicMaterial=!0,this.type=`LineBasicMaterial`,this.color=new U(16777215),this.map=null,this.linewidth=1,this.linecap=`round`,this.linejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},pi=new H,mi=new H,hi=new Gt,gi=new Pr,_i=new hr,vi=new H,yi=new H,bi=class extends yn{constructor(e=new Cr,t=new fi){super(),this.isLine=!0,this.type=`Line`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.morphTargetInfluences=e.morphTargetInfluences===void 0?void 0:e.morphTargetInfluences.slice(),this.morphTargetDictionary=e.morphTargetDictionary===void 0?void 0:Object.assign({},e.morphTargetDictionary),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let e=1,r=t.count;e<r;e++)pi.fromBufferAttribute(t,e-1),mi.fromBufferAttribute(t,e),n[e]=n[e-1],n[e]+=pi.distanceTo(mi);e.setAttribute(`lineDistance`,new dr(n,1))}else V(`Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.`);return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),_i.copy(n.boundingSphere),_i.applyMatrix4(r),_i.radius+=i,e.ray.intersectsSphere(_i)===!1)return;hi.copy(r).invert(),gi.copy(e.ray).applyMatrix4(hi);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=this.isLineSegments?2:1,l=n.index,u=n.attributes.position;if(l!==null){let n=Math.max(0,a.start),r=Math.min(l.count,a.start+a.count);for(let i=n,a=r-1;i<a;i+=c){let n=l.getX(i),r=l.getX(i+1),a=xi(this,e,gi,s,n,r,i);a&&t.push(a)}if(this.isLineLoop){let i=l.getX(r-1),a=l.getX(n),o=xi(this,e,gi,s,i,a,r-1);o&&t.push(o)}}else{let n=Math.max(0,a.start),r=Math.min(u.count,a.start+a.count);for(let i=n,a=r-1;i<a;i+=c){let n=xi(this,e,gi,s,i,i+1,i);n&&t.push(n)}if(this.isLineLoop){let i=xi(this,e,gi,s,r-1,n,r-1);i&&t.push(i)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function xi(e,t,n,r,i,a,o){let s=e.geometry.attributes.position;if(pi.fromBufferAttribute(s,i),mi.fromBufferAttribute(s,a),n.distanceSqToSegment(pi,mi,vi,yi)>r)return;vi.applyMatrix4(e.matrixWorld);let c=t.ray.origin.distanceTo(vi);if(!(c<t.near||c>t.far))return{distance:c,point:yi.clone().applyMatrix4(e.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:e}}var Si=new H,Ci=new H,wi=class extends bi{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type=`LineSegments`}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let e=0,r=t.count;e<r;e+=2)Si.fromBufferAttribute(t,e),Ci.fromBufferAttribute(t,e+1),n[e]=e===0?0:n[e-1],n[e+1]=n[e]+Si.distanceTo(Ci);e.setAttribute(`lineDistance`,new dr(n,1))}else V(`LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.`);return this}},Ti=class extends kr{constructor(e){super(),this.isPointsMaterial=!0,this.type=`PointsMaterial`,this.color=new U(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Ei=new Gt,Di=new Pr,Oi=new hr,ki=new H,Ai=class extends yn{constructor(e=new Cr,t=new Ti){super(),this.isPoints=!0,this.type=`Points`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.morphTargetInfluences=e.morphTargetInfluences===void 0?void 0:e.morphTargetInfluences.slice(),this.morphTargetDictionary=e.morphTargetDictionary===void 0?void 0:Object.assign({},e.morphTargetDictionary),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Oi.copy(n.boundingSphere),Oi.applyMatrix4(r),Oi.radius+=i,e.ray.intersectsSphere(Oi)===!1)return;Ei.copy(r).invert(),Di.copy(e.ray).applyMatrix4(Ei);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=n.index,l=n.attributes.position;if(c!==null){let n=Math.max(0,a.start),i=Math.min(c.count,a.start+a.count);for(let a=n,o=i;a<o;a++){let n=c.getX(a);ki.fromBufferAttribute(l,n),ji(ki,n,s,r,e,t,this)}}else{let n=Math.max(0,a.start),i=Math.min(l.count,a.start+a.count);for(let a=n,o=i;a<o;a++)ki.fromBufferAttribute(l,a),ji(ki,a,s,r,e,t,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function ji(e,t,n,r,i,a,o){let s=Di.distanceSqToPoint(e);if(s<n){let n=new H;Di.closestPointToPoint(e,n),n.applyMatrix4(r);let c=i.ray.origin.distanceTo(n);if(c<i.near||c>i.far)return;a.push({distance:c,distanceToRay:Math.sqrt(s),point:n,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var Mi=class extends zt{constructor(e=[],t=301,n,r,i,a,o,s,c,l){super(e,t,n,r,i,a,o,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Ni=class extends zt{constructor(e,t,n,r,i,a,o,s,c){super(e,t,n,r,i,a,o,s,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},Pi=class extends zt{constructor(e,t,n=C,r,i,a,o=f,s=f,c,l=ee,u=1){if(l!==1026&&l!==1027)throw Error(`THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);super({width:e,height:t,depth:u},r,i,a,o,s,l,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Ft(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Fi=class extends Pi{constructor(e,t=C,n=301,r,i,a=f,o=f,s,c=ee){let l={width:e,height:e,depth:1},u=[l,l,l,l,l,l];super(e,e,t,n,r,i,a,o,s,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Ii=class extends zt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Li=class e extends Cr{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a};let o=this;r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let s=[],c=[],l=[],u=[],d=0,f=0;p(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),p(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),p(`x`,`z`,`y`,1,1,e,n,t,r,a,2),p(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),p(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),p(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(s),this.setAttribute(`position`,new dr(c,3)),this.setAttribute(`normal`,new dr(l,3)),this.setAttribute(`uv`,new dr(u,2));function p(e,t,n,r,i,a,p,m,h,g,_){let v=a/h,y=p/g,b=a/2,x=p/2,S=m/2,C=h+1,w=g+1,T=0,E=0,D=new H;for(let a=0;a<w;a++){let o=a*y-x;for(let s=0;s<C;s++)D[e]=(s*v-b)*r,D[t]=o*i,D[n]=S,c.push(D.x,D.y,D.z),D[e]=0,D[t]=0,D[n]=m>0?1:-1,l.push(D.x,D.y,D.z),u.push(s/h),u.push(1-a/g),T+=1}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d+t+C*e,r=d+t+C*(e+1),i=d+(t+1)+C*(e+1),a=d+(t+1)+C*e;s.push(n,r,a),s.push(r,i,a),E+=6}o.addGroup(f,E,_),f+=E,d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},Ri=class e extends Cr{constructor(e=1,t=1,n=1,r=32,i=1,a=!1,o=0,s=Math.PI*2){super(),this.type=`CylinderGeometry`,this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:i,openEnded:a,thetaStart:o,thetaLength:s};let c=this;r=Math.floor(r),i=Math.floor(i);let l=[],u=[],d=[],f=[],p=0,m=[],h=n/2,g=0;_(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(l),this.setAttribute(`position`,new dr(u,3)),this.setAttribute(`normal`,new dr(d,3)),this.setAttribute(`uv`,new dr(f,2));function _(){let a=new H,_=new H,v=0,y=(t-e)/n;for(let c=0;c<=i;c++){let l=[],g=c/i,v=g*(t-e)+e;for(let e=0;e<=r;e++){let t=e/r,i=t*s+o,c=Math.sin(i),m=Math.cos(i);_.x=v*c,_.y=-g*n+h,_.z=v*m,u.push(_.x,_.y,_.z),a.set(c,y,m).normalize(),d.push(a.x,a.y,a.z),f.push(t,1-g),l.push(p++)}m.push(l)}for(let n=0;n<r;n++)for(let r=0;r<i;r++){let a=m[r][n],o=m[r+1][n],s=m[r+1][n+1],c=m[r][n+1];(e>0||r!==0)&&(l.push(a,o,c),v+=3),(t>0||r!==i-1)&&(l.push(o,s,c),v+=3)}c.addGroup(g,v,0),g+=v}function v(n){let i=p,a=new bt,m=new H,_=0,v=n===!0?e:t,y=n===!0?1:-1;for(let e=1;e<=r;e++)u.push(0,h*y,0),d.push(0,y,0),f.push(.5,.5),p++;let b=p;for(let e=0;e<=r;e++){let t=e/r*s+o,n=Math.cos(t),i=Math.sin(t);m.x=v*i,m.y=h*y,m.z=v*n,u.push(m.x,m.y,m.z),d.push(0,y,0),a.x=n*.5+.5,a.y=i*.5*y+.5,f.push(a.x,a.y),p++}for(let e=0;e<r;e++){let t=i+e,r=b+e;n===!0?l.push(r,r+1,t):l.push(r+1,r,t),_+=3}c.addGroup(g,_,n===!0?1:2),g+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},zi=class e extends Ri{constructor(e=1,t=1,n=32,r=1,i=!1,a=0,o=Math.PI*2){super(0,e,t,n,r,i,a,o),this.type=`ConeGeometry`,this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:i,thetaStart:a,thetaLength:o}}static fromJSON(t){return new e(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Bi=new H,Vi=new H,Hi=new H,Ui=new Un,Wi=class extends Cr{constructor(e=null,t=1){if(super(),this.type=`EdgesGeometry`,this.parameters={geometry:e,thresholdAngle:t},e!==null){let n=1e4,r=Math.cos(ut*t),i=e.getIndex(),a=e.getAttribute(`position`),o=i?i.count:a.count,s=[0,0,0],c=[`a`,`b`,`c`],l=[,,,],u=new Map,d=[];for(let e=0;e<o;e+=3){i?(s[0]=i.getX(e),s[1]=i.getX(e+1),s[2]=i.getX(e+2)):(s[0]=e,s[1]=e+1,s[2]=e+2);let{a:t,b:o,c:f}=Ui;if(t.fromBufferAttribute(a,s[0]),o.fromBufferAttribute(a,s[1]),f.fromBufferAttribute(a,s[2]),Ui.getNormal(Hi),l[0]=`${Math.round(t.x*n)},${Math.round(t.y*n)},${Math.round(t.z*n)}`,l[1]=`${Math.round(o.x*n)},${Math.round(o.y*n)},${Math.round(o.z*n)}`,l[2]=`${Math.round(f.x*n)},${Math.round(f.y*n)},${Math.round(f.z*n)}`,l[0]!==l[1]&&l[1]!==l[2]&&l[2]!==l[0])for(let e=0;e<3;e++){let t=(e+1)%3,n=l[e],i=l[t],a=Ui[c[e]],o=Ui[c[t]],f=`${n}_${i}`,p=`${i}_${n}`,m=u.get(p);m?(Hi.dot(m.normal)<=r&&(d.push(a.x,a.y,a.z),d.push(o.x,o.y,o.z)),u.set(p,null)):u.has(f)||u.set(f,{index0:s[e],index1:s[t],normal:Hi.clone()})}}for(let e of u.values())if(e){let{index0:t,index1:n}=e;Bi.fromBufferAttribute(a,t),Vi.fromBufferAttribute(a,n),d.push(Bi.x,Bi.y,Bi.z),d.push(Vi.x,Vi.y,Vi.z)}this.setAttribute(`position`,new dr(d,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}},Gi=class e extends Cr{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o),h.push(1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a),f.push(r,i,a)}this.setIndex(f),this.setAttribute(`position`,new dr(p,3)),this.setAttribute(`normal`,new dr(m,3)),this.setAttribute(`uv`,new dr(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}},Ki=class e extends Cr{constructor(e=1,t=32,n=16,r=0,i=Math.PI*2,a=0,o=Math.PI){super(),this.type=`SphereGeometry`,this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:i,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let s=Math.min(a+o,Math.PI),c=0,l=[],u=new H,d=new H,f=[],p=[],m=[],h=[];for(let f=0;f<=n;f++){let g=[],_=f/n,v=a+_*o,y=e*Math.cos(v),b=Math.sqrt(e*e-y*y),x=0;f===0&&a===0?x=.5/t:f===n&&s===Math.PI&&(x=-.5/t);for(let e=0;e<=t;e++){let n=e/t,a=r+n*i;u.x=-b*Math.cos(a),u.y=y,u.z=b*Math.sin(a),p.push(u.x,u.y,u.z),d.copy(u).normalize(),m.push(d.x,d.y,d.z),h.push(n+x,1-_),g.push(c++)}l.push(g)}for(let e=0;e<n;e++)for(let r=0;r<t;r++){let t=l[e][r+1],i=l[e][r],o=l[e+1][r],c=l[e+1][r+1];(e!==0||a>0)&&f.push(t,i,c),(e!==n-1||s<Math.PI)&&f.push(i,o,c)}this.setIndex(f),this.setAttribute(`position`,new dr(p,3)),this.setAttribute(`normal`,new dr(m,3)),this.setAttribute(`uv`,new dr(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}},qi=class e extends Cr{constructor(e=1,t=.4,n=12,r=48,i=Math.PI*2,a=0,o=Math.PI*2){super(),this.type=`TorusGeometry`,this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:i,thetaStart:a,thetaLength:o},n=Math.floor(n),r=Math.floor(r);let s=[],c=[],l=[],u=[],d=new H,f=new H,p=new H;for(let s=0;s<=n;s++){let m=a+s/n*o;for(let a=0;a<=r;a++){let o=a/r*i;f.x=(e+t*Math.cos(m))*Math.cos(o),f.y=(e+t*Math.cos(m))*Math.sin(o),f.z=t*Math.sin(m),c.push(f.x,f.y,f.z),d.x=e*Math.cos(o),d.y=e*Math.sin(o),p.subVectors(f,d).normalize(),l.push(p.x,p.y,p.z),u.push(a/r),u.push(s/n)}}for(let e=1;e<=n;e++)for(let t=1;t<=r;t++){let n=(r+1)*e+t-1,i=(r+1)*(e-1)+t-1,a=(r+1)*(e-1)+t,o=(r+1)*e+t;s.push(n,i,o),s.push(i,a,o)}this.setIndex(s),this.setAttribute(`position`,new dr(c,3)),this.setAttribute(`normal`,new dr(l,3)),this.setAttribute(`uv`,new dr(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}};function Ji(e){let t={};for(let n in e){t[n]={};for(let r in e[n]){let i=e[n][r];if(Xi(i))i.isRenderTargetTexture?(V(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),t[n][r]=null):t[n][r]=i.clone();else if(Array.isArray(i)){if(Xi(i[0])){let e=[];for(let t=0,n=i.length;t<n;t++)e[t]=i[t].clone();t[n][r]=e}else t[n][r]=i.slice()}else t[n][r]=i}}return t}function Yi(e){let t={};for(let n=0;n<e.length;n++){let r=Ji(e[n]);for(let e in r)t[e]=r[e]}return t}function Xi(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function Zi(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function Qi(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:kt.workingColorSpace}var $i={clone:Ji,merge:Yi},ea=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ta=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,na=class extends kr{constructor(e){super(),this.isShaderMaterial=!0,this.type=`ShaderMaterial`,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ea,this.fragmentShader=ta,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ji(e.uniforms),this.uniformsGroups=Zi(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:`t`,value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:`c`,value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:`v2`,value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:`v3`,value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:`v4`,value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:`m3`,value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:`m4`,value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let e in this.extensions)this.extensions[e]===!0&&(n[e]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case`t`:this.uniforms[n].value=t[r.value]||null;break;case`c`:this.uniforms[n].value=new U().setHex(r.value);break;case`v2`:this.uniforms[n].value=new bt().fromArray(r.value);break;case`v3`:this.uniforms[n].value=new H().fromArray(r.value);break;case`v4`:this.uniforms[n].value=new Bt().fromArray(r.value);break;case`m3`:this.uniforms[n].value=new wt().fromArray(r.value);break;case`m4`:this.uniforms[n].value=new Gt().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let t in e.extensions)this.extensions[t]=e.extensions[t];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},ra=class extends na{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type=`RawShaderMaterial`}},ia=class extends kr{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type=`MeshLambertMaterial`,this.color=new U(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new U(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new bt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new tn,this.combine=0,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},aa=class extends kr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type=`MeshDepthMaterial`,this.depthPacking=Ue,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},oa=class extends kr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type=`MeshDistanceMaterial`,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function sa(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}function ca(e){return e!==void 0&&e.inTangents!==void 0&&e.outTangents!==void 0}var la=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];validate_interval:{seek:{let a;linear_scan:{forward_scan:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break forward_scan;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break seek}a=t.length;break linear_scan}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break seek}a=n,n=0;break linear_scan}break validate_interval}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`THREE.Interpolant: Call to abstract method.`)}intervalChanged_(){}},ua=class extends la{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Be,endingEnd:Be}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],s=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case Ve:i=e,o=2*t-n;break;case He:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(s===void 0)switch(this.getSettings_().endingEnd){case Ve:a=e,s=2*n-t;break;case He:a=1,s=n+r[1]-r[0];break;default:a=e-1,s=t}let c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),m=p*p,h=m*p,g=-d*h+2*d*m-d*p,_=(1+d)*h+(-1.5-2*d)*m+(-.5+d)*p+1,v=(-1-f)*h+(1.5+f)*m+.5*p,y=f*h-f*m;for(let e=0;e!==o;++e)i[e]=g*a[l+e]+_*a[c+e]+v*a[s+e]+y*a[u+e];return i}},da=class extends la{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=(n-t)/(r-t),u=1-l;for(let e=0;e!==o;++e)i[e]=a[c+e]*u+a[s+e]*l;return i}},fa=class extends la{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},pa=class extends la{interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this.inTangents,u=this.outTangents;if(!l||!u){let e=(n-t)/(r-t),l=1-e;for(let t=0;t!==o;++t)i[t]=a[c+t]*l+a[s+t]*e;return i}let d=o*2,f=e-1;for(let p=0;p!==o;++p){let o=a[c+p],m=a[s+p],h=f*d+p*2,g=u[h],_=u[h+1],v=e*d+p*2,y=l[v],b=l[v+1],x=ga(n,t,g,y,r);i[p]=ma(x,o,_,b,m)}return i}};function ma(e,t,n,r,i){let a=1-e;return a*a*a*t+3*a*a*e*n+3*a*e*e*r+e*e*e*i}function ha(e,t,n,r,i){let a=1-e;return 3*a*a*(n-t)+6*a*e*(r-n)+3*e*e*(i-r)}function ga(e,t,n,r,i){let a=(e-t)/(i-t);for(let o=0;o<8;o++){let o=ma(a,t,n,r,i)-e;if(Math.abs(o)<1e-10)break;let s=ha(a,t,n,r,i);if(Math.abs(s)<1e-10)break;a=Math.max(0,Math.min(1,a-o/s))}return a}var _a=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=sa(t,this.TimeBufferType),this.values=sa(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:sa(e.times,Array),values:sa(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t),ca(e.settings)&&(n.settings={inTangents:sa(e.settings.inTangents,Array),outTangents:sa(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new fa(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new da(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new ua(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new pa(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Ie:t=this.InterpolantFactoryMethodDiscrete;break;case Le:t=this.InterpolantFactoryMethodLinear;break;case Re:t=this.InterpolantFactoryMethodSmooth;break;case ze:t=this.InterpolantFactoryMethodBezier}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0){if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t)}return V(`KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ie;case this.InterpolantFactoryMethodLinear:return Le;case this.InterpolantFactoryMethodSmooth:return Re;case this.InterpolantFactoryMethodBezier:return ze}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e;ca(this.settings)&&(va(this.settings.inTangents,e),va(this.settings.outTangents,e))}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e;ca(this.settings)&&(ya(this.settings.inTangents,e),ya(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(it(`KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&(it(`KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){it(`KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){it(`KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&Qe(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){it(`KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===Re,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,s=e[o];if(s!==e[o+1]&&(o!==1||s!==e[0])){if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,ca(this.settings)&&(r.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),r}};function va(e,t){for(let n=0,r=e.length;n!==r;n+=2)e[n]+=t}function ya(e,t){for(let n=0,r=e.length;n!==r;n+=2)e[n]*=t}_a.prototype.ValueTypeName=``,_a.prototype.TimeBufferType=Float32Array,_a.prototype.ValueBufferType=Float32Array,_a.prototype.DefaultInterpolation=Le;var ba=class extends _a{constructor(e,t,n){super(e,t,n)}};ba.prototype.ValueTypeName=`bool`,ba.prototype.ValueBufferType=Array,ba.prototype.DefaultInterpolation=Ie,ba.prototype.InterpolantFactoryMethodLinear=void 0,ba.prototype.InterpolantFactoryMethodSmooth=void 0;var xa=class extends _a{constructor(e,t,n,r){super(e,t,n,r)}};xa.prototype.ValueTypeName=`color`;var Sa=class extends _a{constructor(e,t,n,r){super(e,t,n,r)}};Sa.prototype.ValueTypeName=`number`;var Ca=class extends la{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=(n-t)/(r-t),c=e*o;for(let e=c+o;c!==e;c+=4)xt.slerpFlat(i,0,a,c-o,a,c,s);return i}},wa=class extends _a{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new Ca(this.times,this.values,this.getValueSize(),e)}};wa.prototype.ValueTypeName=`quaternion`,wa.prototype.InterpolantFactoryMethodSmooth=void 0;var Ta=class extends _a{constructor(e,t,n){super(e,t,n)}};Ta.prototype.ValueTypeName=`string`,Ta.prototype.ValueBufferType=Array,Ta.prototype.DefaultInterpolation=Ie,Ta.prototype.InterpolantFactoryMethodLinear=void 0,Ta.prototype.InterpolantFactoryMethodSmooth=void 0;var Ea=class extends _a{constructor(e,t,n,r){super(e,t,n,r)}};Ea.prototype.ValueTypeName=`vector`;var Da=class extends yn{static registerNode(e){this.prototype._lightNode=e}constructor(e,t=1){super(),this.isLight=!0,this.type=`Light`,this.color=new U(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Oa=class extends Da{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type=`HemisphereLight`,this.position.copy(yn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new U(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},ka=new Gt,Aa=new H,ja=new H,Ma=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new bt(512,512),this.mapType=v,this.map=null,this.mapPass=null,this.matrix=new Gt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new li,this._frameExtents=new bt(1,1),this._viewportCount=1,this._viewports=[new Bt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;Aa.setFromMatrixPosition(e.matrixWorld),t.position.copy(Aa),ja.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(ja),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,r){ka.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(ka,e.coordinateSystem,e.reversedDepth);let i=this._frameExtents,a=r?r.z/i.x:1,o=r?r.w/i.y:1,s=r?r.x/i.x:0,c=r?r.y/i.y:0;e.coordinateSystem===2001||e.reversedDepth?t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(ka)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.mapType=e.mapType,this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.mapType=this.mapType,e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Na=new H,Pa=new xt,Fa=new H,Ia=class extends yn{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new Gt,this.projectionMatrix=new Gt,this.projectionMatrixInverse=new Gt,this.coordinateSystem=Xe,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Na,Pa,Fa),Fa.x===1&&Fa.y===1&&Fa.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Na,Pa,Fa.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Na,Pa,Fa),Fa.x===1&&Fa.y===1&&Fa.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Na,Pa,Fa.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},La=new H,Ra=new bt,za=new bt,Ba=class extends Ia{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=dt*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(ut*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return dt*2*Math.atan(Math.tan(ut*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){La.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(La.x,La.y).multiplyScalar(-e/La.z),La.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(La.x,La.y).multiplyScalar(-e/La.z)}getViewSize(e,t){return this.getViewBounds(e,Ra,za),t.subVectors(za,Ra)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(ut*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Va=class extends Ma{constructor(){super(new Ba(90,1,.5,500)),this.isPointLightShadow=!0}},Ha=class extends Da{constructor(e,t,n=0,r=2){super(e,t),this.isPointLight=!0,this.type=`PointLight`,this.distance=n,this.decay=r,this.shadow=new Va}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},Ua=class extends Ia{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t;if(this.view!==null&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=e*this.view.offsetX,a=i+e*this.view.width,o-=t*this.view.offsetY,s=o-t*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Wa=class extends Ma{constructor(){super(new Ua(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Ga=class extends Da{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type=`DirectionalLight`,this.position.copy(yn.DEFAULT_UP),this.updateMatrix(),this.target=new yn,this.shadow=new Wa}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},Ka=-90,qa=1,Ja=class extends yn{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new Ba(Ka,qa,e,t);r.layers=this.layers,this.add(r);let i=new Ba(Ka,qa,e,t);i.layers=this.layers,this.add(i);let a=new Ba(Ka,qa,e,t);a.layers=this.layers,this.add(a);let o=new Ba(Ka,qa,e,t);o.layers=this.layers,this.add(o);let s=new Ba(Ka,qa,e,t);s.layers=this.layers,this.add(s);let c=new Ba(Ka,qa,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,i,a,o,s]=t;for(let e of t)this.remove(e);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[i,a,o,s,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let h=!1;h=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(n,0,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,i),e.setRenderTarget(n,1,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,4,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.mipmapsAutoUpdate=m,e.setRenderTarget(n,5,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},Ya=class extends Ba{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e,this.perCameraFrustumCulled=!1}},Xa=`\\[\\]\\.:\\/`,Za=RegExp(`[\\[\\]\\.:\\/]`,`g`),Qa=`[^\\[\\]\\.:\\/]`,$a=`[^`+Xa.replace(`\\.`,``)+`]`,eo=`((?:WC+[\\/:])*)`.replace(`WC`,Qa),to=`(WCOD+)?`.replace(`WCOD`,$a),no=`(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`,Qa),ro=`\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`,Qa),io=RegExp(`^`+eo+to+no+ro+`$`),ao=[`material`,`materials`,`bones`,`map`],oo=class{constructor(e,t,n){let r=n||so.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},so=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace(Za,``)}static parseTrackName(e){let t=io.exec(e);if(t===null)throw Error(`THREE.PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);ao.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`THREE.PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){V(`PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){it(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){it(`PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){it(`PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){it(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){it(`PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){it(`PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){it(`PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){let e=n.nodeName;it(`PropertyBinding: Trying to update property for track: `+e+`.`+i+` but it wasn't found.`,t);return}let s=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?s=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(s=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){it(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){it(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};so.Composite=oo,so.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},so.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},so.prototype.GetterByBindingType=[so.prototype._getValue_direct,so.prototype._getValue_array,so.prototype._getValue_arrayElement,so.prototype._getValue_toArray],so.prototype.SetterByBindingTypeAndVersioning=[[so.prototype._setValue_direct,so.prototype._setValue_direct_setNeedsUpdate,so.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[so.prototype._setValue_array,so.prototype._setValue_array_setNeedsUpdate,so.prototype._setValue_array_setMatrixWorldNeedsUpdate],[so.prototype._setValue_arrayElement,so.prototype._setValue_arrayElement_setNeedsUpdate,so.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[so.prototype._setValue_fromArray,so.prototype._setValue_fromArray_setNeedsUpdate,so.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var co=new Gt,lo=class{constructor(e,t,n=0,r=1/0){this.ray=new Pr(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new nn,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):it(`Raycaster: Unsupported camera type: `+t.type)}setFromXRController(e){return co.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(co),this}intersectObject(e,t=!0,n=[]){return fo(e,this,n,t),n.sort(uo),n}intersectObjects(e,t=!0,n=[]){for(let r=0,i=e.length;r<i;r++)fo(e[r],this,n,t);return n.sort(uo),n}};function uo(e,t){return e.distance-t.distance}function fo(e,t,n,r){let i=!0;if(e.layers.test(t.layers)&&e.raycast(t,n)===!1&&(i=!1),i===!0&&r===!0){let r=e.children;for(let e=0,i=r.length;e<i;e++)fo(r[e],t,n,!0)}}var po=class{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1,V(`Clock: This module has been deprecated. Please use THREE.Timer instead.`)}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let t=performance.now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}};a=class{constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let i=this.elements;return i[0]=e,i[2]=t,i[1]=n,i[3]=r,this}},a.prototype.isMatrix2=!0;function mo(e,t,n,r){let i=ho(r);switch(n){case j:return e*t;case te:return e*t/i.components*i.byteLength;case F:return e*t/i.components*i.byteLength;case ne:return e*t*2/i.components*i.byteLength;case re:return e*t*2/i.components*i.byteLength;case M:return e*t*3/i.components*i.byteLength;case N:return e*t*4/i.components*i.byteLength;case ie:return e*t*4/i.components*i.byteLength;case ae:case oe:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case se:case I:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case ce:case ue:return Math.max(e,16)*Math.max(t,8)/4;case L:case le:return Math.max(e,8)*Math.max(t,8)/2;case de:case fe:case me:case he:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case pe:case ge:case _e:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case ve:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case R:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case ye:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case be:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case xe:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case Se:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case Ce:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case we:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case Te:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case Ee:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case De:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case Oe:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case ke:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case Ae:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case z:case je:case Me:return Math.ceil(e/4)*Math.ceil(t/4)*16;case Ne:case B:return Math.ceil(e/4)*Math.ceil(t/4)*8;case Pe:case Fe:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function ho(e){switch(e){case v:case y:return{byteLength:1,components:1};case x:case b:case T:return{byteLength:2,components:1};case E:case D:return{byteLength:2,components:4};case C:case S:case w:return{byteLength:4,components:1};case k:case A:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`187`}})),typeof window<`u`&&(window.__THREE__?V(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`187`);function go(){let e=null,t=!1,n=null,r=null;function i(t,a){r=e.requestAnimationFrame(i),n(t,a)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function _o(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var vo={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:`gl_FragColor = linearToOutputTexel( gl_FragColor );`,colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * worldNormal, ENVMAP_MAX_LOD );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * reflectVec, roughnessToMip( roughness ) );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureLod( envMap, envMapRotation * retroVec, roughnessToMip( roughness ) );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_PMREM
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.045 );
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef USE_DIFFUSE_ROUGHNESS
	float diffuseRoughnessFactor = diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		diffuseRoughnessFactor *= texture2D( diffuseRoughnessMap, vDiffuseRoughnessMapUv ).r;
	#endif
	material.diffuseRoughness = saturate( diffuseRoughnessFactor );
#endif
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.045 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float diffuseRoughness;
	#endif
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
#ifdef USE_DIFFUSE_ROUGHNESS
	const float EON_EPSILON = 1e-7;
	float FON_DirectionalAlbedo( const in float mu, const in float roughness, const in float A ) {
		float muComp = 1.0 - mu;
		float gOverPi = muComp * ( 0.0571085289 + muComp * ( 0.491881867 + muComp * ( - 0.332181442 + muComp * 0.0714429953 ) ) );
		return A * ( 1.0 + roughness * gOverPi );
	}
	vec3 BRDF_EON( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 diffuseColor, const in float roughness ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return BRDF_Lambert( rho );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float s = dot( lightDir, viewDir ) - dotNL * dotNV;
		float sOverT = ( s > 0.0 ) ? s / max( max( dotNL, dotNV ), EON_EPSILON ) : s;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		vec3 singleScatter = rho * RECIPROCAL_PI * A * ( 1.0 + roughness * sOverT );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		float albedoV = FON_DirectionalAlbedo( dotNV, roughness, A );
		float albedoL = FON_DirectionalAlbedo( dotNL, roughness, A );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		vec3 multiScatter = rhoMultiScatter * RECIPROCAL_PI
			* max( EON_EPSILON, 1.0 - albedoV )
			* max( EON_EPSILON, 1.0 - albedoL )
			/ max( EON_EPSILON, 1.0 - averageAlbedo );
		return singleScatter + multiScatter;
	}
	vec3 EON_DirectionalAlbedo( const in vec3 diffuseColor, const in float roughness, const in float dotNV ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return rho;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		float directionalAlbedo = FON_DirectionalAlbedo( dotNV, roughness, A );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		return rho * directionalAlbedo + rhoMultiScatter * ( 1.0 - directionalAlbedo );
	}
#endif
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = max( material.clearcoatRoughness, 0.045 );
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = max( material.roughness, 0.045 );
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float alphaT = max( material.alphaT, alpha );
		float V = V_GGX_SmithCorrelated_Anisotropic( alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		vec3 diffuseBRDF = BRDF_EON( directLight.direction, geometryViewDir, geometryNormal, material.diffuseColor, material.diffuseRoughness ) * ( 1.0 - material.metalness );
	#else
		vec3 diffuseBRDF = BRDF_Lambert( material.diffuseContribution );
	#endif
	reflectedLight.directDiffuse += irradiance * diffuseBRDF * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuseAlbedo = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness );
		vec3 diffuse = irradiance * RECIPROCAL_PI * diffuseAlbedo * ( 1.0 - singleScattering - multiScattering );
	#else
		vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#endif
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuse = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness ) * ( 1.0 - totalScatteringDielectric );
	#else
		vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	#endif
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_LIGHT_PROBE_GRIDS > 0
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		int probeGrid = - 1;
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( isInsideLightProbeGrid( probeWorldPos, probeWorldNormal, probesMin[ i ], probesMax[ i ], probesResolution[ i ] ) ) probeGrid = UNROLLED_LOOP_INDEX;
		}
		#pragma unroll_loop_end
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( probeGrid == UNROLLED_LOOP_INDEX ) irradiance += getLightProbeGridIrradiance( probesSH[ i ], probesMin[ i ], probesMax[ i ], probesResolution[ i ], probeWorldPos, probeWorldNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_PMREM )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lightprobes_pars_fragment:`#if NUM_LIGHT_PROBE_GRIDS > 0
uniform highp sampler3D probesSH[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMin[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMax[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesResolution[ NUM_LIGHT_PROBE_GRIDS ];
bool isInsideLightProbeGrid( vec3 worldPos, vec3 worldNormal, vec3 probesMin, vec3 probesMax, vec3 probesResolution ) {
	vec3 spacing = ( probesMax - probesMin ) / probesResolution;
	vec3 samplePos = worldPos + worldNormal * spacing * 0.5;
	vec3 margin = spacing * 0.01;
	return all( greaterThanEqual( samplePos, probesMin - margin ) ) && all( lessThanEqual( samplePos, probesMax + margin ) );
}
vec3 getLightProbeGridIrradiance( highp sampler3D probesSH, vec3 probesMin, vec3 probesMax, vec3 probesResolution, vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 probeSpacing = gridRange / res;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.5 / res, 1.0 - 0.5 / res );
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	#if defined( USE_COLOR_ALPHA )
		vColor *= morphTargetBaseInfluence;
	#elif defined( USE_COLOR )
		vColor.rgb *= morphTargetBaseInfluence;
	#endif
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor.rgb += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				vec2 radius = shadowRadius * texelSize;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float lightDistance = length( lightToPosition );
			float depthRange = shadowCameraFar - shadowCameraNear;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float depthA = - shadowCameraNear / depthRange - shadowBias;
				float depthB = shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#else
				float depthA = shadowCameraFar / depthRange + shadowBias;
				float depthB = - shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			shadow = 0.0;
			for ( int i = 0; i < 5; i ++ ) {
				vec2 offset = vogelDiskSample( i, 5, phi );
				vec3 direction = bd3D + ( tangent * offset.x + bitangent * offset.y ) * texelSize;
				vec3 absDirection = abs( direction );
				float dp = depthA + depthB / max( max( absDirection.x, absDirection.y ), absDirection.z );
				shadow += texture( shadowMap, vec4( direction, dp ) );
			}
			shadow *= 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	uniform mat3 diffuseRoughnessMapTransform;
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	vDiffuseRoughnessMapUv = ( diffuseRoughnessMapTransform * vec3( DIFFUSE_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <envmap_common_pars_fragment>
void main() {
	#ifdef ENVMAP_TYPE_PMREM
		vec4 texColor = textureLod( envMap, backgroundRotation * vWorldDirection, roughnessToMip( backgroundBlurriness ) );
	#else
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distance_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distance_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DIFFUSE_ROUGHNESS
	uniform float diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		uniform sampler2D diffuseRoughnessMap;
	#endif
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},W={common:{diffuse:{value:new U(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new wt},alphaMap:{value:null},alphaMapTransform:{value:new wt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new wt}},envmap:{envMap:{value:null},envMapRotation:{value:new wt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new wt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new wt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new wt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new wt},normalScale:{value:new bt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new wt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new wt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new wt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new wt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new U(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new U(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new wt},alphaTest:{value:0},uvTransform:{value:new wt}},sprite:{diffuse:{value:new U(16777215)},opacity:{value:1},center:{value:new bt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new wt},alphaMap:{value:null},alphaMapTransform:{value:new wt},alphaTest:{value:0}}},yo={basic:{uniforms:Yi([W.common,W.specularmap,W.envmap,W.aomap,W.lightmap,W.fog]),vertexShader:vo.meshbasic_vert,fragmentShader:vo.meshbasic_frag},lambert:{uniforms:Yi([W.common,W.specularmap,W.envmap,W.aomap,W.lightmap,W.emissivemap,W.bumpmap,W.normalmap,W.displacementmap,W.fog,W.lights,{emissive:{value:new U(0)},envMapIntensity:{value:1}}]),vertexShader:vo.meshlambert_vert,fragmentShader:vo.meshlambert_frag},phong:{uniforms:Yi([W.common,W.specularmap,W.envmap,W.aomap,W.lightmap,W.emissivemap,W.bumpmap,W.normalmap,W.displacementmap,W.fog,W.lights,{emissive:{value:new U(0)},specular:{value:new U(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:vo.meshphong_vert,fragmentShader:vo.meshphong_frag},standard:{uniforms:Yi([W.common,W.envmap,W.aomap,W.lightmap,W.emissivemap,W.bumpmap,W.normalmap,W.displacementmap,W.roughnessmap,W.metalnessmap,W.fog,W.lights,{emissive:{value:new U(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:vo.meshphysical_vert,fragmentShader:vo.meshphysical_frag},toon:{uniforms:Yi([W.common,W.aomap,W.lightmap,W.emissivemap,W.bumpmap,W.normalmap,W.displacementmap,W.gradientmap,W.fog,W.lights,{emissive:{value:new U(0)}}]),vertexShader:vo.meshtoon_vert,fragmentShader:vo.meshtoon_frag},matcap:{uniforms:Yi([W.common,W.bumpmap,W.normalmap,W.displacementmap,W.fog,{matcap:{value:null}}]),vertexShader:vo.meshmatcap_vert,fragmentShader:vo.meshmatcap_frag},points:{uniforms:Yi([W.points,W.fog]),vertexShader:vo.points_vert,fragmentShader:vo.points_frag},dashed:{uniforms:Yi([W.common,W.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:vo.linedashed_vert,fragmentShader:vo.linedashed_frag},depth:{uniforms:Yi([W.common,W.displacementmap]),vertexShader:vo.depth_vert,fragmentShader:vo.depth_frag},normal:{uniforms:Yi([W.common,W.bumpmap,W.normalmap,W.displacementmap,{opacity:{value:1}}]),vertexShader:vo.meshnormal_vert,fragmentShader:vo.meshnormal_frag},sprite:{uniforms:Yi([W.sprite,W.fog]),vertexShader:vo.sprite_vert,fragmentShader:vo.sprite_frag},background:{uniforms:{uvTransform:{value:new wt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:vo.background_vert,fragmentShader:vo.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new wt}},vertexShader:vo.backgroundCube_vert,fragmentShader:vo.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:vo.cube_vert,fragmentShader:vo.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:vo.equirect_vert,fragmentShader:vo.equirect_frag},distance:{uniforms:Yi([W.common,W.displacementmap,{referencePosition:{value:new H},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:vo.distance_vert,fragmentShader:vo.distance_frag},shadow:{uniforms:Yi([W.lights,W.fog,{color:{value:new U(0)},opacity:{value:1}}]),vertexShader:vo.shadow_vert,fragmentShader:vo.shadow_frag}};yo.physical={uniforms:Yi([yo.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new wt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new wt},clearcoatNormalScale:{value:new bt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new wt},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new wt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new wt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new wt},sheen:{value:0},sheenColor:{value:new U(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new wt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new wt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new wt},transmissionSamplerSize:{value:new bt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new wt},attenuationDistance:{value:0},attenuationColor:{value:new U(0)},specularColor:{value:new U(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new wt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new wt},anisotropyVector:{value:new bt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new wt}}]),vertexShader:vo.meshphysical_vert,fragmentShader:vo.meshphysical_frag};var bo={r:0,b:0,g:0},xo=new Gt,So=new wt;So.set(-1,0,0,0,1,0,0,0,1);function Co(e,t,n,r,i,a){let o=new U(0),s=i===!0?0:1,c,l,u=null,d=0,f=null;function p(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function m(t){let r=!1,i=p(t);i===null?g(o,s):i&&i.isColor&&(g(i,1),r=!0);let c=e.xr.getEnvironmentBlendMode();c===`additive`?n.buffers.color.setClear(0,0,0,1,a):c===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function h(t,n){let i=p(n);i&&i.isCubeTexture?(l===void 0&&(l=new qr(new Li(1,1,1),new na({name:`BackgroundCubeMaterial`,uniforms:Ji(yo.backgroundCube.uniforms),vertexShader:yo.backgroundCube.vertexShader,fragmentShader:yo.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),l.geometry.deleteAttribute(`uv`),l.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(l)),l.material.uniforms.envMap.value=i,l.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(xo.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(So),l.material.toneMapped=kt.getTransfer(i.colorSpace)!==qe,(u!==i||d!==i.version||f!==e.toneMapping)&&(l.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null)):i&&i.isTexture&&(c===void 0&&(c=new qr(new Gi(2,2),new na({name:`BackgroundMaterial`,uniforms:Ji(yo.background.uniforms),vertexShader:yo.background.vertexShader,fragmentShader:yo.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute(`normal`),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=i,c.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,c.material.toneMapped=kt.getTransfer(i.colorSpace)!==qe,i.matrixAutoUpdate===!0&&i.updateMatrix(),c.material.uniforms.uvTransform.value.copy(i.matrix),(u!==i||d!==i.version||f!==e.toneMapping)&&(c.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),c.layers.enableAll(),t.unshift(c,c.geometry,c.material,0,0,null))}function g(t,r){t.getRGB(bo,Qi(e)),n.buffers.color.setClear(bo.r,bo.g,bo.b,r,a)}function _(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(e,t=1){o.set(e),s=t,g(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(e){s=e,g(o,s)},render:m,addToRenderList:h,dispose:_}}function wo(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.isInterleavedBuffer===!0?t.stride:t.itemSize,p=s.offset;if(t.isInstancedInterleavedBuffer||t.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function To(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function Eo(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&n!==1015&&!i&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE))}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(V(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`),f=n.logarithmicDepthBuffer===!0&&d===!1;n.reversedDepthBuffer===!0&&d===!1&&V(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`),n.logarithmicDepthBuffer===!0&&d===!0&&V(`WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.`);let p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=e.getParameter(e.MAX_SAMPLES),S=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:f,reversedDepthBuffer:d,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,maxSamples:x,samples:S}}function Do(e){let t=this,n=null,r=0,i=!1,a=!1,o=new Dr,s=new wt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var Oo=class extends Ht{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Mi(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Li(5,5,5),i=new na({name:`CubemapFromEquirect`,uniforms:Ji(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new qr(r,i),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=h),new Ja(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}},ko=256,Ao=3,jo=20,Mo=256,No=16,Po=3,Fo=new H,Io=new U,Lo=class e{constructor(e){this._renderer=e,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new Ja(1,10,null),this._boxMesh=new qr(new Li(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=Fo}=i,s=this._renderer;this._setSize(a);let c=this._allocateTarget(),l=this._getSourceTarget(!0);t>0&&(l.texture.mipmapsAutoUpdate=!1);let u=s.autoClear,d=s.autoClearColor,f=s.autoClearDepth,p=s.autoClearStencil,m=e.background;s.autoClear=!0,s.autoClearColor=!0,s.autoClearDepth=!0,s.autoClearStencil=!0,m===null&&(e.background=s.getClearColor(Io));let h=new Ja(n,r,l);return h.position.copy(o),h.update(s,e),s.autoClear=u,s.autoClearColor=d,s.autoClearDepth=f,s.autoClearStencil=p,e.background=m,t>0&&(l.texture.mipmapsAutoUpdate=!0,this._blur(c,t)),this._applyPMREM(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Wo(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Uo(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(e,t){return t>0?1-Math.sqrt(1-e/t):0}_setSize(e){this._cubeSize=Math.max(ko,gt(e))}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?ko:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4);let n=t||this._allocateTarget();return this._textureToCubemap(e),this._applyPMREM(n),n}_allocateTarget(){let e=this._cubeSize,t=Ro(e,!1,!1),n=Math.log2(e)-Ao;for(let r=0;r<=n;r++)t.texture.mipmaps.push({width:e>>r,height:e>>r});return t.texture.name=`PMREM`,t.texture.isPMREMTexture=!0,t}_getSourceTarget(e=!1){let t=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==t||e&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=Ro(t,!0,e)),this._sourceTarget}_compileMaterial(e){this._boxMesh.material=e,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(e,t,n){let r=this._boxMesh,i=this._cubeCamera;r.material=n,i.renderTarget=e,i.activeMipmapLevel=t;let a=e.width>>t;e.viewport.set(0,0,a,a),i.update(this._renderer,r),e.viewport.set(0,0,e.width,e.height)}_textureToCubemap(e){let t;e.mapping===301||e.mapping===302?(this._cubemapMaterial===null&&(this._cubemapMaterial=Wo()),t=this._cubemapMaterial,t.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=Uo()),t=this._equirectMaterial),t.uniforms.envMap.value=e,this._renderCube(this._getSourceTarget(),0,t)}_applyPMREM(t){this._ggxMaterial===null&&(this._ggxMaterial=Bo(),this._integrationMaterial=Vo());let n=this._cubeSize,r=t.texture.mipmaps.length-1,i=this._ggxMaterial.uniforms;i.envMap.value=this._sourceTarget.texture;let a=this._integrationMaterial.uniforms;a.envMap.value=this._sourceTarget.texture,a.sourceLod.value=Math.log2(n/No);for(let o=0;o<=r;o++){let s=e.lodToRoughness(o,r);if(o>r-Po)a.roughness.value=s,this._renderCube(t,o,this._integrationMaterial);else{let e=s>0?Math.log2(n)+.5*Math.log2(6/(Mo*s**4))+.5:0;i.roughness.value=s,i.lodBias.value=e,this._renderCube(t,o,this._ggxMaterial)}}}_blur(e,t){this._blurMaterial===null&&(this._blurMaterial=Ho());let n=this._blurMaterial,r=n.uniforms,i=this._sourceTarget;r.sigma.value=Math.min(t,Math.PI)/Math.SQRT2,r.envMap.value=i.texture,this._renderCube(e,0,n),r.envMap.value=e.texture,this._renderCube(i,0,n)}};function Ro(e,t,n){return new Oo(e,{minFilter:_,generateMipmaps:t,type:T,colorSpace:Ge,depthBuffer:n})}function zo(e,t,n){return new na({name:e,uniforms:t,vertexShader:vo.cube_vert,fragmentShader:n,side:1,blending:0,depthTest:!1,depthWrite:!1})}function Bo(){return zo(`PMREMGGXConvolution`,{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${Mo}u

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float lodBias;

		#include <common>

		// Van der Corput radical inverse
		float radicalInverse_VdC( uint bits ) {

			bits = ( bits << 16u ) | ( bits >> 16u );
			bits = ( ( bits & 0x55555555u ) << 1u ) | ( ( bits & 0xAAAAAAAAu ) >> 1u );
			bits = ( ( bits & 0x33333333u ) << 2u ) | ( ( bits & 0xCCCCCCCCu ) >> 2u );
			bits = ( ( bits & 0x0F0F0F0Fu ) << 4u ) | ( ( bits & 0xF0F0F0F0u ) >> 4u );
			bits = ( ( bits & 0x00FF00FFu ) << 8u ) | ( ( bits & 0xFF00FF00u ) >> 8u );
			return float( bits ) * 2.3283064365386963e-10; // / 0x100000000

		}

		// Hammersley sequence
		vec2 hammersley( uint i, uint N ) {

			return vec2( float( i ) / float( N ), radicalInverse_VdC( i ) );

		}

		void main() {

			vec3 N = normalize( vWorldDirection );

			// For very low roughness, just sample the environment directly
			if ( roughness < 0.001 ) {

				gl_FragColor = vec4( textureLod( envMap, N, 0.0 ).rgb, 1.0 );
				return;

			}

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			// Tangent space basis for VNDF sampling
			vec3 up = abs( N.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, N ) );
			vec3 bitangent = cross( N, tangent );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			for ( uint i = 0u; i < GGX_SAMPLES; i ++ ) {

				vec2 Xi = hammersley( i, GGX_SAMPLES );

				// With V = N, sample the reflected direction directly.
				float invQ = 1.0 / ( 1.0 - Xi.x + alpha2 * Xi.x );
				float NdotL = ( 1.0 - Xi.x - alpha2 * Xi.x ) * invQ;

				if ( NdotL > 0.0 ) {

					float phi = 2.0 * PI * Xi.y;
					float sinTheta = 2.0 * alpha * sqrt( Xi.x * ( 1.0 - Xi.x ) ) * invQ;
					vec3 L = N * NdotL + ( tangent * cos( phi ) + bitangent * sin( phi ) ) * sinTheta;

					// Match the source mip to the sample's solid angle. The terms
					// independent of the sample are precomputed in lodBias.
					float d = alpha2 * invQ;
					float lod = max( log2( d ) + lodBias, 0.0 );

					// Weight by NdotL for the split-sum approximation
					prefilteredColor += textureLod( envMap, L, lod ).rgb * NdotL;
					totalWeight += NdotL;

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function Vo(){return zo(`PMREMGGXIntegration`,{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:No}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float sourceLod;
		uniform int sourceSize;

		void main() {

			vec3 N = normalize( vWorldDirection );

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			float texelSize = 2.0 / float( sourceSize );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			// Pair opposite texels: only the one in N's hemisphere contributes.
			for ( int face = 0; face < 3; face ++ ) {

				for ( int y = 0; y < sourceSize; y ++ ) {

					for ( int x = 0; x < sourceSize; x ++ ) {

						vec2 uv = ( vec2( x, y ) + 0.5 ) * texelSize - 1.0;
						vec3 texelDirection = face == 0 ? vec3( 1.0, uv ) : ( face == 1 ? vec3( uv.x, 1.0, uv.y ) : vec3( uv, 1.0 ) );

						float invDistance = inversesqrt( 1.0 + dot( uv, uv ) );
						float NdotL = dot( N, texelDirection );
						texelDirection *= NdotL < 0.0 ? - 1.0 : 1.0;
						NdotL = abs( NdotL ) * invDistance;

						// With V = N, NdotH squared is ( 1 + NdotL ) / 2. Common factors
						// in the GGX distribution and texel solid angle cancel when normalized.
						float d = 1.0 + alpha2 + ( alpha2 - 1.0 ) * NdotL;
						float weight = NdotL * invDistance * invDistance * invDistance / ( d * d );

						prefilteredColor += textureLod( envMap, texelDirection, sourceLod ).rgb * weight;
						totalWeight += weight;

					}

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function Ho(){return zo(`PMREMSphericalGaussianBlur`,{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${jo}
		#define GOLDEN_ANGLE 2.39996322973

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float sigma;

		#include <common>

		void main() {

			vec3 outputDirection = normalize( vWorldDirection );

			vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, outputDirection ) );
			vec3 bitangent = cross( outputDirection, tangent );

			// Truncate the kernel at three standard deviations or at the antipode.
			float thetaMax = min( 3.0 * sigma, PI );
			float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

			vec3 accumColor = vec3( 0.0 );
			float accumWeight = 0.0;

			for ( int i = 0; i < SAMPLES; i ++ ) {

				// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
				float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
				float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
				float phi = float( i ) * GOLDEN_ANGLE;

				vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
				vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

				// Correct the planar sample density to solid angle.
				float weight = sin( theta ) / theta;

				accumColor += weight * textureLod( envMap, sampleDirection, 0.0 ).rgb;
				accumWeight += weight;

			}

			gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

		}
	`)}function Uo(){return zo(`PMREMEquirectangularToCubemap`,{envMap:{value:null}},`

		varying vec3 vWorldDirection;

		uniform sampler2D envMap;

		#include <common>

		void main() {

			// Average four subpixel samples to preserve small, bright features.
			vec3 direction = normalize( vWorldDirection );
			vec3 dx = dFdx( direction ) * 0.25;
			vec3 dy = dFdy( direction ) * 0.25;

			vec3 color = textureLod( envMap, equirectUv( normalize( direction - dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction - dx + dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx + dy ) ), 0.0 ).rgb;
			gl_FragColor = vec4( color * 0.25, 1.0 );

		}
	`)}function Wo(){return zo(`PMREMCubemapToCubemap`,{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function Go(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304){if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}{let r=n.image;if(r&&r.height>0){let i=new Oo(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}return null}}}return n}function o(t){if(t&&t.isTexture&&t.isPMREMTexture!==!0){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new Lo(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new Lo(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function Ko(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&at(`WebGLRenderer: `+e+` extension not supported.`),t}}}function qo(e,t,n,r){let i={},a=new WeakMap,o=new FinalizationRegistry(e=>delete i[e]);function s(e){c(e.target)}function c(e){e.index!==null&&t.remove(e.index);for(let n in e.attributes)t.remove(e.attributes[n]);e.removeEventListener(`dispose`,s),delete i[e.id],o.unregister(e);let c=a.get(e);c&&(t.remove(c),a.delete(e)),r.releaseStatesOfGeometry(e),e.isInstancedBufferGeometry===!0&&delete e._maxInstanceCount,n.memory.geometries--}function l(e,t){return i[t.id]===void 0&&(t.addEventListener(`dispose`,s),i[t.id]=new WeakRef(t),o.register(t,t.id,t),n.memory.geometries++),t}function u(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function d(e){let n=e.index,r=e.attributes.position,i=0;if(r===void 0)return;let o=n===null?r.array.length/3-1:n.array.length,s=new(r.count>=65535?ur:lr)(Math.ceil(o/3)*6,1),c=s.array;if(n!==null){let e=n.array;i=n.version;for(let t=0,n=0;t<o;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];c[n++]=r,c[n++]=i,c[n++]=i,c[n++]=a,c[n++]=a,c[n++]=r}}else{i=r.version;for(let e=0,t=0;e<o;e+=3){let n=e+0,r=e+1,i=e+2;c[t++]=n,c[t++]=r,c[t++]=r,c[t++]=i,c[t++]=i,c[t++]=n}}s.version=i;let l=a.get(e);l&&t.remove(l),a.set(e,s)}function f(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&d(e)}else d(e);return a.get(e)}function p(){for(let e in i){let t=i[e].deref();t!==void 0&&c(t)}}return{get:l,update:u,getWireframeAttribute:f,dispose:p}}function Jo(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function Yo(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:it(`WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function Xo(e,t,n){let r=new WeakMap,i=new Bt;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let h=new Float32Array(p*m*4*u),g=new Ut(h,p,m,u);g.type=w,g.needsUpdate=!0;let _=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*_;e===!0&&(i.fromBufferAttribute(r,t),h[d+s+0]=i.x,h[d+s+1]=i.y,h[d+s+2]=i.z,h[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),h[d+s+4]=i.x,h[d+s+5]=i.y,h[d+s+6]=i.z,h[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),h[d+s+8]=i.x,h[d+s+9]=i.y,h[d+s+10]=i.z,h[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:g,size:new bt(p,m)},r.set(o,d);function v(){g.dispose(),r.delete(o),o.removeEventListener(`dispose`,v)}o.addEventListener(`dispose`,v)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function Zo(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var Qo={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function $o(e,t,n,r,i,a){let o=new Ht(t,n,{type:e,depthBuffer:i,stencilBuffer:a,samples:r?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),s=null,c=null,l=null,u=new Cr;u.setAttribute(`position`,new dr([-1,3,0,-1,-1,0,3,-1,0],3)),u.setAttribute(`uv`,new dr([0,2,0,0,2,0],2));let d=new ra({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),f=new qr(u,d),p=new Ua(-1,1,1,-1,0,1),m=null,h=null,g=!1,_,v=null,y=[],b=!1;this.setSize=function(e,t){o.setSize(e,t),s!==null&&s.setSize(e,t),c!==null&&c.setSize(e,t);for(let n=0;n<y.length;n++){let r=y[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){y=e,b=y.length>0&&y[0].isRenderPass===!0;let t=o.width,n=o.height;y.length>0&&s===null&&(s=new Ht(t,n,{type:T,depthBuffer:!1,stencilBuffer:!1}),c=new Ht(t,n,{type:T,depthBuffer:!1,stencilBuffer:!1}));let r=i===!0&&y.some(e=>e.needsDepthTexture===!0);r!==(o.depthTexture!==null)&&(r===!0&&l===null&&(l=new Pi(t,n),a===!0&&(l.format=P,l.type=O)),o.dispose(),o.depthTexture=r?l:null,o.resolveDepthBuffer=r,o.storeMultisampledDepthBuffer=r);for(let e=0;e<y.length;e++){let i=y[e];i.setSize&&i.setSize(t,n),r&&i.needsDepthTexture===!0&&i.setDepthTexture&&i.setDepthTexture(l)}},this.begin=function(e,t){if(g||e.toneMapping===0&&y.length===0)return!1;if(v=t,t!==null){let e=t.width,n=t.height;(o.width!==e||o.height!==n)&&this.setSize(e,n)}return b===!1&&e.setRenderTarget(o),_=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return b},this.end=function(e,t){e.toneMapping=_,g=!0;let n=o,r=s;for(let i=0;i<y.length;i++){let a=y[i];a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1&&(n=r,r=r===s?c:s))}if(m!==e.outputColorSpace||h!==e.toneMapping){m=e.outputColorSpace,h=e.toneMapping,d.defines={},kt.getTransfer(m)===`srgb`&&(d.defines.SRGB_TRANSFER=``);let t=Qo[h];t&&(d.defines[t]=``),d.needsUpdate=!0}d.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(v),e.render(f,p),v=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){o.dispose(),s!==null&&s.dispose(),c!==null&&c.dispose(),u.dispose(),d.dispose()}}var es=new zt,ts=new Pi(1,1),ns=new Fi(1),rs=new Ut,is=new Wt,as=new Mi,os=[],ss=[],cs=new Float32Array(16),ls=new Float32Array(9),us=new Float32Array(4);function ds(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=os[i];if(a===void 0&&(a=new Float32Array(i),os[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function fs(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function ps(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function ms(e,t){let n=ss[t];n===void 0&&(n=new Int32Array(t),ss[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function hs(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function gs(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(fs(n,t))return;e.uniform2fv(this.addr,t),ps(n,t)}}function _s(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(fs(n,t))return;e.uniform3fv(this.addr,t),ps(n,t)}}function vs(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(fs(n,t))return;e.uniform4fv(this.addr,t),ps(n,t)}}function ys(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(fs(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),ps(n,t)}else{if(fs(n,r))return;us.set(r),e.uniformMatrix2fv(this.addr,!1,us),ps(n,r)}}function bs(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(fs(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),ps(n,t)}else{if(fs(n,r))return;ls.set(r),e.uniformMatrix3fv(this.addr,!1,ls),ps(n,r)}}function xs(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(fs(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),ps(n,t)}else{if(fs(n,r))return;cs.set(r),e.uniformMatrix4fv(this.addr,!1,cs),ps(n,r)}}function Ss(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function Cs(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(fs(n,t))return;e.uniform2iv(this.addr,t),ps(n,t)}}function ws(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(fs(n,t))return;e.uniform3iv(this.addr,t),ps(n,t)}}function Ts(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(fs(n,t))return;e.uniform4iv(this.addr,t),ps(n,t)}}function Es(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function Ds(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(fs(n,t))return;e.uniform2uiv(this.addr,t),ps(n,t)}}function Os(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(fs(n,t))return;e.uniform3uiv(this.addr,t),ps(n,t)}}function ks(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(fs(n,t))return;e.uniform4uiv(this.addr,t),ps(n,t)}}function As(e){return e.version===0&&(e.compareFunction=519,e.needsUpdate=!0),e}function js(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;a=this.type===e.SAMPLER_2D_SHADOW?As(ts):es,n.setTexture2D(t||a,i)}function Ms(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||is,i)}function Ns(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;a=this.type===e.SAMPLER_CUBE_SHADOW?As(ns):as,n.setTextureCube(t||a,i)}function Ps(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||rs,i)}function Fs(e){switch(e){case 5126:return hs;case 35664:return gs;case 35665:return _s;case 35666:return vs;case 35674:return ys;case 35675:return bs;case 35676:return xs;case 5124:case 35670:return Ss;case 35667:case 35671:return Cs;case 35668:case 35672:return ws;case 35669:case 35673:return Ts;case 5125:return Es;case 36294:return Ds;case 36295:return Os;case 36296:return ks;case 35678:case 36198:case 36298:case 36306:case 35682:return js;case 35679:case 36299:case 36307:return Ms;case 35680:case 36300:case 36308:case 36293:return Ns;case 36289:case 36303:case 36311:case 36292:return Ps}}function Is(e,t){e.uniform1fv(this.addr,t)}function Ls(e,t){let n=ds(t,this.size,2);e.uniform2fv(this.addr,n)}function Rs(e,t){let n=ds(t,this.size,3);e.uniform3fv(this.addr,n)}function zs(e,t){let n=ds(t,this.size,4);e.uniform4fv(this.addr,n)}function Bs(e,t){let n=ds(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function Vs(e,t){let n=ds(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function Hs(e,t){let n=ds(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function Us(e,t){e.uniform1iv(this.addr,t)}function Ws(e,t){e.uniform2iv(this.addr,t)}function Gs(e,t){e.uniform3iv(this.addr,t)}function Ks(e,t){e.uniform4iv(this.addr,t)}function qs(e,t){e.uniform1uiv(this.addr,t)}function Js(e,t){e.uniform2uiv(this.addr,t)}function Ys(e,t){e.uniform3uiv(this.addr,t)}function Xs(e,t){e.uniform4uiv(this.addr,t)}function Zs(e,t,n){let r=this.cache,i=t.length,a=ms(n,i);fs(r,a)||(e.uniform1iv(this.addr,a),ps(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?As(ts):es;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function Qs(e,t,n){let r=this.cache,i=t.length,a=ms(n,i);fs(r,a)||(e.uniform1iv(this.addr,a),ps(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||is,a[e])}function $s(e,t,n){let r=this.cache,i=t.length,a=ms(n,i);fs(r,a)||(e.uniform1iv(this.addr,a),ps(r,a));let o;o=this.type===e.SAMPLER_CUBE_SHADOW?As(ns):as;for(let e=0;e!==i;++e)n.setTextureCube(t[e]||o,a[e])}function ec(e,t,n){let r=this.cache,i=t.length,a=ms(n,i);fs(r,a)||(e.uniform1iv(this.addr,a),ps(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||rs,a[e])}function tc(e){switch(e){case 5126:return Is;case 35664:return Ls;case 35665:return Rs;case 35666:return zs;case 35674:return Bs;case 35675:return Vs;case 35676:return Hs;case 5124:case 35670:return Us;case 35667:case 35671:return Ws;case 35668:case 35672:return Gs;case 35669:case 35673:return Ks;case 5125:return qs;case 36294:return Js;case 36295:return Ys;case 36296:return Xs;case 35678:case 36198:case 36298:case 36306:case 35682:return Zs;case 35679:case 36299:case 36307:return Qs;case 35680:case 36300:case 36308:case 36293:return $s;case 36289:case 36303:case 36311:case 36292:return ec}}var nc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Fs(t.type)}},rc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=tc(t.type)}},ic=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},ac=/(\w+)(\])?(\[|\.)?/g;function oc(e,t){e.seq.push(t),e.map[t.id]=t}function sc(e,t,n){let r=e.name,i=r.length;for(ac.lastIndex=0;;){let a=ac.exec(r),o=ac.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){oc(n,l===void 0?new nc(s,e,t):new rc(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new ic(s),oc(n,e)),n=e}}}var cc=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);sc(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function lc(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var uc=37297,dc=0;function fc(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var pc=new wt;function mc(e){kt._getMatrix(pc,kt.workingColorSpace,e);let t=`mat3( ${pc.elements.map(e=>e.toFixed(4))} )`;switch(kt.getTransfer(e)){case Ke:return[t,`LinearTransferOETF`];case qe:return[t,`sRGBTransferOETF`];default:return V(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function hc(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+fc(e.getShaderSource(t),r)}return i}function gc(e,t){let n=mc(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( ${n[0]} * value.rgb, value.a ) );`,`}`].join(`
`)}var _c={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function vc(e,t){let n=_c[t];return n===void 0?(V(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var yc=new H;function bc(){return kt.getLuminanceCoefficients(yc),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${yc.x.toFixed(4)}, ${yc.y.toFixed(4)}, ${yc.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function xc(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(wc).join(`
`)}function Sc(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function Cc(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function wc(e){return e!==``}function Tc(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,t.numLightProbeGrids)}function Ec(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Dc=/^[ \t]*#include +<([\w\d./]+)>/gm;function Oc(e){return e.replace(Dc,kc)}function kc(e,t){let n=vo[t];if(n===void 0)throw Error(`THREE.WebGLProgram: Can not resolve #include <`+t+`>`);return Oc(n)}var Ac=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function jc(e){return e.replace(Ac,Mc)}function Mc(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function Nc(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision===`highp`?t+=`
#define HIGH_PRECISION`:e.precision===`mediump`?t+=`
#define MEDIUM_PRECISION`:e.precision===`lowp`&&(t+=`
#define LOW_PRECISION`),t}var Pc={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function Fc(e){return Pc[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var Ic={302:`ENVMAP_MODE_REFRACTION`};function Lc(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:Ic[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var Rc={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function zc(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:Rc[e.combine]||`ENVMAP_BLENDING_NONE`}function Bc(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=Fc(n),l=n.envMapPMREM===!0?`ENVMAP_TYPE_PMREM`:`ENVMAP_TYPE_CUBE`,u=Lc(n),d=zc(n),f=xc(n),p=Sc(a),m=i.createProgram(),h,g,_=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(h=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p].filter(wc).join(`
`),h.length>0&&(h+=`
`),g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p].filter(wc).join(`
`),g.length>0&&(g+=`
`)):(h=[Nc(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.diffuseRoughnessMap?`#define USE_DIFFUSE_ROUGHNESSMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.diffuseRoughnessMapUv?`#define DIFFUSE_ROUGHNESSMAP_UV `+n.diffuseRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(wc).join(`
`),g=[Nc(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,n.envMapPMREM?`#define ENVMAP_MAX_LOD `+n.envMapMaxLod+`.0`:``,n.envMapPMREM?`#define ENVMAP_SIZE `+n.envMapSize+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.diffuseRoughness?`#define USE_DIFFUSE_ROUGHNESS`:``,n.diffuseRoughnessMap?`#define USE_DIFFUSE_ROUGHNESSMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.retroreflection?`#define USE_RETROREFLECTION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:vo.tonemapping_pars_fragment,n.toneMapping===0?``:vc(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,vo.colorspace_pars_fragment,gc(`linearToOutputTexel`,n.outputColorSpace),bc(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(wc).join(`
`)),o=Oc(o),o=Tc(o,n),o=Ec(o,n),s=Oc(s),s=Tc(s,n),s=Ec(s,n),o=jc(o),s=jc(s),n.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,h=[f,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+h,g=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+g);let v=_+h+o,y=_+g+s,b=lc(i,i.VERTEX_SHADER,v),x=lc(i,i.FRAGMENT_SHADER,y);i.attachShader(m,b),i.attachShader(m,x),n.index0AttributeName===void 0?n.hasPositionAttribute===!0&&i.bindAttribLocation(m,0,`position`):i.bindAttribLocation(m,0,n.index0AttributeName),i.linkProgram(m);function S(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(m)||``,r=i.getShaderInfoLog(b)||``,a=i.getShaderInfoLog(x)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(m,i.LINK_STATUS)===!1){if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,m,b,x);else{let e=hc(i,b,`vertex`),n=hc(i,x,`fragment`);it(`WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(m,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}}else o===``?(s===``||c===``)&&(u=!1):V(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:h},fragmentShader:{log:c,prefix:g}})}i.deleteShader(b),i.deleteShader(x),C=new cc(i,m),w=Cc(i,m)}let C;this.getUniforms=function(){return C===void 0&&S(this),C};let w;this.getAttributes=function(){return w===void 0&&S(this),w};let T=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return T===!1&&(T=i.getProgramParameter(m,uc)),T},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(m),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=dc++,this.cacheKey=t,this.usedTimes=1,this.program=m,this.vertexShader=b,this.fragmentShader=x,this}var Vc=0,Hc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Uc(e),t.set(e,n)),n}},Uc=class{constructor(e){this.id=Vc++,this.code=e,this.usedTimes=0}};function Wc(e){return e===1030||e===37490||e===36285}function Gc(e,t,n,r,i,a){let o=new nn,s=new Hc,c=new Set,l=[],u=new Map,d=r.logarithmicDepthBuffer,f={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function p(e){return c.add(e),e===0?`uv`:`uv${e}`}function m(i,o,l,u,m,h){let g=u.fog,_=m.geometry,v=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?u.environment:null,y=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,b=t.get(i.envMap||v,y),x=f[i.type],S=r.precision;i.precision!==null&&(S=r.getMaxPrecision(i.precision),S!==i.precision&&V(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,S,`instead.`));let C=_.morphAttributes.position||_.morphAttributes.normal||_.morphAttributes.color,w=C===void 0?0:C.length,T=0;_.morphAttributes.position!==void 0&&(T=1),_.morphAttributes.normal!==void 0&&(T=2),_.morphAttributes.color!==void 0&&(T=3);let E,D,O,k;if(x){let e=yo[x];E=e.vertexShader,D=e.fragmentShader}else{E=i.vertexShader,D=i.fragmentShader;let e=s.getVertexShaderStage(i),t=s.getFragmentShaderStage(i);s.update(i,e,t),O=e.id,k=t.id}let A=e.getRenderTarget(),j=e.state.buffers.depth.getReversed(),M=m.isInstancedMesh===!0,N=m.isBatchedMesh===!0,ee=!!i.map,P=!!i.matcap,te=!!b,F=te&&b.isPMREMTexture===!0,ne=!!i.aoMap,re=!!i.lightMap,ie=!!i.bumpMap&&i.wireframe===!1,ae=!!i.normalMap,oe=!!i.displacementMap,se=!!i.emissiveMap,I=!!i.metalnessMap,L=!!i.roughnessMap,ce=i.anisotropy>0,le=i.clearcoat>0,ue=i.diffuseRoughness>0,de=i.dispersion>0,fe=i.retroreflectivity>0,pe=i.iridescence>0,me=i.sheen>0,he=i.transmission>0,ge=ce&&!!i.anisotropyMap,_e=le&&!!i.clearcoatMap,ve=le&&!!i.clearcoatNormalMap,R=le&&!!i.clearcoatRoughnessMap,ye=ue&&!!i.diffuseRoughnessMap,be=pe&&!!i.iridescenceMap,xe=pe&&!!i.iridescenceThicknessMap,Se=me&&!!i.sheenColorMap,Ce=me&&!!i.sheenRoughnessMap,we=!!i.specularMap,Te=!!i.specularColorMap,Ee=!!i.specularIntensityMap,De=he&&!!i.transmissionMap,Oe=he&&!!i.thicknessMap,ke=!!i.gradientMap,Ae=!!i.alphaMap,z=i.alphaTest>0,je=!!i.alphaHash,Me=!!i.extensions,Ne=0;i.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(Ne=e.toneMapping);let B=F?b.isCompressedCubeTexture?b.image[0].mipmaps:b.mipmaps:null,Pe={shaderID:x,shaderType:i.type,shaderName:i.name,vertexShader:E,fragmentShader:D,defines:i.defines,customVertexShaderID:O,customFragmentShaderID:k,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:S,batching:N,batchingColor:N&&m._colorsTexture!==null,instancing:M,instancingColor:M&&m.instanceColor!==null,instancingMorph:M&&m.morphTexture!==null,outputColorSpace:A===null?e.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:kt.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:ee,matcap:P,envMap:te,envMapMode:te&&b.mapping,envMapPMREM:F,envMapMaxLod:F?B.length-1:null,envMapSize:F?B[0].width:null,aoMap:ne,lightMap:re,bumpMap:ie,normalMap:ae,displacementMap:oe,emissiveMap:se,normalMapObjectSpace:ae&&i.normalMapType===1,normalMapTangentSpace:ae&&i.normalMapType===0,packedNormalMap:ae&&i.normalMapType===0&&Wc(i.normalMap.format),metalnessMap:I,roughnessMap:L,anisotropy:ce,anisotropyMap:ge,clearcoat:le,clearcoatMap:_e,clearcoatNormalMap:ve,clearcoatRoughnessMap:R,diffuseRoughness:ue,diffuseRoughnessMap:ye,dispersion:de,retroreflection:fe,iridescence:pe,iridescenceMap:be,iridescenceThicknessMap:xe,sheen:me,sheenColorMap:Se,sheenRoughnessMap:Ce,specularMap:we,specularColorMap:Te,specularIntensityMap:Ee,transmission:he,transmissionMap:De,thicknessMap:Oe,gradientMap:ke,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:Ae,alphaTest:z,alphaHash:je,combine:i.combine,mapUv:ee&&p(i.map.channel),aoMapUv:ne&&p(i.aoMap.channel),lightMapUv:re&&p(i.lightMap.channel),bumpMapUv:ie&&p(i.bumpMap.channel),normalMapUv:ae&&p(i.normalMap.channel),displacementMapUv:oe&&p(i.displacementMap.channel),emissiveMapUv:se&&p(i.emissiveMap.channel),metalnessMapUv:I&&p(i.metalnessMap.channel),roughnessMapUv:L&&p(i.roughnessMap.channel),anisotropyMapUv:ge&&p(i.anisotropyMap.channel),clearcoatMapUv:_e&&p(i.clearcoatMap.channel),clearcoatNormalMapUv:ve&&p(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:R&&p(i.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:ye&&p(i.diffuseRoughnessMap.channel),iridescenceMapUv:be&&p(i.iridescenceMap.channel),iridescenceThicknessMapUv:xe&&p(i.iridescenceThicknessMap.channel),sheenColorMapUv:Se&&p(i.sheenColorMap.channel),sheenRoughnessMapUv:Ce&&p(i.sheenRoughnessMap.channel),specularMapUv:we&&p(i.specularMap.channel),specularColorMapUv:Te&&p(i.specularColorMap.channel),specularIntensityMapUv:Ee&&p(i.specularIntensityMap.channel),transmissionMapUv:De&&p(i.transmissionMap.channel),thicknessMapUv:Oe&&p(i.thicknessMap.channel),alphaMapUv:Ae&&p(i.alphaMap.channel),vertexTangents:!!_.attributes.tangent&&(ae||ce),vertexNormals:!!_.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!_.attributes.color&&_.attributes.color.itemSize===4,pointsUvs:m.isPoints===!0&&!!_.attributes.uv&&(ee||Ae),fog:!!g,useFog:i.fog===!0,fogExp2:!!g&&g.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||_.attributes.normal===void 0&&ae===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:j,skinning:m.isSkinnedMesh===!0,hasPositionAttribute:_.attributes.position!==void 0,morphTargets:_.morphAttributes.position!==void 0,morphNormals:_.morphAttributes.normal!==void 0,morphColors:_.morphAttributes.color!==void 0,morphTargetsCount:w,morphTextureStride:T,numSunLights:o.sun.length,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numSunLightShadows:o.sunShadowMap.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numLightProbes:o.numLightProbes,numLightProbeGrids:h.filter(e=>e.texture!==null).length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:Ne,decodeVideoTexture:ee&&i.map.isVideoTexture===!0&&kt.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:se&&i.emissiveMap.isVideoTexture===!0&&kt.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:Me&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(Me&&i.extensions.multiDraw===!0||N)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return Pe.vertexUv1s=c.has(1),Pe.vertexUv2s=c.has(2),Pe.vertexUv3s=c.has(3),c.clear(),Pe}function h(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(g(n,t),_(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function g(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapPMREM),e.push(t.envMapMaxLod),e.push(t.envMapSize),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.diffuseRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.numSunLights),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numSunLightShadows),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.numLightProbeGrids),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function _(e,t){o.disableAll(),t.instancing&&o.enable(0),t.instancingColor&&o.enable(1),t.instancingMorph&&o.enable(2),t.matcap&&o.enable(3),t.envMap&&o.enable(4),t.normalMapObjectSpace&&o.enable(5),t.normalMapTangentSpace&&o.enable(6),t.clearcoat&&o.enable(7),t.iridescence&&o.enable(8),t.alphaTest&&o.enable(9),t.vertexColors&&o.enable(10),t.vertexAlphas&&o.enable(11),t.vertexUv1s&&o.enable(12),t.vertexUv2s&&o.enable(13),t.vertexUv3s&&o.enable(14),t.vertexTangents&&o.enable(15),t.anisotropy&&o.enable(16),t.alphaHash&&o.enable(17),t.batching&&o.enable(18),t.dispersion&&o.enable(19),t.retroreflection&&o.enable(24),t.diffuseRoughness&&o.enable(25),t.batchingColor&&o.enable(20),t.gradientMap&&o.enable(21),t.packedNormalMap&&o.enable(22),t.vertexNormals&&o.enable(23),e.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.reversedDepthBuffer&&o.enable(4),t.skinning&&o.enable(5),t.morphTargets&&o.enable(6),t.morphNormals&&o.enable(7),t.morphColors&&o.enable(8),t.premultipliedAlpha&&o.enable(9),t.shadowMapEnabled&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),t.decodeVideoTextureEmissive&&o.enable(20),t.alphaToCoverage&&o.enable(21),t.numLightProbeGrids>0&&o.enable(22),t.hasPositionAttribute&&o.enable(23),e.push(o.mask)}function v(e){let t=f[e.type],n;if(t){let e=yo[t];n=$i.clone(e.uniforms)}else n=e.uniforms;return n}function y(t,n){let r=u.get(n);return r===void 0?(r=new Bc(e,n,t,i),l.push(r),u.set(n,r)):++r.usedTimes,r}function b(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),u.delete(e.cacheKey),e.destroy()}}function x(e){s.remove(e)}function S(){s.dispose()}return{getParameters:m,getProgramCacheKey:h,getUniforms:v,acquireProgram:y,releaseProgram:b,releaseShaderCache:x,programs:l,dispose:S}}function Kc(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function qc(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function Jc(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function Yc(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l,u){u.reversedDepth===!0&&(c=-c);let d=s(e,t,a,o,c,l);a.transmission>0?r.push(d):a.transparent===!0?i.push(d):n.push(d)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t){n.length>1&&n.sort(e||qc),r.length>1&&r.sort(t||Jc),i.length>1&&i.sort(t||Jc)}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function Xc(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new Yc,e.set(t,[i])):n>=r.length?(i=new Yc,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function Zc(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={direction:new H,color:new U};break;case`SpotLight`:n={position:new H,direction:new H,color:new U,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new H,color:new U,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new H,skyColor:new U,groundColor:new U};break;case`RectAreaLight`:n={color:new U,position:new H,halfWidth:new H,halfHeight:new H}}return e[t.id]=n,n}}}function Qc(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new bt};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new bt};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new bt,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var $c=0;function el(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function tl(e){let t=new Zc,n=Qc(),r={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new H);let i=new H,a=new Gt,o=new Gt;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0,y=0,b=0,x=0;i.sort(el);for(let e=0,S=i.length;e<S;e++){let S=i[e],C=S.color,w=S.intensity,T=S.distance,E=null;if(S.shadow&&S.shadow.map&&(E=S.shadow.map.texture.format===1030?S.shadow.map.texture:S.shadow.map.depthTexture||S.shadow.map.texture),S.isAmbientLight)a+=C.r*w,o+=C.g*w,s+=C.b*w;else if(S.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(S.sh.coefficients[e],w);x++}else if(S.isSunLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize.copy(e.mapSize).multiply(e.getFrameExtents()),r.sunShadow[l]=t,r.sunShadowMap[l]=E;let i=e.getViewportCount();for(let t=0;t<i;t++)r.sunShadowMatrix[u+t]=e.getMatrix(t),r.sunShadowCascade[u+t]=e._cascadeData[t];u+=i,l++}r.sun[c]=e,c++}else if(S.isDirectionalLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[d]=t,r.directionalShadowMap[d]=E,r.directionalShadowMatrix[d]=S.shadow.matrix,g++}r.directional[d]=e,d++}else if(S.isSpotLight){let e=t.get(S);e.position.setFromMatrixPosition(S.matrixWorld),e.color.copy(C).multiplyScalar(w),e.distance=T,e.coneCos=Math.cos(S.angle),e.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),e.decay=S.decay,r.spot[p]=e;let i=S.shadow;if(S.map&&(r.spotLightMap[y]=S.map,y++,i.updateMatrices(S),S.castShadow&&b++),r.spotLightMatrix[p]=i.matrix,S.castShadow){let e=n.get(S);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[p]=e,r.spotShadowMap[p]=E,v++}p++}else if(S.isRectAreaLight){let e=t.get(S);e.color.copy(C).multiplyScalar(w),e.halfWidth.set(S.width*.5,0,0),e.halfHeight.set(0,S.height*.5,0),r.rectArea[m]=e,m++}else if(S.isPointLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),e.distance=S.distance,e.decay=S.decay,S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[f]=t,r.pointShadowMap[f]=E,r.pointShadowMatrix[f]=S.shadow.matrix,_++}r.point[f]=e,f++}else if(S.isHemisphereLight){let e=t.get(S);e.skyColor.copy(S.color).multiplyScalar(w),e.groundColor.copy(S.groundColor).multiplyScalar(w),r.hemi[h]=e,h++}}m>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=W.LTC_FLOAT_1,r.rectAreaLTC2=W.LTC_FLOAT_2):(r.rectAreaLTC1=W.LTC_HALF_1,r.rectAreaLTC2=W.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let S=r.hash;(S.sunLength!==c||S.directionalLength!==d||S.pointLength!==f||S.spotLength!==p||S.rectAreaLength!==m||S.hemiLength!==h||S.numSunShadows!==l||S.numDirectionalShadows!==g||S.numPointShadows!==_||S.numSpotShadows!==v||S.numSpotMaps!==y||S.numLightProbes!==x)&&(r.sun.length=c,r.directional.length=d,r.spot.length=p,r.rectArea.length=m,r.point.length=f,r.hemi.length=h,r.sunShadow.length=l,r.sunShadowMap.length=l,r.sunShadowMatrix.length=u,r.sunShadowCascade.length=u,r.directionalShadow.length=g,r.directionalShadowMap.length=g,r.directionalShadowMatrix.length=g,r.pointShadow.length=_,r.pointShadowMap.length=_,r.pointShadowMatrix.length=_,r.spotShadow.length=v,r.spotShadowMap.length=v,r.spotLightMatrix.length=v+y-b,r.spotLightMap.length=y,r.numSpotLightShadowsWithMaps=b,r.numLightProbes=x,S.sunLength=c,S.directionalLength=d,S.pointLength=f,S.spotLength=p,S.rectAreaLength=m,S.hemiLength=h,S.numSunShadows=l,S.numDirectionalShadows=g,S.numPointShadows=_,S.numSpotShadows=v,S.numSpotMaps=y,S.numLightProbes=x,r.version=$c++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=0,f=t.matrixWorldInverse;for(let t=0,p=e.length;t<p;t++){let p=e[t];if(p.isSunLight){let e=r.sun[n];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),n++}else if(p.isDirectionalLight){let e=r.directional[s];e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),s++}else if(p.isSpotLight){let e=r.spot[l];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),l++}else if(p.isRectAreaLight){let e=r.rectArea[u];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),o.identity(),a.copy(p.matrixWorld),a.premultiply(f),o.extractRotation(a),e.halfWidth.set(p.width*.5,0,0),e.halfHeight.set(0,p.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),u++}else if(p.isPointLight){let e=r.point[c];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),c++}else if(p.isHemisphereLight){let e=r.hemi[d];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),d++}}}return{setup:s,setupView:c,state:r}}function nl(e){let t=new tl(e),n=[],r=[],i=[];function a(e){u.camera=e,n.length=0,r.length=0,i.length=0}function o(e){e.isLightProbeGrid?i.push(e):n.push(e)}function s(e){r.push(e)}function c(){t.setup(n),i.sort((e,t)=>e.priority-t.priority||e.id-t.id)}function l(e){t.setupView(n,e)}let u={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:u,setupLights:c,setupLightsView:l,pushLight:o,pushShadow:s}}function rl(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new nl(e),t.set(n,[a])):r>=i.length?(a=new nl(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var il=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,al=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,ol=[new H(1,0,0),new H(-1,0,0),new H(0,1,0),new H(0,-1,0),new H(0,0,1),new H(0,0,-1)],sl=[new H(0,-1,0),new H(0,-1,0),new H(0,0,1),new H(0,0,-1),new H(0,-1,0),new H(0,-1,0)],cl=new Gt,ll=new H,ul=new H;function dl(e,t,n){let r=new li,i=new bt,a=new bt,o=new Bt,s=new aa,c=new oa,l={},u=n.maxTextureSize,d={0:1,1:0,2:2},p=new na({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new bt},radius:{value:4}},vertexShader:il,fragmentShader:al}),m=p.clone();m.defines.HORIZONTAL_PASS=1;let g=new Cr;g.setAttribute(`position`,new cr(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new qr(g,p),v=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let y=this.type;this.render=function(t,n,s){if(v.enabled===!1||v.autoUpdate===!1&&v.needsUpdate===!1||t.length===0)return;this.type===2&&(V(`WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead.`),this.type=1);let c=e.getRenderTarget(),l=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),p=e.state;p.setBlending(0),p.buffers.depth.getReversed()===!0?p.buffers.color.setClear(0,0,0,0):p.buffers.color.setClear(1,1,1,1),p.buffers.depth.setTest(!0),p.setScissorTest(!1);let m=y!==this.type;m&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let c=0,l=t.length;c<l;c++){let l=t[c],d=l.shadow;if(d===void 0){V(`WebGLShadowMap:`,l,`has no shadow.`);continue}if(d.autoUpdate===!1&&d.needsUpdate===!1)continue;i.copy(d.mapSize);let g=d.getFrameExtents();i.multiply(g),a.copy(d.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(a.x=Math.floor(u/g.x),i.x=a.x*g.x,d.mapSize.x=a.x),i.y>u&&(a.y=Math.floor(u/g.y),i.y=a.y*g.y,d.mapSize.y=a.y));let _=e.state.buffers.depth.getReversed();if(d.camera._reversedDepth=_,d.map===null||m===!0){if(d.map!==null&&(d.map.depthTexture!==null&&(d.map.depthTexture.dispose(),d.map.depthTexture=null),d.map.dispose()),this.type===3){if(l.isPointLight){V(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}d.map=new Ht(i.x,i.y,{format:ne,type:T,minFilter:h,magFilter:h,generateMipmaps:!1}),d.map.texture.name=l.name+`.shadowMap`,d.map.depthTexture=new Pi(i.x,i.y,w),d.map.depthTexture.name=l.name+`.shadowMapDepth`,d.map.depthTexture.format=ee,d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=f,d.map.depthTexture.magFilter=f}else l.isPointLight?(d.map=new Oo(i.x),d.map.depthTexture=new Fi(i.x,C)):(d.map=new Ht(i.x,i.y),d.map.depthTexture=new Pi(i.x,i.y,C)),d.map.depthTexture.name=l.name+`.shadowMap`,d.map.depthTexture.format=ee,this.type===1?(d.map.depthTexture.compareFunction=_?518:515,d.map.depthTexture.minFilter=h,d.map.depthTexture.magFilter=h):(d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=f,d.map.depthTexture.magFilter=f);d.camera.updateProjectionMatrix()}d.map.isWebGLCubeRenderTarget!==!0&&(d.map.width!==i.x||d.map.height!==i.y)&&d.map.setSize(i.x,i.y);let v=d.map.isWebGLCubeRenderTarget?6:d.getViewportCount();l.isPointLight!==!0&&d.updateMatrices(l,s);let y=d.camera.layers.mask&4294967294?d.camera.layers:s.layers;for(let t=0;t<v;t++){let i=d.getCamera(t);if(l.isPointLight){let e=d.camera,n=d.matrix,r=l.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),ll.setFromMatrixPosition(l.matrixWorld),e.position.copy(ll),ul.copy(e.position),ul.add(ol[t]),e.up.copy(sl[t]),e.lookAt(ul),e.updateMatrixWorld(),n.makeTranslation(-ll.x,-ll.y,-ll.z),cl.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),d._frustum.setFromProjectionMatrix(cl,e.coordinateSystem,e.reversedDepth)}if(d.map.isWebGLCubeRenderTarget)e.setRenderTarget(d.map,t),e.clear();else{t===0&&(e.setRenderTarget(d.map),e.clear());let n=d.getViewport(t);o.set(a.x*n.x,a.y*n.y,a.x*n.z,a.y*n.w),p.viewport(o)}r=d.getFrustum(t),S(n,s,i,l,y,this.type)}d.isPointLightShadow!==!0&&this.type===3&&b(d,s),d.needsUpdate=!1}y=this.type,v.needsUpdate=!1,e.setRenderTarget(c,l,d)};function b(n,r){let a=t.update(_);p.defines.VSM_SAMPLES!==n.blurSamples&&(p.defines.VSM_SAMPLES=n.blurSamples,m.defines.VSM_SAMPLES=n.blurSamples,p.needsUpdate=!0,m.needsUpdate=!0),n.mapPass===null?n.mapPass=new Ht(i.x,i.y,{format:ne,type:T}):(n.mapPass.width!==n.map.width||n.mapPass.height!==n.map.height)&&n.mapPass.setSize(n.map.width,n.map.height),p.uniforms.shadow_pass.value=n.map.depthTexture,p.uniforms.resolution.value.set(n.map.width,n.map.height),p.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,a,p,_,null),m.uniforms.shadow_pass.value=n.mapPass.texture,m.uniforms.resolution.value.set(n.map.width,n.map.height),m.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,a,m,_,null)}function x(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?c:s,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=l[e];r===void 0&&(r={},l[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,E)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?d[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function S(n,i,a,o,s,c){if(n.visible===!1)return;if(n.layers.test(s)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&c===3)&&(!n.frustumCulled||n.intersectsFrustum(r))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let r=t.update(n),s=n.material;if(Array.isArray(s)){let t=r.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=s[u.materialIndex];if(d&&d.visible){let t=x(n,d,o,c);n.onBeforeShadow(e,n,i,a,r,t,u),e.renderBufferDirect(a,null,r,t,n,u),n.onAfterShadow(e,n,i,a,r,t,u)}}}else if(s.visible){let t=x(n,s,o,c);n.onBeforeShadow(e,n,i,a,r,t,null),e.renderBufferDirect(a,null,r,t,n,null),n.onAfterShadow(e,n,i,a,r,t,null)}}let l=n.children;for(let e=0,t=l.length;e<t;e++)S(l[e],i,a,o,s,c)}function E(e){e.target.removeEventListener(`dispose`,E);for(let t in l){let n=l[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function fl(e,t){function n(){let t=!1,n=new Bt,r=null,i=new Bt(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?I(e.DEPTH_TEST):L(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=st[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?I(e.STENCIL_TEST):L(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c={},l=new WeakMap,u={},d={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new U(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,M=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),N=!1,ee=0,P=e.getParameter(e.VERSION);P.indexOf(`WebGL`)===-1?P.indexOf(`OpenGL ES`)!==-1&&(ee=parseFloat(/^OpenGL ES (\d)/.exec(P)[1]),N=ee>=2):(ee=parseFloat(/^WebGL (\d)/.exec(P)[1]),N=ee>=1);let te=null,F={},ne=e.getParameter(e.SCISSOR_BOX),re=e.getParameter(e.VIEWPORT),ie=new Bt().fromArray(ne),ae=new Bt().fromArray(re);function oe(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let se={};se[e.TEXTURE_2D]=oe(e.TEXTURE_2D,e.TEXTURE_2D,1),se[e.TEXTURE_CUBE_MAP]=oe(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),se[e.TEXTURE_2D_ARRAY]=oe(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),se[e.TEXTURE_3D]=oe(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),I(e.DEPTH_TEST),o.setFunc(3),he(!1),ge(1),I(e.CULL_FACE),pe(0);function I(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function L(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function ce(t,n){return f[t]!==n&&(e.bindFramebuffer(t,n),f[t]=n,t===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=n),!0)}function le(t,n){let r=m,i=!1;if(t){r=p.get(n),r===void 0&&(r=[],p.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function ue(t){return h!==t&&(e.useProgram(t),h=t,!0)}let de={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};de[103]=e.MIN,de[104]=e.MAX;let fe={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function pe(t,n,r,i,a,o,s,c,l,u){if(t===0)g===!0&&(L(e.BLEND),g=!1);else if(g===!1&&(I(e.BLEND),g=!0),t!==5){if(t!==_||u!==E){if((v!==100||x!==100)&&(e.blendEquation(e.FUNC_ADD),v=100,x=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:it(`WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:it(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:it(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:it(`WebGLState: Invalid blending: `,t)}y=null,b=null,S=null,C=null,w.set(0,0,0),T=0,_=t,E=u}}else a=a||n,o=o||r,s=s||i,(n!==v||a!==x)&&(e.blendEquationSeparate(de[n],de[a]),v=n,x=a),(r!==y||i!==b||o!==S||s!==C)&&(e.blendFuncSeparate(fe[r],fe[i],fe[o],fe[s]),y=r,b=i,S=o,C=s),(c.equals(w)===!1||l!==T)&&(e.blendColor(c.r,c.g,c.b,l),w.copy(c),T=l),_=t,E=!1}function me(t,n){t.side===2?L(e.CULL_FACE):I(e.CULL_FACE);let r=t.side===1;n&&(r=!r),he(r),t.blending===1&&t.transparent===!1?pe(0):pe(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),ve(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?I(e.SAMPLE_ALPHA_TO_COVERAGE):L(e.SAMPLE_ALPHA_TO_COVERAGE)}function he(t){D!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),D=t)}function ge(t){t===0?L(e.CULL_FACE):(I(e.CULL_FACE),t!==O&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),O=t}function _e(t){t!==k&&(N&&e.lineWidth(t),k=t)}function ve(t,n,r){t?(I(e.POLYGON_OFFSET_FILL),(A!==n||j!==r)&&(A=n,j=r,o.getReversed()&&(n=-n,r=-r),e.polygonOffset(n,r))):L(e.POLYGON_OFFSET_FILL)}function R(t){t?I(e.SCISSOR_TEST):L(e.SCISSOR_TEST)}function ye(t){t===void 0&&(t=e.TEXTURE0+M-1),te!==t&&(e.activeTexture(t),te=t)}function be(t,n,r){r===void 0&&(r=te===null?e.TEXTURE0+M-1:te);let i=F[r];i===void 0&&(i={type:void 0,texture:void 0},F[r]=i),(i.type!==t||i.texture!==n)&&(te!==r&&(e.activeTexture(r),te=r),e.bindTexture(t,n||se[t]),i.type=t,i.texture=n)}function xe(){let t=F[te];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function Se(){try{e.compressedTexImage2D(...arguments)}catch(e){it(`WebGLState:`,e)}}function Ce(){try{e.compressedTexImage3D(...arguments)}catch(e){it(`WebGLState:`,e)}}function we(){try{e.texSubImage2D(...arguments)}catch(e){it(`WebGLState:`,e)}}function Te(){try{e.texSubImage3D(...arguments)}catch(e){it(`WebGLState:`,e)}}function Ee(){try{e.compressedTexSubImage2D(...arguments)}catch(e){it(`WebGLState:`,e)}}function De(){try{e.compressedTexSubImage3D(...arguments)}catch(e){it(`WebGLState:`,e)}}function Oe(){try{e.texStorage2D(...arguments)}catch(e){it(`WebGLState:`,e)}}function ke(){try{e.texStorage3D(...arguments)}catch(e){it(`WebGLState:`,e)}}function Ae(){try{e.texImage2D(...arguments)}catch(e){it(`WebGLState:`,e)}}function z(){try{e.texImage3D(...arguments)}catch(e){it(`WebGLState:`,e)}}function je(t){return d[t]===void 0?e.getParameter(t):d[t]}function Me(t,n){d[t]!==n&&(e.pixelStorei(t,n),d[t]=n)}function Ne(t){ie.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),ie.copy(t))}function B(t){ae.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),ae.copy(t))}function Pe(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),e.uniformBlockBinding(n,i,i),r.set(t,i))}function Fe(t,n,r){let i=l.get(n).get(t);c[i]!==r&&(e.bindBufferBase(e.UNIFORM_BUFFER,i,r),c[i]=r)}function Ie(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},d={},te=null,F={},f={},c={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new U(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,ie.set(0,0,e.canvas.width,e.canvas.height),ae.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:I,disable:L,bindFramebuffer:ce,drawBuffers:le,useProgram:ue,setBlending:pe,setMaterial:me,setFlipSided:he,setCullFace:ge,setLineWidth:_e,setPolygonOffset:ve,setScissorTest:R,activeTexture:ye,bindTexture:be,unbindTexture:xe,compressedTexImage2D:Se,compressedTexImage3D:Ce,texImage2D:Ae,texImage3D:z,pixelStorei:Me,getParameter:je,updateUBOMapping:Pe,uniformBlockBinding:Fe,texStorage2D:Oe,texStorage3D:ke,texSubImage2D:we,texSubImage3D:Te,compressedTexSubImage2D:Ee,compressedTexSubImage3D:De,scissor:Ne,viewport:B,reset:Ie}}function pl(e,t,n,r,i,a,o){let s=t.has(`WEBGL_multisampled_render_to_texture`)?t.get(`WEBGL_multisampled_render_to_texture`):null,c=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),v=new bt,y=new WeakMap,b=new Set,x,S=new WeakMap,C=new Set,w=new FinalizationRegistry(e=>C.delete(e)),T=!1;try{T=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function E(e,t){return T?new OffscreenCanvas(e,t):$e(`canvas`)}function D(e,t,n){let r=1,i=Ie(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);x===void 0&&(x=E(n,a));let o=t?E(n,a):x;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),V(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}return`data`in e&&V(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e}return e}function O(e){return e.generateMipmaps}function k(t){e.generateMipmap(t)}function A(t){return t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:t.isWebGL3DRenderTarget?e.TEXTURE_3D:t.isWebGLArrayRenderTarget||t.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function j(n,r,i,a,o,s=!1){if(n!==null){if(e[n]!==void 0)return e[n];V(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+n+`'`)}let c;a&&(c=t.get(`EXT_texture_norm16`),c||V(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let l=r;if(r===e.RED&&(i===e.FLOAT&&(l=e.R32F),i===e.HALF_FLOAT&&(l=e.R16F),i===e.UNSIGNED_BYTE&&(l=e.R8),i===e.UNSIGNED_SHORT&&c&&(l=c.R16_EXT),i===e.SHORT&&c&&(l=c.R16_SNORM_EXT)),r===e.RED_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.R8UI),i===e.UNSIGNED_SHORT&&(l=e.R16UI),i===e.UNSIGNED_INT&&(l=e.R32UI),i===e.BYTE&&(l=e.R8I),i===e.SHORT&&(l=e.R16I),i===e.INT&&(l=e.R32I)),r===e.RG&&(i===e.FLOAT&&(l=e.RG32F),i===e.HALF_FLOAT&&(l=e.RG16F),i===e.UNSIGNED_BYTE&&(l=e.RG8),i===e.UNSIGNED_SHORT&&c&&(l=c.RG16_EXT),i===e.SHORT&&c&&(l=c.RG16_SNORM_EXT)),r===e.RG_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RG8UI),i===e.UNSIGNED_SHORT&&(l=e.RG16UI),i===e.UNSIGNED_INT&&(l=e.RG32UI),i===e.BYTE&&(l=e.RG8I),i===e.SHORT&&(l=e.RG16I),i===e.INT&&(l=e.RG32I)),r===e.RGB_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGB8UI),i===e.UNSIGNED_SHORT&&(l=e.RGB16UI),i===e.UNSIGNED_INT&&(l=e.RGB32UI),i===e.BYTE&&(l=e.RGB8I),i===e.SHORT&&(l=e.RGB16I),i===e.INT&&(l=e.RGB32I)),r===e.RGBA_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGBA8UI),i===e.UNSIGNED_SHORT&&(l=e.RGBA16UI),i===e.UNSIGNED_INT&&(l=e.RGBA32UI),i===e.BYTE&&(l=e.RGBA8I),i===e.SHORT&&(l=e.RGBA16I),i===e.INT&&(l=e.RGBA32I)),r===e.RGB&&(i===e.UNSIGNED_SHORT&&c&&(l=c.RGB16_EXT),i===e.SHORT&&c&&(l=c.RGB16_SNORM_EXT),i===e.UNSIGNED_INT_5_9_9_9_REV&&(l=e.RGB9_E5),i===e.UNSIGNED_INT_10F_11F_11F_REV&&(l=e.R11F_G11F_B10F)),r===e.RGBA){let t=s?Ke:kt.getTransfer(o);i===e.FLOAT&&(l=e.RGBA32F),i===e.HALF_FLOAT&&(l=e.RGBA16F),i===e.UNSIGNED_BYTE&&(l=t===`srgb`?e.SRGB8_ALPHA8:e.RGBA8),i===e.UNSIGNED_SHORT&&c&&(l=c.RGBA16_EXT),i===e.SHORT&&c&&(l=c.RGBA16_SNORM_EXT),i===e.UNSIGNED_SHORT_4_4_4_4&&(l=e.RGBA4),i===e.UNSIGNED_SHORT_5_5_5_1&&(l=e.RGB5_A1)}return(l===e.R16F||l===e.R32F||l===e.RG16F||l===e.RG32F||l===e.RGBA16F||l===e.RGBA32F)&&t.get(`EXT_color_buffer_float`),l}function M(t,n){let r;return t?n===null||n===1014||n===1020?r=e.DEPTH24_STENCIL8:n===1015?r=e.DEPTH32F_STENCIL8:n===1012&&(r=e.DEPTH24_STENCIL8,V(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):n===null||n===1014||n===1020?r=e.DEPTH_COMPONENT24:n===1015?r=e.DEPTH_COMPONENT32F:n===1012&&(r=e.DEPTH_COMPONENT16),r}function N(e,t){return O(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function ee(e){let t=new WeakRef(e);r.get(e).__ref=t,C.add(t),w.register(e,t,t)}function te(e){let t=r.get(e).__ref;t!==void 0&&(C.delete(t),w.unregister(t))}function F(e){re(e.target)}function ne(e){ie(e.target)}function re(e){e.removeEventListener(`dispose`,F),te(e),oe(e),e.isVideoTexture&&y.delete(e),e.isHTMLTexture&&b.delete(e)}function ie(e){e.removeEventListener(`dispose`,ne),te(e),I(e)}function ae(){for(let e of C){let t=e.deref();t!==void 0&&(t.isRenderTarget===!0?ie(t):re(t))}C.clear(),b.clear()}function oe(e){let t=r.get(e);if(t.__webglInit===void 0)return;let n=e.source,i=S.get(n);if(i){let r=i[t.__cacheKey];r.usedTimes--,r.usedTimes===0&&se(e),Object.keys(i).length===0&&S.delete(n)}r.remove(e)}function se(t){let n=r.get(t);e.deleteTexture(n.__webglTexture);let i=t.source,a=S.get(i);delete a[n.__cacheKey],o.memory.textures--}function I(t){let n=r.get(t);n.__depthDisposeCallback&&n.__depthDisposeCallback();let i=t.depthTexture;if(i&&i.renderTarget===t&&re(i),t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(n.__webglFramebuffer[t]))for(let r=0;r<n.__webglFramebuffer[t].length;r++)e.deleteFramebuffer(n.__webglFramebuffer[t][r]);else e.deleteFramebuffer(n.__webglFramebuffer[t]);n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer[t])}else{if(Array.isArray(n.__webglFramebuffer))for(let t=0;t<n.__webglFramebuffer.length;t++)e.deleteFramebuffer(n.__webglFramebuffer[t]);else e.deleteFramebuffer(n.__webglFramebuffer);if(n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer),n.__webglMultisampledFramebuffer&&e.deleteFramebuffer(n.__webglMultisampledFramebuffer),n.__webglColorRenderbuffer)for(let t=0;t<n.__webglColorRenderbuffer.length;t++)n.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);n.__webglDepthRenderbuffer&&e.deleteRenderbuffer(n.__webglDepthRenderbuffer)}let a=t.textures;for(let t=0,n=a.length;t<n;t++){let n=r.get(a[t]);n.__webglTexture&&(e.deleteTexture(n.__webglTexture),o.memory.textures--),r.remove(a[t])}r.remove(t)}let L=0;function ce(){L=0}function le(){return L}function ue(e){L=e}function de(){let e=L;return e>=i.maxTextures&&V(`WebGLTextures: Trying to use `+(e+1)+` texture units while this GPU supports only `+i.maxTextures),L+=1,e}function fe(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.mipmapsAutoUpdate),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function pe(t,i){let a=r.get(t);if(t.isVideoTexture&&Pe(t),t.isRenderTargetTexture===!1&&t.isExternalTexture!==!0&&t.version>0&&a.__version!==t.version){let e=t.image;if(e===null)V(`WebGLRenderer: Texture marked for update but no image data found.`);else if(e.complete===!1)V(`WebGLRenderer: Texture marked for update but image is incomplete`);else{Ce(a,t,i);return}}else t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,a.__webglTexture,e.TEXTURE0+i)}function me(t,i){let a=r.get(t);t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version?Ce(a,t,i):(t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null),n.bindTexture(e.TEXTURE_2D_ARRAY,a.__webglTexture,e.TEXTURE0+i))}function he(t,i){let a=r.get(t);t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version?Ce(a,t,i):n.bindTexture(e.TEXTURE_3D,a.__webglTexture,e.TEXTURE0+i)}function ge(t,i){let a=r.get(t);t.version>0&&a.__version!==t.version?we(a,t,i):n.bindTexture(e.TEXTURE_CUBE_MAP,a.__webglTexture,e.TEXTURE0+i)}let _e={[l]:e.REPEAT,[u]:e.CLAMP_TO_EDGE,[d]:e.MIRRORED_REPEAT},ve={[f]:e.NEAREST,[p]:e.NEAREST_MIPMAP_NEAREST,[m]:e.NEAREST_MIPMAP_LINEAR,[h]:e.LINEAR,[g]:e.LINEAR_MIPMAP_NEAREST,[_]:e.LINEAR_MIPMAP_LINEAR},R={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function ye(n,a){if(a.type===1015&&t.has(`OES_texture_float_linear`)===!1&&(a.magFilter===1006||a.magFilter===1007||a.magFilter===1005||a.magFilter===1008||a.minFilter===1006||a.minFilter===1007||a.minFilter===1005||a.minFilter===1008)&&V(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),e.texParameteri(n,e.TEXTURE_WRAP_S,_e[a.wrapS]),e.texParameteri(n,e.TEXTURE_WRAP_T,_e[a.wrapT]),(n===e.TEXTURE_3D||n===e.TEXTURE_2D_ARRAY)&&e.texParameteri(n,e.TEXTURE_WRAP_R,_e[a.wrapR]),e.texParameteri(n,e.TEXTURE_MAG_FILTER,ve[a.magFilter]),e.texParameteri(n,e.TEXTURE_MIN_FILTER,ve[a.minFilter]),a.compareFunction&&(e.texParameteri(n,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(n,e.TEXTURE_COMPARE_FUNC,R[a.compareFunction])),t.has(`EXT_texture_filter_anisotropic`)===!0){if(a.magFilter===1003||a.minFilter!==1005&&a.minFilter!==1008||a.type===1015&&t.has(`OES_texture_float_linear`)===!1)return;if(a.anisotropy>1||r.get(a).__currentAnisotropy){let o=t.get(`EXT_texture_filter_anisotropic`);e.texParameterf(n,o.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(a.anisotropy,i.getMaxAnisotropy())),r.get(a).__currentAnisotropy=a.anisotropy}}}function be(t,n){let r=!1;t.__webglInit===void 0&&(t.__webglInit=!0,n.addEventListener(`dispose`,F),ee(n));let i=n.source,a=S.get(i);a===void 0&&(a={},S.set(i,a));let s=fe(n);if(s!==t.__cacheKey){a[s]===void 0&&(a[s]={texture:e.createTexture(),usedTimes:0},o.memory.textures++,r=!0),a[s].usedTimes++;let i=a[t.__cacheKey];i!==void 0&&(a[t.__cacheKey].usedTimes--,i.usedTimes===0&&se(n)),t.__cacheKey=s,t.__webglTexture=a[s].texture}return r}function xe(e,t,n){return Math.floor(Math.floor(e/n)/t)}function Se(t,r,i,a){let o=t.updateRanges;if(o.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,r.width,r.height,i,a,r.data);else{o.sort((e,t)=>e.start-t.start);let s=0;for(let e=1;e<o.length;e++){let t=o[s],n=o[e],i=t.start+t.count,a=xe(n.start,r.width,4),c=xe(t.start,r.width,4);n.start<=i+1&&a===c&&xe(n.start+n.count-1,r.width,4)===a?t.count=Math.max(t.count,n.start+n.count-t.start):(++s,o[s]=n)}o.length=s+1;let c=n.getParameter(e.UNPACK_ROW_LENGTH),l=n.getParameter(e.UNPACK_SKIP_PIXELS),u=n.getParameter(e.UNPACK_SKIP_ROWS);n.pixelStorei(e.UNPACK_ROW_LENGTH,r.width);for(let t=0,s=o.length;t<s;t++){let s=o[t],c=Math.floor(s.start/4),l=Math.ceil(s.count/4),u=c%r.width,d=Math.floor(c/r.width),f=l;n.pixelStorei(e.UNPACK_SKIP_PIXELS,u),n.pixelStorei(e.UNPACK_SKIP_ROWS,d),n.texSubImage2D(e.TEXTURE_2D,0,u,d,f,1,i,a,r.data)}t.clearUpdateRanges(),n.pixelStorei(e.UNPACK_ROW_LENGTH,c),n.pixelStorei(e.UNPACK_SKIP_PIXELS,l),n.pixelStorei(e.UNPACK_SKIP_ROWS,u)}}function Ce(t,o,s){let c=e.TEXTURE_2D;(o.isDataArrayTexture||o.isCompressedArrayTexture)&&(c=e.TEXTURE_2D_ARRAY),o.isData3DTexture&&(c=e.TEXTURE_3D);let l=be(t,o),u=o.source;n.bindTexture(c,t.__webglTexture,e.TEXTURE0+s);let d=r.get(u);if(u.version!==d.__version||l===!0){if(n.activeTexture(e.TEXTURE0+s),!(typeof ImageBitmap<`u`&&o.image instanceof ImageBitmap)){let t=kt.getPrimaries(kt.workingColorSpace),r=o.colorSpace===``?null:kt.getPrimaries(o.colorSpace),i=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,i)}n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment);let t=D(o.image,!1,i.maxTextureSize);t=Fe(o,t);let r=a.convert(o.format,o.colorSpace),f=a.convert(o.type),p=j(o.internalFormat,r,f,o.normalized,o.colorSpace,o.isVideoTexture);ye(c,o);let m,h=o.mipmaps,g=o.isVideoTexture!==!0,_=d.__version===void 0||l===!0,v=u.dataReady,y=N(o,t);if(o.isDepthTexture)p=M(o.format===P,o.type),_&&(g?n.texStorage2D(e.TEXTURE_2D,1,p,t.width,t.height):n.texImage2D(e.TEXTURE_2D,0,p,t.width,t.height,0,r,f,null));else if(o.isDataTexture){if(h.length>0){g&&_&&n.texStorage2D(e.TEXTURE_2D,y,p,h[0].width,h[0].height);for(let t=0,i=h.length;t<i;t++)m=h[t],g?v&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,m.width,m.height,r,f,m.data):n.texImage2D(e.TEXTURE_2D,t,p,m.width,m.height,0,r,f,m.data);o.generateMipmaps=!1}else g?(_&&n.texStorage2D(e.TEXTURE_2D,y,p,t.width,t.height),v&&Se(o,t,r,f)):n.texImage2D(e.TEXTURE_2D,0,p,t.width,t.height,0,r,f,t.data)}else if(o.isCompressedTexture){if(o.isCompressedArrayTexture){g&&_&&n.texStorage3D(e.TEXTURE_2D_ARRAY,y,p,h[0].width,h[0].height,t.depth);for(let i=0,a=h.length;i<a;i++)if(m=h[i],o.format!==1023){if(r!==null){if(g){if(v){if(o.layerUpdates.size>0){let t=mo(m.width,m.height,o.format,o.type);for(let a of o.layerUpdates){let o=m.data.subarray(a*t/m.data.BYTES_PER_ELEMENT,(a+1)*t/m.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,a,m.width,m.height,1,r,o)}}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,m.width,m.height,t.depth,r,m.data)}}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,i,p,m.width,m.height,t.depth,0,m.data,0,0)}else V(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`)}else g?v&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,m.width,m.height,t.depth,r,f,m.data):n.texImage3D(e.TEXTURE_2D_ARRAY,i,p,m.width,m.height,t.depth,0,r,f,m.data);o.layerUpdates.size>0&&o.clearLayerUpdates()}else{g&&_&&n.texStorage2D(e.TEXTURE_2D,y,p,h[0].width,h[0].height);for(let t=0,i=h.length;t<i;t++)m=h[t],o.format===1023?g?v&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,m.width,m.height,r,f,m.data):n.texImage2D(e.TEXTURE_2D,t,p,m.width,m.height,0,r,f,m.data):r===null?V(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):g?v&&n.compressedTexSubImage2D(e.TEXTURE_2D,t,0,0,m.width,m.height,r,m.data):n.compressedTexImage2D(e.TEXTURE_2D,t,p,m.width,m.height,0,m.data)}}else if(o.isDataArrayTexture){if(g){if(_&&n.texStorage3D(e.TEXTURE_2D_ARRAY,y,p,t.width,t.height,t.depth),v){if(o.layerUpdates.size>0){let i=mo(t.width,t.height,o.format,o.type);for(let a of o.layerUpdates){let o=t.data.subarray(a*i/t.data.BYTES_PER_ELEMENT,(a+1)*i/t.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,a,t.width,t.height,1,r,f,o)}o.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,t.width,t.height,t.depth,r,f,t.data)}}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,p,t.width,t.height,t.depth,0,r,f,t.data)}else if(o.isData3DTexture)g?(_&&n.texStorage3D(e.TEXTURE_3D,y,p,t.width,t.height,t.depth),v&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,t.width,t.height,t.depth,r,f,t.data)):n.texImage3D(e.TEXTURE_3D,0,p,t.width,t.height,t.depth,0,r,f,t.data);else if(o.isFramebufferTexture){if(_){if(g)n.texStorage2D(e.TEXTURE_2D,y,p,t.width,t.height);else{let i=t.width,a=t.height;for(let t=0;t<y;t++)n.texImage2D(e.TEXTURE_2D,t,p,i,a,0,r,f,null),i>>=1,a>>=1}}}else if(o.isHTMLTexture){if(`texElementImage2D`in e){let n=e.canvas;if(n.hasAttribute(`layoutsubtree`)||n.setAttribute(`layoutsubtree`,`true`),t.parentNode!==n){n.appendChild(t),b.add(o),n.onpaint=e=>{let t=e.changedElements;for(let e of b)t.includes(e.image)&&(e.needsUpdate=!0)},n.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,t);else{let n=e.RGBA,r=e.RGBA,i=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,n,r,i,t)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(h.length>0){if(g&&_){let t=Ie(h[0]);n.texStorage2D(e.TEXTURE_2D,y,p,t.width,t.height)}for(let t=0,i=h.length;t<i;t++)m=h[t],g?v&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,r,f,m):n.texImage2D(e.TEXTURE_2D,t,p,r,f,m);o.generateMipmaps=!1}else if(g){if(_){let r=Ie(t);n.texStorage2D(e.TEXTURE_2D,y,p,r.width,r.height)}v&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,r,f,t)}else n.texImage2D(e.TEXTURE_2D,0,p,r,f,t);O(o)&&o.mipmapsAutoUpdate===!0&&k(c),d.__version=u.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function we(t,o,s){if(o.image.length!==6)return;let c=be(t,o),l=o.source;n.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+s);let u=r.get(l);if(l.version!==u.__version||c===!0){n.activeTexture(e.TEXTURE0+s);let t=kt.getPrimaries(kt.workingColorSpace),r=o.colorSpace===``?null:kt.getPrimaries(o.colorSpace),d=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,d);let f=o.isCompressedTexture||o.image[0].isCompressedTexture,p=o.image[0]&&o.image[0].isDataTexture,m=[];for(let e=0;e<6;e++)!f&&!p?m[e]=D(o.image[e],!0,i.maxCubemapSize):m[e]=p?o.image[e].image:o.image[e],m[e]=Fe(o,m[e]);let h=m[0],g=a.convert(o.format,o.colorSpace),_=a.convert(o.type),v=j(o.internalFormat,g,_,o.normalized,o.colorSpace),y=o.isVideoTexture!==!0,b=u.__version===void 0||c===!0,x=l.dataReady,S=N(o,h);ye(e.TEXTURE_CUBE_MAP,o);let C;if(o.isDepthTexture){if(v=M(o.format===P,o.type),b){if(y)n.texStorage2D(e.TEXTURE_CUBE_MAP,1,v,h.width,h.height);else for(let t=0;t<6;t++)n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,v,h.width,h.height,0,g,_,null)}}else if(f){y&&b&&n.texStorage2D(e.TEXTURE_CUBE_MAP,S,v,h.width,h.height);for(let t=0;t<6;t++){C=m[t].mipmaps;for(let r=0;r<C.length;r++){let i=C[r];o.format===1023?y?x&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,g,_,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,v,i.width,i.height,0,g,_,i.data):g===null?V(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):y?x&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,g,i.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,v,i.width,i.height,0,i.data)}}}else{if(C=o.mipmaps,y&&b){C.length>0&&S++;let t=Ie(m[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,S,v,t.width,t.height)}for(let t=0;t<6;t++)if(p){y?x&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,m[t].width,m[t].height,g,_,m[t].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,v,m[t].width,m[t].height,0,g,_,m[t].data);for(let r=0;r<C.length;r++){let i=C[r].image[t].image;y?x&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,i.width,i.height,g,_,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,v,i.width,i.height,0,g,_,i.data)}}else{y?x&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,g,_,m[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,v,g,_,m[t]);for(let r=0;r<C.length;r++){let i=C[r];y?x&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,g,_,i.image[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,v,g,_,i.image[t])}}}O(o)&&o.mipmapsAutoUpdate===!0&&k(e.TEXTURE_CUBE_MAP),u.__version=l.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function Te(t,i,o,c,l,u){let d=a.convert(o.format,o.colorSpace),f=a.convert(o.type),p=j(o.internalFormat,d,f,o.normalized,o.colorSpace),m=r.get(i),h=r.get(o);if(h.__renderTarget=i,!m.__hasExternalTextures){let t=Math.max(1,i.width>>u),r=Math.max(1,i.height>>u);l===e.TEXTURE_3D||l===e.TEXTURE_2D_ARRAY?n.texImage3D(l,u,p,t,r,i.depth,0,d,f,null):n.texImage2D(l,u,p,t,r,0,d,f,null)}n.bindFramebuffer(e.FRAMEBUFFER,t),B(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,c,l,h.__webglTexture,0,Ne(i)):(l===e.TEXTURE_2D||l>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&l<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,c,l,h.__webglTexture,u),n.bindFramebuffer(e.FRAMEBUFFER,null)}function Ee(t,n,r){if(e.bindRenderbuffer(e.RENDERBUFFER,t),n.depthBuffer){let i=n.depthTexture,a=i&&i.isDepthTexture?i.type:null,o=M(n.stencilBuffer,a),c=n.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;B(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Ne(n),o,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,Ne(n),o,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,o,n.width,n.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,c,e.RENDERBUFFER,t)}else{let t=n.textures;for(let i=0;i<t.length;i++){let o=t[i],c=a.convert(o.format,o.colorSpace),l=a.convert(o.type),u=j(o.internalFormat,c,l,o.normalized,o.colorSpace);B(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Ne(n),u,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,Ne(n),u,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,u,n.width,n.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function De(t,i,a){let o=i.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,t),!(i.depthTexture&&i.depthTexture.isDepthTexture))throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let c=r.get(i.depthTexture);c.__renderTarget=i;let l=o?i.depthTexture.image[0]:i.depthTexture.image;c.__webglTexture&&l.width===i.width&&l.height===i.height||(l.width=i.width,l.height=i.height,i.depthTexture.needsUpdate=!0),o?ge(i.depthTexture,0):pe(i.depthTexture,0);let u=c.__webglTexture,d=Ne(i),f=o?e.TEXTURE_CUBE_MAP_POSITIVE_X+a:e.TEXTURE_2D,p=i.depthTexture.format===1027?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(i.depthTexture.format===1026)B(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else if(i.depthTexture.format===1027)B(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function Oe(t){let i=r.get(t),a=t.isWebGLCubeRenderTarget===!0;if(i.__boundDepthTexture!==t.depthTexture){let e=t.depthTexture;if(i.__depthDisposeCallback&&i.__depthDisposeCallback(),e){let t=()=>{delete i.__boundDepthTexture,delete i.__depthDisposeCallback,e.removeEventListener(`dispose`,t)};e.addEventListener(`dispose`,t),i.__depthDisposeCallback=t}i.__boundDepthTexture=e}if(t.depthTexture&&!i.__autoAllocateDepthBuffer){if(a)for(let e=0;e<6;e++)De(i.__webglFramebuffer[e],t,e);else t.texture.mipmaps.length>0?De(i.__webglFramebuffer[0],t,0):De(i.__webglFramebuffer,t,0)}else if(a){i.__webglDepthbuffer=[];for(let r=0;r<6;r++)if(n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[r]),i.__webglDepthbuffer[r]===void 0)i.__webglDepthbuffer[r]=e.createRenderbuffer(),Ee(i.__webglDepthbuffer[r],t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,a=i.__webglDepthbuffer[r];e.bindRenderbuffer(e.RENDERBUFFER,a),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,a)}}else if(t.texture.mipmaps.length>0?n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer),i.__webglDepthbuffer===void 0)i.__webglDepthbuffer=e.createRenderbuffer(),Ee(i.__webglDepthbuffer,t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,r=i.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,r),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,r)}n.bindFramebuffer(e.FRAMEBUFFER,null)}function ke(t,n,i){let a=r.get(t);n!==void 0&&Te(a.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),i!==void 0&&Oe(t)}function Ae(t){let i=t.texture,s=r.get(t),c=r.get(i);t.addEventListener(`dispose`,ne),ee(t);let l=t.textures,u=t.isWebGLCubeRenderTarget===!0,d=l.length>1;if(d||(c.__webglTexture===void 0&&(c.__webglTexture=e.createTexture()),c.__version=i.version,o.memory.textures++),u){s.__webglFramebuffer=[];for(let t=0;t<6;t++)if(i.mipmaps.length>0){s.__webglFramebuffer[t]=[];for(let n=0;n<i.mipmaps.length;n++)s.__webglFramebuffer[t][n]=e.createFramebuffer()}else s.__webglFramebuffer[t]=e.createFramebuffer()}else{if(i.mipmaps.length>0){s.__webglFramebuffer=[];for(let t=0;t<i.mipmaps.length;t++)s.__webglFramebuffer[t]=e.createFramebuffer()}else s.__webglFramebuffer=e.createFramebuffer();if(d)for(let t=0,n=l.length;t<n;t++){let n=r.get(l[t]);n.__webglTexture===void 0&&(n.__webglTexture=e.createTexture(),o.memory.textures++)}if(t.samples>0&&B(t)===!1){s.__webglMultisampledFramebuffer=e.createFramebuffer(),s.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,s.__webglMultisampledFramebuffer);for(let n=0;n<l.length;n++){let r=l[n];s.__webglColorRenderbuffer[n]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,s.__webglColorRenderbuffer[n]);let i=a.convert(r.format,r.colorSpace),o=a.convert(r.type),c=j(r.internalFormat,i,o,r.normalized,r.colorSpace,t.isXRRenderTarget===!0),u=Ne(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,u,c,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n,e.RENDERBUFFER,s.__webglColorRenderbuffer[n])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(s.__webglDepthRenderbuffer=e.createRenderbuffer(),Ee(s.__webglDepthRenderbuffer,t,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(u){n.bindTexture(e.TEXTURE_CUBE_MAP,c.__webglTexture),ye(e.TEXTURE_CUBE_MAP,i);for(let n=0;n<6;n++)if(i.mipmaps.length>0)for(let r=0;r<i.mipmaps.length;r++)Te(s.__webglFramebuffer[n][r],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,r);else Te(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0);O(i)?k(e.TEXTURE_CUBE_MAP):i.mipmaps.length>0&&e.texParameteri(e.TEXTURE_CUBE_MAP,e.TEXTURE_MAX_LEVEL,i.mipmaps.length-1),n.unbindTexture()}else if(d){for(let i=0,a=l.length;i<a;i++){let a=l[i],o=r.get(a),c=e.TEXTURE_2D;(t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(c=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(c,o.__webglTexture),ye(c,a),Te(s.__webglFramebuffer,t,a,e.COLOR_ATTACHMENT0+i,c,0),O(a)&&k(c)}n.unbindTexture()}else{let r=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(r=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(r,c.__webglTexture),ye(r,i),i.mipmaps.length>0)for(let n=0;n<i.mipmaps.length;n++)Te(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,r,n);else Te(s.__webglFramebuffer,t,i,e.COLOR_ATTACHMENT0,r,0);O(i)?k(r):i.mipmaps.length>0&&e.texParameteri(r,e.TEXTURE_MAX_LEVEL,i.mipmaps.length-1),n.unbindTexture()}t.depthBuffer&&Oe(t)}function z(e){let t=e.textures;for(let i=0,a=t.length;i<a;i++){let a=t[i];if(O(a)&&a.mipmapsAutoUpdate===!0){let t=A(e),i=r.get(a).__webglTexture;n.bindTexture(t,i),k(t),n.unbindTexture()}}}let je=[];function Me(t){if(t.samples>0){if(B(t)===!1){let i=t.textures,a=t.width,o=t.height,s=e.COLOR_BUFFER_BIT,l=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,u=r.get(t),d=i.length>1;if(d)for(let t=0;t<i.length;t++)n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,u.__webglMultisampledFramebuffer),t.texture.mipmaps.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer);for(let n=0;n<i.length;n++){if(t.resolveDepthBuffer&&(t.depthBuffer&&(s|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&t.resolveStencilBuffer&&(s|=e.STENCIL_BUFFER_BIT)),d){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,u.__webglColorRenderbuffer[n]);let t=r.get(i[n]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,a,o,0,0,a,o,s,e.NEAREST),c===!0&&(je.length=0,je.push(e.COLOR_ATTACHMENT0+n),t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&je.push(l),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,je))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),d)for(let t=0;t<i.length;t++){n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,u.__webglColorRenderbuffer[t]);let a=r.get(i[t]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,a,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglMultisampledFramebuffer)}else if(t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&c){let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[n])}}}function Ne(e){return Math.min(i.maxSamples,e.samples)}function B(e){let n=r.get(e);return e.samples>0&&t.has(`WEBGL_multisampled_render_to_texture`)===!0&&n.__useRenderToTexture!==!1}function Pe(e){let t=o.render.frame;y.get(e)!==t&&(y.set(e,t),e.update())}function Fe(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(kt.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&V(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):it(`WebGLTextures: Unsupported texture color space:`,n)),t}function Ie(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(v.width=e.naturalWidth||e.width,v.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(v.width=e.displayWidth,v.height=e.displayHeight):(v.width=e.width,v.height=e.height),v}this.allocateTextureUnit=de,this.resetTextureUnits=ce,this.getTextureUnits=le,this.setTextureUnits=ue,this.setTexture2D=pe,this.setTexture2DArray=me,this.setTexture3D=he,this.setTextureCube=ge,this.rebindTextures=ke,this.setupRenderTarget=Ae,this.updateRenderTargetMipmap=z,this.updateMultisampleRenderTarget=Me,this.setupDepthRenderbuffer=Oe,this.setupFrameBufferTexture=Te,this.useMultisampledRTT=B,this.dispose=ae}function ml(e,t){function n(n,r=``){let i,a=kt.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(a===`srgb`){if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491){if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var hl=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,gl=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,_l=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Ii(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new na({vertexShader:hl,fragmentShader:gl,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new qr(new Gi(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},vl=class extends ct{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,s=1,c=null,l=null,u=null,d=null,f=null,p=null,m=typeof XRWebGLBinding<`u`,h=new _l,g={},_=t.getContextAttributes(),y=null,b=null,x=[],S=[],w=new bt,T=null,E=null,D=new Ba;D.viewport=new Bt;let k=new Ba;k.viewport=new Bt;let A=[D,k],j=new Ya,M=null,te=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=x[e];return t===void 0&&(t=new Sn,x[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=x[e];return t===void 0&&(t=new Sn,x[e]=t),t.getGripSpace()},this.getHand=function(e){let t=x[e];return t===void 0&&(t=new Sn,x[e]=t),t.getHandSpace()};function F(e){let t=S.indexOf(e.inputSource);if(t===-1)return;let n=x[t];n!==void 0&&(n.update(e.inputSource,e.frame,c||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function ne(){r.removeEventListener(`select`,F),r.removeEventListener(`selectstart`,F),r.removeEventListener(`selectend`,F),r.removeEventListener(`squeeze`,F),r.removeEventListener(`squeezestart`,F),r.removeEventListener(`squeezeend`,F),r.removeEventListener(`end`,ne),r.removeEventListener(`inputsourceschange`,re);for(let e=0;e<x.length;e++){let t=S[e];t!==null&&(S[e]=null,x[e].disconnect(t))}M=null,te=null,h.reset();for(let e in g)delete g[e];if(e.setRenderTarget(y),f=null,d=null,u=null,r=null,b=null,I.stop(),n.isPresenting=!1,e.setPixelRatio(T),e.setSize(w.width,w.height,!1),E!==null){let e=E.camera;e.fov=E.fov,e.zoom=E.zoom,e.updateProjectionMatrix(),E=null}n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&V(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&V(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(e){c=e},this.getBaseLayer=function(){return d===null?f:d},this.getBinding=function(){return u===null&&m&&(u=new XRWebGLBinding(r,t)),u},this.getFrame=function(){return p},this.getSession=function(){return r},this.setSession=async function(l){if(r=l,r!==null){if(y=e.getRenderTarget(),r.addEventListener(`select`,F),r.addEventListener(`selectstart`,F),r.addEventListener(`selectend`,F),r.addEventListener(`squeeze`,F),r.addEventListener(`squeezestart`,F),r.addEventListener(`squeezeend`,F),r.addEventListener(`end`,ne),r.addEventListener(`inputsourceschange`,re),_.xrCompatible!==!0&&await t.makeXRCompatible(),T=e.getPixelRatio(),e.getSize(w),m&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,o=null;_.depth&&(o=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=_.stencil?P:ee,a=_.stencil?O:C);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};u=this.getBinding(),d=u.createProjectionLayer(s),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),b=new Ht(d.textureWidth,d.textureHeight,{format:N,type:v,depthTexture:new Pi(d.textureWidth,d.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let n={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:i};f=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),b=new Ht(f.framebufferWidth,f.framebufferHeight,{format:N,type:v,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(s),c=null,a=await r.requestReferenceSpace(o),I.setContext(r),I.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return h.getDepthTexture()};function re(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=S.indexOf(n);r>=0&&(S[r]=null,x[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=S.indexOf(n);if(r===-1){for(let e=0;e<x.length;e++)if(e>=S.length){S.push(n),r=e;break}else if(S[e]===null){S[e]=n,r=e;break}if(r===-1)break}let i=x[r];i&&i.connect(n)}}function ie(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;h.texture!==null&&(h.depthNear>0&&(t=h.depthNear),h.depthFar>0&&(n=h.depthFar)),j.near=k.near=D.near=t,j.far=k.far=D.far=n,(M!==j.near||te!==j.far)&&(r.updateRenderState({depthNear:j.near,depthFar:j.far}),M=j.near,te=j.far),j.layers.mask=e.layers.mask|6,D.layers.mask=j.layers.mask&-5,k.layers.mask=j.layers.mask&-3;let i=e.parent,a=j.cameras;ie(j,i);for(let e=0;e<a.length;e++)ie(a[e],i);j.projectionMatrix.copy(D.projectionMatrix),j.projectionMatrixInverse.copy(D.projectionMatrixInverse),E===null&&e.isPerspectiveCamera&&(E={camera:e,fov:e.fov,zoom:e.zoom}),ae(e,j,i)};function ae(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=dt*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return j},this.getFoveation=function(){if(d!==null||f!==null)return s},this.setFoveation=function(e){s=e,d!==null&&(d.fixedFoveation=e),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=e)},this.hasDepthSensing=function(){return h.texture!==null},this.getDepthSensingMesh=function(){return h.getMesh(j)},this.getCameraTexture=function(e){return g[e]};let oe=null;function se(t,i){if(l=i.getViewerPose(c||a),p=i,l!==null){let t=l.views;f!==null&&(e.setRenderTargetFramebuffer(b,f.framebuffer),e.setRenderTarget(b));let i=!1;t.length!==j.cameras.length&&(j.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(f!==null)a=f.getViewport(r);else{let t=u.getViewSubImage(d,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(b,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(b))}let o=A[n];o===void 0&&(o=new Ba,o.layers.enable(n),o.viewport=new Bt,A[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(j.matrix.copy(o.matrix),j.matrix.decompose(j.position,j.quaternion,j.scale)),i===!0&&j.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&m){u=n.getBinding();let e=u.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&h.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&m){e.state.unbindTexture(),u=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=g[n];e||(e=new Ii,g[n]=e);let t=u.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<x.length;e++){let t=S[e],n=x[e];t!==null&&n!==void 0&&n.update(t,i,c||a)}oe&&oe(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),p=null}let I=new go;I.setAnimationLoop(se),this.setAnimationLoop=function(e){oe=e},this.dispose=function(){}}},yl=new Gt,bl=new wt;bl.set(-1,0,0,0,1,0,0,0,1);function xl(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,Qi(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(yl.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(bl),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.diffuseRoughness>0&&(e.diffuseRoughness.value=t.diffuseRoughness,t.diffuseRoughnessMap&&(e.diffuseRoughnessMap.value=t.diffuseRoughnessMap,n(t.diffuseRoughnessMap,e.diffuseRoughnessMapTransform))),t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.retroreflectivity>0&&(e.retroreflectivity.value=t.retroreflectivity),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessMinimum,e.iridescenceThicknessMaximum.value=t.iridescenceThicknessMaximum,t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function Sl(e,t,n,r){let i={},a={};function o(e,t){let n=t.program;r.uniformBlockBinding(e,n,i[e.id])}function s(e,n){let o=i[e.id];o===void 0&&(m(e),o=c(e),i[e.id]=o,e.addEventListener(`dispose`,g));let s=n.program;r.updateUBOMapping(e,s);let u=t.render.frame;a[e.id]!==u&&(l(e),a[e.id]=u)}function c(t){let n=e.createBuffer(),r=t.__size,i=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,n),e.bufferData(e.UNIFORM_BUFFER,r,i),e.bindBuffer(e.UNIFORM_BUFFER,null),n}function l(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++)u(t[n],e,n,a);else u(t,e,0,a)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function u(t,n,r,i){if(f(t,n,r,i)===!0){let n=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let n=0;n<r.length;n++){let i=r[n],a=h(i,!0);d(i,t.__data,e),e+=a.storage/Float32Array.BYTES_PER_ELEMENT}}else d(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,n,t.__data)}}function d(e,t,n){typeof e==`number`||typeof e==`boolean`?t[n]=e:e.isMatrix3?(t[n]=e.elements[0],t[n+1]=e.elements[1],t[n+2]=e.elements[2],t[n+3]=0,t[n+4]=e.elements[3],t[n+5]=e.elements[4],t[n+6]=e.elements[5],t[n+7]=0,t[n+8]=e.elements[6],t[n+9]=e.elements[7],t[n+10]=e.elements[8],t[n+11]=0):ArrayBuffer.isView(e)?t.set(e.subarray(0,t.length-n),n):e.toArray(t,n)}function f(e,t,n,r){let i=e.value,a=t+`_`+n;if(Array.isArray(i)){r[a]===void 0&&(r[a]=[]);let e=r[a],t=!1;for(let n=0;n<i.length;n++)p(i[n],e,n)===!0&&(t=!0);return t}return p(i,r,a)}function p(e,t,n){if(t[n]===void 0)return t[n]=typeof e==`number`||typeof e==`boolean`?e:ArrayBuffer.isView(e)?e.slice():e.clone(),!0;{let r=t[n];if(typeof e==`number`||typeof e==`boolean`){if(r!==e)return t[n]=e,!0}else if(ArrayBuffer.isView(e))return!0;else if(r.equals(e)===!1)return r.copy(e),!0}return!1}function m(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let i=0,a=r.length;i<a;i++){let a=r[i],o=Array.isArray(a.value)?a.value:[a.value],s=Array.isArray(t[e])||Array.isArray(a.value),c=n;for(let e=0,t=o.length;e<t;e++){let t=o[e],r=h(t,s),i=n%16,a=i%r.boundary,l=i+a;n+=a,l!==0&&16-l<r.storage&&(n+=16-l),e===0&&(c=n),n+=r.storage}a.__data=new(a.type===`int`?Int32Array:a.type===`uint`?Uint32Array:Float32Array)((n-c)/Float32Array.BYTES_PER_ELEMENT),a.__offset=c}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function h(e,t){let n={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(n.boundary=4,n.storage=4):e.isVector2?(n.boundary=8,n.storage=8):e.isVector3||e.isColor?(n.boundary=16,n.storage=12):e.isVector4?(n.boundary=16,n.storage=16):e.isMatrix3?(n.boundary=16,n.storage=48):e.isMatrix4?(n.boundary=16,n.storage=64):e.isTexture?V(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(n.boundary=16,n.storage=e.byteLength):V(`WebGLRenderer: Unsupported uniform value type.`,e),t===!0&&(n.boundary=16,n.storage=Math.ceil(n.storage/16)*16),n}function g(t){let n=t.target;n.removeEventListener(`dispose`,g),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function _(){for(let t in i)e.deleteBuffer(i[t]);i={},a={}}return{bind:o,update:s,dispose:_}}var Cl=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),wl=null;function Tl(){return wl===null&&(wl=new Xr(Cl,16,16,ne,T),wl.name=`DFG_LUT`,wl.minFilter=h,wl.magFilter=h,wl.wrapS=u,wl.wrapT=u,wl.generateMipmaps=!1,wl.needsUpdate=!0),wl}var El=class{constructor(e={}){let{canvas:t=et(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:c=!1,powerPreference:l=`default`,failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=v}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);p=n.getContextAttributes().alpha}else p=a;let m=f,h=new Set([ie,re,F]),g=new Set([v,C,x,O,E,D]),y=new Uint32Array(4),b=new Int32Array(4),S={textures:[],min:[],max:[],resolution:[]},w=null,k=null,A=[],j=[],M=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let N=this,ee=!1,P=null,te=null,ne=null,ae=null;this._outputColorSpace=We;let oe=0,se=0,I=null,L=-1,ce=null,le=new Bt,ue=new Bt,de=null,fe=new U(0),pe=0,me=t.width,he=t.height,ge=1,_e=null,ve=null,R=new Bt(0,0,me,he),ye=new Bt(0,0,me,he),be=!1,xe=new li,Se=new di,Ce=!1,we=!1,Te=new Gt,Ee=new H,De=new Bt,Oe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},ke=!1;function Ae(){return I===null?ge:1}let z=n;function je(e,n){return t.getContext(e,n)}let Me,Ne,B,Pe,Fe,Ie,Le,Re,ze,Be,Ve,He,Ue,Ge,Ke,qe,Je,Ye,Ze,Qe,$e,tt,rt;try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:c,powerPreference:l,failIfMajorPerformanceCaveat:u};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r187`),t.addEventListener(`webglcontextlost`,ct,!1),t.addEventListener(`webglcontextrestored`,lt,!1),t.addEventListener(`webglcontextcreationerror`,ut,!1),z===null){let t=`webgl2`;if(z=je(t,e),z===null)throw je(t)?Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}at()}catch(e){throw t.removeEventListener(`webglcontextlost`,ct,!1),t.removeEventListener(`webglcontextrestored`,lt,!1),t.removeEventListener(`webglcontextcreationerror`,ut,!1),it(`WebGLRenderer: `+e.message),e}function at(){Me=new Ko(z),Me.init(),$e=new ml(z,Me),Ne=new Eo(z,Me,e,$e),B=new fl(z,Me),Ne.reversedDepthBuffer&&d&&B.buffers.depth.setReversed(!0),te=z.createFramebuffer(),ne=z.createFramebuffer(),ae=z.createFramebuffer(),Pe=new Yo(z),Fe=new Kc,Ie=new pl(z,Me,B,Fe,Ne,$e,Pe),Le=new Go(N),Re=new _o(z),tt=new wo(z,Re),ze=new qo(z,Re,Pe,tt),Be=new Zo(z,ze,Re,tt,Pe),Ye=new Xo(z,Ne,Ie),Ke=new Do(Fe),Ve=new Gc(N,Le,Me,Ne,tt,Ke),He=new xl(N,Fe),Ue=new Xc,Ge=new rl(Me),Je=new Co(N,Le,B,Be,p,s),qe=new dl(N,Be,Ne),rt=new Sl(z,Pe,Ne,B),Ze=new To(z,Me,Pe),Qe=new Jo(z,Me,Pe),Pe.programs=Ve.programs,N.capabilities=Ne,N.extensions=Me,N.properties=Fe,N.renderLists=Ue,N.shadowMap=qe,N.state=B,N.info=Pe}m!==1009&&(M=new $o(m,t.width,t.height,o,r,i));let st=new vl(N,z);this.xr=st,this.getContext=function(){return z},this.getContextAttributes=function(){return z.getContextAttributes()},this.forceContextLoss=function(){let e=Me.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=Me.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return ge},this.setPixelRatio=function(e){e!==void 0&&(ge=e,this.setSize(me,he,!1))},this.getSize=function(e){return e.set(me,he)},this.setSize=function(e,n,r=!0){st.isPresenting?V(`WebGLRenderer: Can't change size while VR device is presenting.`):(me=e,he=n,t.width=Math.floor(e*ge),t.height=Math.floor(n*ge),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),M!==null&&M.setSize(t.width,t.height),this.setViewport(0,0,e,n))},this.getDrawingBufferSize=function(e){return e.set(me*ge,he*ge).floor()},this.setDrawingBufferSize=function(e,n,r){me=e,he=n,ge=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(m===1009)it(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);else{if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){V(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}M.setEffects(e||[])}},this.getCurrentViewport=function(e){return e.copy(le)},this.getViewport=function(e){return e.copy(R)},this.setViewport=function(e,t,n,r){e.isVector4?R.set(e.x,e.y,e.z,e.w):R.set(e,t,n,r),B.viewport(le.copy(R).multiplyScalar(Ae()).round())},this.getScissor=function(e){return e.copy(ye)},this.setScissor=function(e,t,n,r){e.isVector4?ye.set(e.x,e.y,e.z,e.w):ye.set(e,t,n,r),B.scissor(ue.copy(ye).multiplyScalar(Ae()).round())},this.getScissorTest=function(){return be},this.setScissorTest=function(e){B.setScissorTest(be=e)},this.setOpaqueSort=function(e){_e=e},this.setTransparentSort=function(e){ve=e},this.getClearColor=function(e){return e.copy(Je.getClearColor())},this.setClearColor=function(){Je.setClearColor(...arguments)},this.getClearAlpha=function(){return Je.getClearAlpha()},this.setClearAlpha=function(){Je.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(I!==null){let t=I.texture.format;e=h.has(t)}if(e){let e=I.texture.type,t=g.has(e),n=Je.getClearColor(),r=Je.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(y[0]=i,y[1]=a,y[2]=o,y[3]=r,z.clearBufferuiv(z.COLOR,0,y)):(b[0]=i,b[1]=a,b[2]=o,b[3]=r,z.clearBufferiv(z.COLOR,0,b))}else r|=z.COLOR_BUFFER_BIT}t&&(r|=z.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=z.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&z.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),P=e},this.dispose=function(){t.removeEventListener(`webglcontextlost`,ct,!1),t.removeEventListener(`webglcontextrestored`,lt,!1),t.removeEventListener(`webglcontextcreationerror`,ut,!1),Je.dispose(),Ue.dispose(),Ge.dispose(),Ie.dispose(),Fe.dispose(),Le.dispose(),Be.dispose(),ze.dispose(),tt.dispose(),rt.dispose(),Ve.dispose(),st.dispose(),st.removeEventListener(`sessionstart`,_t),st.removeEventListener(`sessionend`,vt),yt.stop()};function ct(e){e.preventDefault(),nt(`WebGLRenderer: Context Lost.`),ee=!0}function lt(){nt(`WebGLRenderer: Context Restored.`),ee=!1;let e=Pe.autoReset,t=qe.enabled,n=qe.autoUpdate,r=qe.needsUpdate,i=qe.type;at(),Pe.autoReset=e,qe.enabled=t,qe.autoUpdate=n,qe.needsUpdate=r,qe.type=i}function ut(e){it(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function dt(e){let t=e.target;t.removeEventListener(`dispose`,dt),ft(t)}function ft(e){pt(e),Fe.remove(e)}function pt(e){let t=Fe.get(e).programs;t!==void 0&&(t.forEach(function(e){Ve.releaseProgram(e)}),e.isShaderMaterial&&Ve.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=Oe);let o=i.isMesh&&i.matrixWorld.determinantAffine()<0,s=jt(e,t,n,r,i);B.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=ze.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;tt.setup(i,r,s,n,c);let h,g=Ze;if(c!==null&&(h=Re.get(c),g=Qe,g.setIndex(h)),i.isMesh)r.wireframe===!0?(B.setLineWidth(r.wireframeLinewidth*Ae()),g.setMode(z.LINES)):g.setMode(z.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),B.setLineWidth(e*Ae()),i.isLineSegments?g.setMode(z.LINES):i.isLineLoop?g.setMode(z.LINE_LOOP):g.setMode(z.LINE_STRIP)}else i.isPoints?g.setMode(z.POINTS):i.isSprite&&g.setMode(z.TRIANGLES);if(i.isBatchedMesh){if(Me.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?Re.get(c).bytesPerElement:1,o=Fe.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(z,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function mt(e,t,n,r){P!==null&&e.isNodeMaterial&&P.setObject(r,e),Ce===!0&&Ke.setState(e,n,!1),e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,Et(e,t,r),e.side=0,e.needsUpdate=!0,Et(e,t,r),e.side=2):Et(e,t,r)}this.compile=function(e,t,n=null){n===null&&(n=e),P!==null&&P.renderStart(e,t,n),k=Ge.get(n),k.init(t),j.push(k),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(k.pushLight(e),e.castShadow&&k.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(k.pushLight(e),e.castShadow&&k.pushShadow(e))}),k.setupLights(),P!==null&&P.updateLights(k.state.lightsArray),we=this.localClippingEnabled,Ce=Ke.init(this.clippingPlanes,we),Ce===!0&&Ke.setGlobalState(this.clippingPlanes,t),P!==null&&qe.render(k.state.shadowsArray,n,t);let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let i=e.material;if(i){if(Array.isArray(i))for(let a=0;a<i.length;a++){let o=i[a];mt(o,n,t,e),r.add(o)}else mt(i,n,t,e),r.add(i)}}),k=j.pop(),P!==null&&P.renderEnd(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){r.forEach(function(e){let t=Fe.get(e).currentProgram;(t===void 0||t.isReady())&&r.delete(e)}),r.size===0?t(e):setTimeout(n,10)}Me.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let ht=null;function gt(e){ht&&ht(e)}function _t(){yt.stop()}function vt(){yt.start()}let yt=new go;yt.setAnimationLoop(gt),typeof self<`u`&&yt.setContext(self),this.setAnimationLoop=function(e){ht=e,st.setAnimationLoop(e),e===null?yt.stop():yt.start()},st.addEventListener(`sessionstart`,_t),st.addEventListener(`sessionend`,vt),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){it(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(ee===!0)return;P!==null&&P.renderStart(e,t);let n=st.enabled===!0&&st.isPresenting===!0,r=M!==null&&(I===null||n)&&M.begin(N,I);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),st.enabled===!0&&st.isPresenting===!0&&(M===null||M.isCompositing()===!1)&&(st.cameraAutoUpdate===!0&&st.updateCamera(t),t=st.getCamera()),e.isScene===!0&&e.onBeforeRender(N,e,t,I),k=Ge.get(e,j.length),k.init(t),k.state.textureUnits=Ie.getTextureUnits(),j.push(k),Te.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),t.isArrayCamera?Se.setFromArrayCamera(t):xe.setFromProjectionMatrix(Te,Xe,t.reversedDepth),we=this.localClippingEnabled,Ce=Ke.init(this.clippingPlanes,we),w=Ue.get(e,A.length),w.init(),A.push(w),this.info.render.frame++,st.enabled===!0&&st.isPresenting===!0){let e=N.xr.getDepthSensingMesh();e!==null&&bt(e,t,-1/0,N.sortObjects)}bt(e,t,0,N.sortObjects),w.finish(),P!==null&&P.updateLights(k.state.lightsArray),N.sortObjects===!0&&w.sort(_e,ve),ke=st.enabled===!1||st.isPresenting===!1||st.hasDepthSensing()===!1,ke&&Je.addToRenderList(w,e),this.info.autoReset===!0&&this.info.reset(),Ce===!0&&Ke.beginShadows();let i=k.state.shadowsArray;if(qe.render(i,e,t),Ce===!0&&Ke.endShadows(),(r&&M.hasRenderPass())===!1){let n=w.opaque,r=w.transmissive;if(k.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];St(n,r,e,a)}ke&&Je.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];xt(w,e,n,n.viewport)}}else r.length>0&&St(n,r,e,t),ke&&Je.render(e),xt(w,e,t)}I!==null&&se===0&&(Ie.updateMultisampleRenderTarget(I),Ie.updateRenderTargetMipmap(I)),r&&M.end(N),e.isScene===!0&&e.onAfterRender(N,e,t),tt.resetDefaultState(),L=-1,ce=null,j.pop(),j.length>0?(k=j[j.length-1],Ie.setTextureUnits(k.state.textureUnits),Ce===!0&&Ke.setGlobalState(N.clippingPlanes,k.state.camera)):k=null,A.pop(),w=A.length>0?A[A.length-1]:null,P!==null&&P.renderEnd()};function bt(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLight)k.pushLight(e),e.castShadow&&k.pushShadow(e);else if(e.isSprite){let i=t.isArrayCamera?Se:xe;if(!e.frustumCulled||e.intersectsFrustum(i)){r&&De.setFromMatrixPosition(e.matrixWorld).applyMatrix4(Te);let i=Be.update(e),a=e.material;a.visible&&w.push(e,i,a,n,De.z,null,t)}}else if(e.isMesh||e.isLine||e.isPoints){let i=t.isArrayCamera?Se:xe;if(!e.frustumCulled||e.intersectsFrustum(i)){let i=Be.update(e),a=e.material;if(r&&(e.boundingSphere===void 0?(i.boundingSphere===null&&i.computeBoundingSphere(),De.copy(i.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),De.copy(e.boundingSphere.center)),De.applyMatrix4(e.matrixWorld).applyMatrix4(Te)),Array.isArray(a)){let r=i.groups;for(let o=0,s=r.length;o<s;o++){let s=r[o],c=a[s.materialIndex];c&&c.visible&&w.push(e,i,c,n,De.z,s,t)}}else a.visible&&w.push(e,i,a,n,De.z,null,t)}}}let i=e.children;for(let e=0,a=i.length;e<a;e++)bt(i[e],t,n,r)}function xt(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;k.setupLightsView(n),Ce===!0&&Ke.setGlobalState(N.clippingPlanes,n),r&&B.viewport(le.copy(r)),i.length>0&&Ct(i,t,n),a.length>0&&Ct(a,t,n),o.length>0&&Ct(o,t,n),B.buffers.depth.setTest(!0),B.buffers.depth.setMask(!0),B.buffers.color.setMask(!0),B.setPolygonOffset(!1)}function St(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(k.state.transmissionRenderTarget[r.id]===void 0){let e=Me.has(`EXT_color_buffer_half_float`)||Me.has(`EXT_color_buffer_float`);k.state.transmissionRenderTarget[r.id]=new Ht(1,1,{generateMipmaps:!0,type:e?T:v,minFilter:_,samples:Math.max(4,Ne.samples),stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:kt.workingColorSpace})}let a=k.state.transmissionRenderTarget[r.id],o=r.viewport||le;a.setSize(o.z*N.transmissionResolutionScale,o.w*N.transmissionResolutionScale);let s=N.getRenderTarget(),c=N.getActiveCubeFace(),l=N.getActiveMipmapLevel();N.setRenderTarget(a),N.getClearColor(fe),pe=N.getClearAlpha(),pe<1&&N.setClearColor(16777215,.5),N.clear(),ke&&Je.render(n);let u=N.toneMapping;N.toneMapping=0;let d=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),k.setupLightsView(r),Ce===!0&&Ke.setGlobalState(N.clippingPlanes,r),Ct(e,n,r),Ie.updateMultisampleRenderTarget(a),Ie.updateRenderTargetMipmap(a),Me.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,wt(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(Ie.updateMultisampleRenderTarget(a),Ie.updateRenderTargetMipmap(a))}N.setRenderTarget(s,c,l),N.setClearColor(fe,pe),d!==void 0&&(r.viewport=d),N.toneMapping=u}function Ct(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&wt(o,t,n,s,l,c)}}function wt(e,t,n,r,i,a){P!==null&&i.isNodeMaterial&&P.setObject(e,i),e.onBeforeRender(N,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(N,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,N.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,N.renderBufferDirect(n,t,r,i,e,a),i.side=2):N.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(N,t,n,r,i,a)}function Tt(e){let t=0;for(let n of e)n.texture!==null&&t++;return t}function Et(e,t,n){t.isScene!==!0&&(t=Oe);let r=Fe.get(e),i=k.state.lights,a=k.state.shadowsArray,o=i.state.version,s=Ve.getParameters(e,i.state,a,t,n,k.state.lightProbeGridArray),c=Ve.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=Le.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,dt),l=new Map,r.programs=l,r.programVariants=new Map);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return At(e,s),d}else s.uniforms=Ve.getUniforms(e),P!==null&&e.isNodeMaterial&&P.build(e,n,s),e.onBeforeCompile(s,N),d=Ve.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=Ke.uniform),At(e,s),r.needsLights=Nt(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.sunLights.value=i.state.sun,f.sunLightShadows.value=i.state.sunShadow,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.sunShadowMatrix.value=i.state.sunShadowMatrix,f.sunShadowCascade.value=i.state.sunShadowCascade,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.numLightProbeGrids=Tt(k.state.lightProbeGridArray),r.currentProgram=d,r.uniformsList=null,d}function Dt(e,t,n,r,i){let a=Fe.get(e),o=a.currentProgram.id+`,`+r+`,`+i,s=a.programVariants.get(o);return s===void 0?(s=Et(e,t,n),a.programVariants.set(o,s)):(a.currentProgram=s,a.uniformsList=null,a.outputColorSpace=r,a.toneMapping=i),s}function Ot(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=cc.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function At(e,t){let n=Fe.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function jt(e,t,n,r,i){t.isScene!==!0&&(t=Oe),Ie.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=I===null?N.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:kt.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=Le.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(h=N.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=Fe.get(r),y=k.state.lights;if(Ce===!0&&(we===!0||e!==ce)){let t=e===ce&&r.id===L;Ke.setState(r,e,t)}let b=!1,x=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==y.state.version||i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i._colorsTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i._colorsTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?b=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==Ke.numPlanes||v.numIntersection!==Ke.numIntersection)?b=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.morphTargetsCount===_&&v.numLightProbeGrids===Tt(k.state.lightProbeGridArray)?(v.outputColorSpace!==s||v.toneMapping!==h)&&(x=!0):b=!0:b=!0:(b=!0,v.__version=r.version);let C=v.currentProgram;(b===!0||x===!0)&&(C=x===!0?Dt(r,t,i,s,h):Et(r,t,i),P&&r.isNodeMaterial&&P.onUpdateProgram(r,C,v));let w=!1,T=!1,E=!1,D=C.getUniforms(),O=v.uniforms;if(B.useProgram(C.program)&&(w=!0,T=!0,E=!0),r.id!==L&&(L=r.id,T=!0),w||ce!==e){B.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),D.setValue(z,`projectionMatrix`,e.projectionMatrix),D.setValue(z,`viewMatrix`,e.matrixWorldInverse);let t=D.map.cameraPosition;t!==void 0&&t.setValue(z,Ee.setFromMatrixPosition(e.matrixWorld)),Ne.logarithmicDepthBuffer&&D.setValue(z,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&D.setValue(z,`isOrthographic`,e.isOrthographicCamera===!0),ce!==e&&(ce=e,T=!0,E=!0)}if(v.needsLights&&(y.state.sunShadowMap.length>0&&D.setValue(z,`sunShadowMap`,y.state.sunShadowMap,Ie),y.state.directionalShadowMap.length>0&&D.setValue(z,`directionalShadowMap`,y.state.directionalShadowMap,Ie),y.state.spotShadowMap.length>0&&D.setValue(z,`spotShadowMap`,y.state.spotShadowMap,Ie),y.state.pointShadowMap.length>0&&D.setValue(z,`pointShadowMap`,y.state.pointShadowMap,Ie)),i.isSkinnedMesh){D.setOptional(z,i,`bindMatrix`),D.setOptional(z,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),D.setValue(z,`boneTexture`,e.boneTexture,Ie))}i.isBatchedMesh&&(D.setOptional(z,i,`batchingTexture`),D.setValue(z,`batchingTexture`,i._matricesTexture,Ie),D.setOptional(z,i,`batchingIdTexture`),D.setValue(z,`batchingIdTexture`,i._indirectTexture,Ie),D.setOptional(z,i,`batchingColorTexture`),i._colorsTexture!==null&&D.setValue(z,`batchingColorTexture`,i._colorsTexture,Ie));let A=n.morphAttributes;if((A.position!==void 0||A.normal!==void 0||A.color!==void 0)&&Ye.update(i,n,C),(T||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,D.setValue(z,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(O.envMapIntensity.value=t.environmentIntensity),O.dfgLUT!==void 0&&(O.dfgLUT.value=Tl()),T){if(D.setValue(z,`toneMappingExposure`,N.toneMappingExposure),v.needsLights&&Mt(O,E),a&&r.fog===!0&&He.refreshFogUniforms(O,a),He.refreshMaterialUniforms(O,r,ge,he,k.state.transmissionRenderTarget[e.id]),v.needsLights&&v.numLightProbeGrids>0){let e=S,t=0;for(let n of k.state.lightProbeGridArray)n.texture!==null&&(e.textures[t]=n.texture,e.min[t]=n.boundingBox.min,e.max[t]=n.boundingBox.max,e.resolution[t]=n.resolution,t++);for(let n in e)e[n].length=t;O.probesSH.value=e.textures,O.probesMin.value=e.min,O.probesMax.value=e.max,O.probesResolution.value=e.resolution}cc.upload(z,Ot(v),O,Ie)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(cc.upload(z,Ot(v),O,Ie),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&D.setValue(z,`center`,i.center),D.setValue(z,`modelViewMatrix`,i.modelViewMatrix),D.setValue(z,`normalMatrix`,i.normalMatrix),D.setValue(z,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];rt.update(n,C),rt.bind(n,C)}}return C}function Mt(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.sunLights.needsUpdate=t,e.sunLightShadows.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function Nt(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return oe},this.getActiveMipmapLevel=function(){return se},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(e,t,n){let r=Fe.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),Fe.get(e.texture).__webglTexture=t,Fe.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=Fe.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){I=e,oe=t,se=n;let r=null,i=!1,a=!1;if(e){let o=Fe.get(e);if(o.__useDefaultFramebuffer!==void 0){B.bindFramebuffer(z.FRAMEBUFFER,o.__webglFramebuffer),le.copy(e.viewport),ue.copy(e.scissor),de=e.scissorTest,B.viewport(le),B.scissor(ue),B.setScissorTest(de),L=-1;return}if(o.__webglFramebuffer===void 0)Ie.setupRenderTarget(e);else if(o.__hasExternalTextures)Ie.rebindTextures(e,Fe.get(e.texture).__webglTexture,Fe.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&Fe.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);Ie.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=Fe.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&Ie.useMultisampledRTT(e)===!1?Fe.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,le.copy(e.viewport),ue.copy(e.scissor),de=e.scissorTest}else le.copy(R).multiplyScalar(ge).floor(),ue.copy(ye).multiplyScalar(ge).floor(),de=be;if(n!==0&&(r=te),B.bindFramebuffer(z.FRAMEBUFFER,r)&&B.drawBuffers(e,r),B.viewport(le),B.scissor(ue),B.setScissorTest(de),i){let r=Fe.get(e.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=Fe.get(e.textures[t]);z.framebufferTextureLayer(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=Fe.get(e.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,t.__webglTexture,n)}L=-1};function Pt(e){let t=Fe.get(e);return(t.__readFormat!==e.format||t.__readType!==e.type)&&(t.__readFormat=e.format,t.__readType=e.type,t.__formatReadable=Ne.textureFormatReadable(e.format),t.__typeReadable=Ne.textureTypeReadable(e.type)),t}this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){it(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=Fe.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o],Array.isArray(c)&&(c=c[0])),c){B.bindFramebuffer(z.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;e.textures.length>1&&z.readBuffer(z.COLOR_ATTACHMENT0+s);let u=Pt(o);if(u.__formatReadable===!1){it(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(u.__typeReadable===!1){it(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&z.readPixels(t,n,r,i,$e.convert(c),$e.convert(l),a)}finally{let e=I===null?null:Fe.get(I).__webglFramebuffer;B.bindFramebuffer(z.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=Fe.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o],Array.isArray(c)&&(c=c[0])),c){if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){B.bindFramebuffer(z.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;e.textures.length>1&&z.readBuffer(z.COLOR_ATTACHMENT0+s);let d=Pt(o);if(d.__formatReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(d.__typeReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let f=z.createBuffer();z.bindBuffer(z.PIXEL_PACK_BUFFER,f),z.bufferData(z.PIXEL_PACK_BUFFER,a.byteLength,z.STREAM_READ),z.readPixels(t,n,r,i,$e.convert(l),$e.convert(u),0),z.bindBuffer(z.PIXEL_PACK_BUFFER,null);let p=I===null?null:Fe.get(I).__webglFramebuffer;B.bindFramebuffer(z.FRAMEBUFFER,p);let m=z.fenceSync(z.SYNC_GPU_COMMANDS_COMPLETE,0);return z.flush(),await ot(z,m,4),z.bindBuffer(z.PIXEL_PACK_BUFFER,f),z.getBufferSubData(z.PIXEL_PACK_BUFFER,0,a),z.bindBuffer(z.PIXEL_PACK_BUFFER,null),z.deleteBuffer(f),z.deleteSync(m),a}throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)}},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;Ie.setTexture2D(e,0),z.copyTexSubImage2D(z.TEXTURE_2D,n,0,0,o,s,i,a),B.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=$e.convert(t.format),_=$e.convert(t.type),v;t.isData3DTexture?(Ie.setTexture3D(t,0),v=z.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(Ie.setTexture2DArray(t,0),v=z.TEXTURE_2D_ARRAY):(Ie.setTexture2D(t,0),v=z.TEXTURE_2D),B.activeTexture(z.TEXTURE0),B.pixelStorei(z.UNPACK_FLIP_Y_WEBGL,t.flipY),B.pixelStorei(z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),B.pixelStorei(z.UNPACK_ALIGNMENT,t.unpackAlignment);let y=B.getParameter(z.UNPACK_ROW_LENGTH),b=B.getParameter(z.UNPACK_IMAGE_HEIGHT),x=B.getParameter(z.UNPACK_SKIP_PIXELS),S=B.getParameter(z.UNPACK_SKIP_ROWS),C=B.getParameter(z.UNPACK_SKIP_IMAGES);B.pixelStorei(z.UNPACK_ROW_LENGTH,h.width),B.pixelStorei(z.UNPACK_IMAGE_HEIGHT,h.height),B.pixelStorei(z.UNPACK_SKIP_PIXELS,l),B.pixelStorei(z.UNPACK_SKIP_ROWS,u),B.pixelStorei(z.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=Fe.get(e),r=Fe.get(t),h=Fe.get(n.__renderTarget),g=Fe.get(r.__renderTarget);B.bindFramebuffer(z.READ_FRAMEBUFFER,h.__webglFramebuffer),B.bindFramebuffer(z.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,Fe.get(e).__webglTexture,i,d+n),z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,Fe.get(t).__webglTexture,a,m+n)),z.blitFramebuffer(l,u,l+o,u+s,f,p,f+o,p+s,z.DEPTH_BUFFER_BIT,z.NEAREST);B.bindFramebuffer(z.READ_FRAMEBUFFER,null),B.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||Fe.has(e)){let n=Fe.get(e),r=Fe.get(t);B.bindFramebuffer(z.READ_FRAMEBUFFER,ne),B.bindFramebuffer(z.DRAW_FRAMEBUFFER,ae);for(let e=0;e<c;e++)w?z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):z.framebufferTexture2D(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,n.__webglTexture,i),T?z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):z.framebufferTexture2D(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,r.__webglTexture,a),i===0?T?z.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):z.copyTexSubImage2D(v,a,f,p,l,u,o,s):z.blitFramebuffer(l,u,l+o,u+s,f,p,f+o,p+s,z.COLOR_BUFFER_BIT,z.NEAREST);B.bindFramebuffer(z.READ_FRAMEBUFFER,null),B.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?z.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?z.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):z.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?z.texSubImage2D(z.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?z.compressedTexSubImage2D(z.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):z.texSubImage2D(z.TEXTURE_2D,a,f,p,o,s,g,_,h);B.pixelStorei(z.UNPACK_ROW_LENGTH,y),B.pixelStorei(z.UNPACK_IMAGE_HEIGHT,b),B.pixelStorei(z.UNPACK_SKIP_PIXELS,x),B.pixelStorei(z.UNPACK_SKIP_ROWS,S),B.pixelStorei(z.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps===!0&&t.mipmapsAutoUpdate===!0&&z.generateMipmap(v),B.unbindTexture()},this.initRenderTarget=function(e){Fe.get(e).__webglFramebuffer===void 0&&Ie.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?Ie.setTextureCube(e,0):e.isData3DTexture?Ie.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?Ie.setTexture2DArray(e,0):Ie.setTexture2D(e,0),B.unbindTexture()},this.resetState=function(){oe=0,se=0,I=null,B.reset(),tt.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return Xe}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=kt._getDrawingBufferColorSpace(e),t.unpackColorSpace=kt._getUnpackColorSpace()}},Dl=new Map,G={on(e,t){return Dl.has(e)||Dl.set(e,new Set),Dl.get(e).add(t),()=>Dl.get(e).delete(t)},emit(e,t){let n=Dl.get(e);n&&[...n].forEach(e=>e(t))}};function Ol(){return!!(document.fullscreenEnabled||document.webkitFullscreenEnabled)}function kl(){return!!(document.fullscreenElement||document.webkitFullscreenElement)}async function Al(){if(!Ol()||kl())return!1;let e=document.documentElement;try{e.requestFullscreen?await e.requestFullscreen({navigationUI:`hide`}):e.webkitRequestFullscreen&&e.webkitRequestFullscreen()}catch{return!1}try{await screen.orientation?.lock?.(`landscape`)}catch{}return!0}function jl(e){document.addEventListener(`fullscreenchange`,e),document.addEventListener(`webkitfullscreenchange`,e)}var Ml=typeof matchMedia<`u`&&matchMedia(`(pointer: coarse)`).matches,Nl=new Set,Pl={dx:0,dy:0},Fl={enabled:!1,move:{x:0,y:0},touchMove:{x:0,y:0},takeLook(){let e={dx:Pl.dx,dy:Pl.dy};return Pl.dx=0,Pl.dy=0,e},update(){let e=0,t=0;(Nl.has(`KeyW`)||Nl.has(`ArrowUp`))&&(t+=1),(Nl.has(`KeyS`)||Nl.has(`ArrowDown`))&&--t,(Nl.has(`KeyD`)||Nl.has(`ArrowRight`))&&(e+=1),(Nl.has(`KeyA`)||Nl.has(`ArrowLeft`))&&--e,e+=this.touchMove.x,t+=this.touchMove.y;let n=Math.hypot(e,t);n>1&&(e/=n,t/=n),this.move.x=this.enabled?e:0,this.move.y=this.enabled?t:0,this.enabled||this.takeLook()},setEnabled(e){this.enabled=e,e||(Nl.clear(),document.pointerLockElement&&document.exitPointerLock()),G.emit(`input:enabled`,e)}},Il=null;function Ll(e){Il=e,window.addEventListener(`keydown`,e=>{e.target instanceof HTMLInputElement||e.target instanceof HTMLTextAreaElement||(e.code===`Tab`?(e.preventDefault(),G.emit(`input:tablet`)):e.code===`Escape`?G.emit(`input:pause`):e.code===`KeyC`?G.emit(`input:compare`):e.code===`Backquote`?(e.preventDefault(),G.emit(`input:console`)):Fl.enabled&&(e.code===`KeyQ`?G.emit(`input:switch`):e.code===`KeyE`||e.code===`Enter`?G.emit(`input:interact`):Nl.add(e.code)))}),window.addEventListener(`keyup`,e=>Nl.delete(e.code)),window.addEventListener(`blur`,()=>Nl.clear()),Il.addEventListener(`click`,()=>{if(!Ml&&Fl.enabled&&!document.pointerLockElement)try{Il.requestPointerLock?.()?.catch?.(()=>{})}catch{}}),document.addEventListener(`mousemove`,e=>{document.pointerLockElement===Il&&Fl.enabled&&(Pl.dx+=e.movementX,Pl.dy+=e.movementY)}),Ml&&Rl()}function Rl(){let e=document.getElementById(`ui`),t=document.createElement(`div`);t.className=`touch-layer`,t.innerHTML=`
    <div class="joy" data-joy><div class="joy-knob"></div></div>
    <button class="tbtn-palm" data-act aria-label="Действие"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6.6" y="4.2" width="2.6" height="10" rx="1.3"/><rect x="9.7" y="2.6" width="2.6" height="11" rx="1.3"/><rect x="12.8" y="3.1" width="2.6" height="11" rx="1.3"/><rect x="15.9" y="5.2" width="2.6" height="9" rx="1.3"/><rect x="6.6" y="10.2" width="11.9" height="10.6" rx="4.2"/><rect x="3.9" y="10.4" width="2.6" height="7.4" rx="1.3" transform="rotate(-32 5.2 14.1)"/></svg></button>
    <button class="tbtn tbtn-tab" data-tab>Планшет</button>
    <button class="tbtn tbtn-pause" data-pause aria-label="Пауза">II</button>
    <button class="tbtn tbtn-fs hidden" data-fs aria-label="На весь экран">⛶</button>
    <button class="tbtn tbtn-switch hidden" data-switch>Сборка</button>
    <button class="tbtn tbtn-compare hidden" data-compare>Таблица</button>
    <button class="tbtn tbtn-console hidden" data-console>Консоль</button>`,e.appendChild(t);let n=t.querySelector(`[data-joy]`),r=t.querySelector(`.joy-knob`),i=null,a=null,o=null,s=null,c=t.querySelector(`[data-act]`),l=t.querySelector(`[data-tab]`),u=t.querySelector(`[data-fs]`),d=()=>u.classList.toggle(`hidden`,!Ol()||kl());d(),jl(d),u.addEventListener(`touchend`,e=>{e.preventDefault(),e.stopPropagation(),Al().then(d)});let f=t.querySelector(`[data-switch]`),p=t.querySelector(`[data-compare]`);G.on(`touch:ch2`,e=>{f.classList.toggle(`hidden`,!e),p.classList.toggle(`hidden`,!e)});let m=t.querySelector(`[data-console]`);G.on(`touch:ch3`,e=>m.classList.toggle(`hidden`,!e)),m.addEventListener(`touchstart`,e=>{e.preventDefault(),e.stopPropagation(),G.emit(`input:console`)}),f.addEventListener(`touchstart`,e=>{e.preventDefault(),e.stopPropagation(),Fl.enabled&&G.emit(`input:switch`)}),p.addEventListener(`touchstart`,e=>{e.preventDefault(),e.stopPropagation(),G.emit(`input:compare`)}),t.querySelector(`[data-pause]`).addEventListener(`touchstart`,e=>{e.preventDefault(),e.stopPropagation(),G.emit(`input:pause`)}),c.addEventListener(`touchstart`,e=>{e.preventDefault(),e.stopPropagation(),Fl.enabled&&G.emit(`input:interact`)}),l.addEventListener(`touchstart`,e=>{e.preventDefault(),e.stopPropagation(),G.emit(`input:tablet`)}),t.classList.toggle(`hidden`,!Fl.enabled),G.on(`input:enabled`,e=>t.classList.toggle(`hidden`,!e)),G.on(`prompt`,e=>{c.classList.toggle(`ready`,!!e),c.setAttribute(`aria-label`,e||`Действие`)}),Il.addEventListener(`touchstart`,e=>{if(Fl.enabled){for(let t of e.changedTouches)t.clientX<window.innerWidth*.45&&i===null?(i=t.identifier,a={x:t.clientX,y:t.clientY},n.style.left=`${t.clientX-60}px`,n.style.top=`${t.clientY-60}px`,n.classList.add(`on`)):o===null&&(o=t.identifier,s={x:t.clientX,y:t.clientY});e.preventDefault()}},{passive:!1}),Il.addEventListener(`touchmove`,e=>{for(let t of e.changedTouches)if(t.identifier===i){let e=t.clientX-a.x,n=t.clientY-a.y,i=Math.hypot(e,n);i>50&&(e=e/i*50,n=n/i*50),r.style.transform=`translate(${e}px, ${n}px)`,Fl.touchMove.x=e/50,Fl.touchMove.y=-n/50}else t.identifier===o&&(Pl.dx+=(t.clientX-s.x)*2.2,Pl.dy+=(t.clientY-s.y)*2.2,s={x:t.clientX,y:t.clientY});e.preventDefault()},{passive:!1});let h=e=>{for(let t of e.changedTouches)t.identifier===i?(i=null,Fl.touchMove.x=0,Fl.touchMove.y=0,r.style.transform=``,n.classList.remove(`on`)):t.identifier===o&&(o=null)};Il.addEventListener(`touchend`,h),Il.addEventListener(`touchcancel`,h)}var zl=1.6,Bl=.3,Vl=2.8,Hl=Ml?.0042:.0024,Ul=class{constructor(e){this.camera=e,this.pos=new H,this.yaw=0,this.pitch=0,this.colliders=[],this.stillTime=0,this.bob=0,e.rotation.order=`YXZ`}place({x:e,z:t,yaw:n=0}){this.pos.set(e,0,t),this.yaw=n,this.pitch=0,this.stillTime=0,this.apply()}update(e){let{dx:t,dy:n}=Fl.takeLook();this.yaw-=t*Hl,this.pitch-=n*Hl,this.pitch=Math.max(-1.35,Math.min(1.35,this.pitch));let{x:r,y:i}=Fl.move;if(r!==0||i!==0){let t=Math.sin(this.yaw),n=Math.cos(this.yaw),a=(r*n-i*t)*Vl*e,o=(-r*t-i*n)*Vl*e;this.moveAxis(a,0),this.moveAxis(0,o),this.stillTime=0,this.bob+=e*9}else this.stillTime+=e;this.apply()}moveAxis(e,t){let n=this.pos.x+e,r=this.pos.z+t;for(let e of this.colliders)if(e.enabled!==!1&&n+Bl>e.minX&&n-Bl<e.maxX&&r+Bl>e.minZ&&r-Bl<e.maxZ)return;this.pos.x=n,this.pos.z=r}apply(){let e=Math.sin(this.bob)*.025;this.camera.position.set(this.pos.x,zl+e,this.pos.z),this.camera.rotation.set(this.pitch,this.yaw,0)}snapshot(){return{x:+this.pos.x.toFixed(2),z:+this.pos.z.toFixed(2),yaw:+this.yaw.toFixed(3)}}},Wl=2.6,Gl=new lo,Kl=new bt(0,0),ql=class{constructor(e){this.camera=e,this.slots=[],this.handlers={},this.meshes=[],this.current=null,this.lastLabel=null,G.on(`input:interact`,()=>this.use())}setSlots(e){this.slots=e,this.meshes=[];for(let t of e)t.object.traverse(e=>{e.isMesh&&(e.userData.interactId=t.id,this.meshes.push(e))});this.current=null}setHandlers(e){this.handlers=e}update(){let e=null;if(Fl.enabled){Gl.setFromCamera(Kl,this.camera),Gl.far=Wl;let t=Gl.intersectObjects(this.meshes,!1);for(let n of t){if(!n.object.visible||!Jl(n.object))continue;let t=n.object.userData.interactId,r=this.handlers[t];r&&(!r.enabled||r.enabled())&&(e=t);break}}this.current=e;let t=e?this.handlers[e]:null,n=t?typeof t.label==`function`?t.label():t.label:null;n!==this.lastLabel&&(this.lastLabel=n,G.emit(`prompt`,n))}use(){if(!this.current||!Fl.enabled)return;let e=this.handlers[this.current];e&&e.onUse()}};function Jl(e){for(let t=e;t;t=t.parent)if(!t.visible)return!1;return!0}var Yl=Ml?``:`[E] `,Xl={onInit:null,standalone:window.parent===window},Zl=(e,t={})=>!Xl.standalone&&window.parent.postMessage({ns:1,type:e,...t},location.origin);window.addEventListener(`message`,e=>{e.origin===location.origin&&e.data?.ns===1&&(e.data.type===`init`?Xl.onInit?.(e.data):Xl[e.data.type]?.(e.data))}),Xl.ready=(e,t)=>{Zl(`ready`,{gameId:e,version:t}),Xl.standalone&&setTimeout(()=>Xl.onInit?.({playerId:`dev`,nickname:`Тест`,difficulty:`normal`,save:null,flags:{},muted:!1}),0)},Xl.save=e=>Zl(`save`,{data:e}),Xl.flag=(e,t)=>Zl(`flag`,{key:e,value:t}),Xl.progress=(e,t)=>Zl(`progress`,{step:e,percent:t}),Xl.achievement=e=>Zl(`achievement`,{id:e}),Xl.end=e=>Zl(`end`,e),Xl.exit=()=>Zl(`exit`),window.NS=Xl;var Ql=`glitch`,$l=`0.1.0`,eu=65536,tu=window.NS,nu=null,ru=-1,iu={standalone:tu.standalone,waitInit(){return new Promise(e=>{tu.onInit=t=>e(t),tu.ready(Ql,$l)})},onCommand({pause:e,resume:t,mute:n}){tu.pause=()=>e?.(),tu.resume=()=>t?.(),tu.mute=e=>n?.(!!e?.muted)},save(e){clearTimeout(nu),nu=setTimeout(()=>tu.save(au(e)),400)},saveNow(e){clearTimeout(nu),tu.save(au(e))},flag(e,t){tu.flag(e,t)},progress(e,t){t<=ru||(ru=t,tu.progress(e,t))},resetProgress(){ru=-1},achievement(e){tu.achievement(e)},end(e){tu.end(e)},exit(){tu.exit()}};function au(e){let t=JSON.parse(JSON.stringify(e)),n=JSON.stringify(t).length;for(;n>eu&&(t.log.length>5||t.chat.length>5);)t.log=t.log.slice(Math.floor(t.log.length/2)),t.chat=t.chat.slice(Math.floor(t.chat.length/2)),n=JSON.stringify(t).length;return t}var ou={enter_station:`Запустил сборку 0.9.7`,talk_lis:`Поговорил с Лисом`,take_lantern:`Взял фонарь`,return_lantern:`Повесил фонарь на крюк`,open_archive:`Открыл дверь архива`,enter_archive:`Вошёл в архив`,exit_archive:`Вышел из архива`,inspect_journal:`Осмотрел журнал путешественников`,inspect_clock:`Осмотрел часы`,inspect_bench:`Осмотрел скамейку`,try_service_door:`Попробовал открыть служебный выход`,use_terminal:`Открыл терминал дежурного`,inspect_wall:`Осмотрел стену архива`,door_other_side:`Дверь открыта с другой стороны`},su=[`take_lantern`,`enter_archive`,`exit_archive`],cu=`glitch_save_v1`,lu=40,uu={easy:{id:`easy`,label:`Лёгкая`,note:`Ромб показывает путь, Ирина подсказывает сама, больше времени`,hints:1/0,autoHints:!0,autoHintDelay:12,markers:!0,strict:!1,shiftSec:900,shiftSec2:1080,shiftSec3:1080,shiftSec4:840,rowsNeeded:4,mistakesForStar:2},normal:{id:`normal`,label:`Обычная`,note:`Ромб показывает путь, подсказки Ирины без ограничений`,hints:1/0,autoHints:!0,autoHintDelay:30,markers:!0,strict:!1,shiftSec:600,shiftSec2:780,shiftSec3:780,shiftSec4:600,rowsNeeded:4,mistakesForStar:1},hard:{id:`hard`,label:`Сложная`,note:`Без ромба и подсказок, меньше времени, шаги в отчёте без лишнего`,hints:0,autoHints:!1,autoHintDelay:0,markers:!1,strict:!0,shiftSec:420,shiftSec2:540,shiftSec3:540,shiftSec4:420,rowsNeeded:5,mistakesForStar:0}},K={state:null,platformFlags:{},muted:!1};function du(e,t){return K.state={v:1,chapter:1,name:e,difficulty:uu[t]?t:`normal`,scene:`office`,pos:null,flags:{},decisions:{},log:[],reports:[],evidence:{},chat:[],hintsUsed:0,mistakes:0,playTime:0,achievements:{},startedAt:Date.now()},yu(),K.state}function fu(e,t,n){return!e||e.v!==1||![1,2,3,4].includes(e.chapter)?null:(K.state={decisions:{},mistakes:0,playTime:0,achievements:{},hintsUsed:0,...e,name:t,difficulty:uu[n]?n:e.difficulty||`normal`},K.state)}function pu(){let e=K.state;return e.prev=e.prev||{},e.prev[1]={flags:e.flags,ending:e.ending||null,playTime:e.playTime||0,mistakes:e.mistakes||0,hintsUsed:e.hintsUsed||0},e.chapter=2,e.flags={},e.scene=`diagnostic`,e.pos=null,e.playTime=0,e.mistakes=0,e.hintsUsed=0,e.ending=null,e.ch2={build:`0.9.7`,obs:{},hasSwitcher:!1},yu(),e}function mu(){let e=K.state;return e.prev=e.prev||{},e.prev[2]={flags:e.flags,ending:e.ending||null,playTime:e.playTime||0,mistakes:e.mistakes||0,hintsUsed:e.hintsUsed||0,ch2:e.ch2},e.chapter=3,e.flags={},e.scene=`office`,e.pos=null,e.playTime=0,e.mistakes=0,e.hintsUsed=0,e.ending=null,delete e.ch2,e.ch3=_u(),yu(),e}function hu(){let e=K.state;return e.prev=e.prev||{},e.prev[3]={flags:e.flags,ending:e.ending||null,playTime:e.playTime||0,mistakes:e.mistakes||0,hintsUsed:e.hintsUsed||0},e.chapter=4,e.flags={},e.scene=`office`,e.pos=null,e.playTime=0,e.mistakes=0,e.hintsUsed=0,e.ending=null,delete e.ch3,e.ch4=gu(),yu(),e}function gu(){return{evidence:{},verdicts:{},to:null,rec:null,savedLis:null}}function _u(){return{traces:{},verdicts:{},evidence:{},reloads:0,lisAfterReload:0,runs:{with:!1,without:!1},autotestRuns:0,timelineTries:0}}function vu(){return uu[K.state?.difficulty]||uu.normal}function yu(e=!0){if(K.state){if(iu.standalone)try{localStorage.setItem(cu,JSON.stringify(K.state))}catch{}e&&iu.save(K.state)}}function bu(){try{let e=JSON.parse(localStorage.getItem(cu));if(e&&e.v===1)return e}catch{}return null}function xu(){try{localStorage.removeItem(cu)}catch{}}function q(e){return!!K.state?.flags[e]}function J(e,t=!0){K.state.flags[e]!==t&&(K.state.flags[e]=t,G.emit(`flag`,{k:e,v:t}),yu())}function Su(e,t){K.state.decisions[e]!==t&&(K.state.decisions[e]=t,iu.flag(e,t),yu())}function Cu(e){return!K.state.achievements[e]&&(K.state.achievements[e]=!0,iu.achievement(e),G.emit(`achievement`,e),yu(),!0)}function wu(e,{foreign:t=!1,text:n}={}){let r={id:e,text:n||ou[e]||e,t:Date.now(),foreign:t};return K.state.log.push(r),K.state.log.length>lu&&K.state.log.shift(),G.emit(`log`,r),yu(!1),r}function Tu(e){return!K.state.evidence[e]&&(K.state.evidence[e]=!0,G.emit(`evidence`,e),yu(),!0)}function Eu(e,t){let n={from:e,text:t,t:Date.now()};return K.state.chat.push(n),K.state.chat.length>60&&K.state.chat.shift(),G.emit(`chat`,n),yu(!1),n}var Y=null,Du=null,Ou=null,ku=!1,Au=.6;function ju(){if(Y){Y.state===`suspended`&&Y.resume();return}let e=window.AudioContext||window.webkitAudioContext;e&&(Y=new e,Du=Y.createGain(),Du.gain.value=ku?0:Au,Du.connect(Y.destination))}function Mu(e){ku=!!e,Du&&Du.gain.setTargetAtTime(ku?0:Au,Y.currentTime,.05)}function Nu(){return ku}function Pu(e){Y&&(e&&Y.state===`running`&&Y.suspend(),!e&&Y.state===`suspended`&&Y.resume())}function Fu(e,t,n,r,i){e.gain.setValueAtTime(1e-4,t),e.gain.exponentialRampToValueAtTime(i,t+n),e.gain.exponentialRampToValueAtTime(1e-4,t+n+r)}function Iu(e,t,n=`sine`,r=.2,i=0){if(!Y)return;let a=Y.currentTime+i,o=Y.createOscillator(),s=Y.createGain();o.type=n,o.frequency.setValueAtTime(e,a),Fu(s,a,.01,t,r),o.connect(s).connect(Du),o.start(a),o.stop(a+t+.05)}function Lu(e,t=.2,n=1200,r=0,i=1){if(!Y)return;let a=Y.currentTime+r,o=Math.floor(Y.sampleRate*e),s=Y.createBuffer(1,o,Y.sampleRate),c=s.getChannelData(0);for(let e=0;e<o;e++)c[e]=Math.random()*2-1;let l=Y.createBufferSource();l.buffer=s;let u=Y.createBiquadFilter();u.type=`bandpass`,u.frequency.value=n,u.Q.value=i;let d=Y.createGain();Fu(d,a,.005,e,t),l.connect(u).connect(d).connect(Du),l.start(a)}var X={click(){Lu(.05,.5,2500,0,4),Iu(1800,.03,`square`,.05)},ui(){Iu(880,.06,`triangle`,.08)},message(){Iu(660,.08,`sine`,.12),Iu(990,.12,`sine`,.1,.08)},pickup(){Iu(520,.08,`triangle`,.12),Iu(780,.1,`triangle`,.1,.06)},door(){Lu(.6,.25,300,0,2),Iu(90,.5,`sawtooth`,.04)},locked(){Lu(.08,.4,800,0,3),Lu(.08,.4,700,.1,3)},glitch(){if(Y){for(let e=0;e<6;e++)Iu(200+Math.random()*1600,.05,`square`,.06,e*.04);Lu(.3,.15,4e3,0,.5)}},success(){[523,659,784].forEach((e,t)=>Iu(e,.18,`triangle`,.1,t*.09))},fail(){Iu(220,.25,`square`,.06),Iu(180,.3,`square`,.06,.15)},clickBehind(){if(!Y)return;let e=Y.createStereoPanner?Y.createStereoPanner():null,t=Y.currentTime,n=Math.floor(Y.sampleRate*.12),r=Y.createBuffer(1,n,Y.sampleRate),i=r.getChannelData(0);for(let e=0;e<n;e++)i[e]=(Math.random()*2-1)*Math.exp(-e/(n*.08));let a=Y.createBufferSource();a.buffer=r;let o=Y.createGain();o.gain.value=.9,e?(e.pan.value=-.4,a.connect(o).connect(e).connect(Du)):a.connect(o).connect(Du),a.start(t),Lu(1.2,.08,200,.15,1)}};function Ru(e){if(!Y)return;if(Ou){let e=Ou;e.g.gain.setTargetAtTime(1e-4,Y.currentTime,.4),setTimeout(()=>e.oscs.forEach(e=>e.stop()),1500),Ou=null}if(!e)return;let t=Y.createGain();t.gain.value=1e-4,t.connect(Du);let n=(e===`office`?[60,120.5]:[48,72.3,96.1]).map(e=>{let n=Y.createOscillator();return n.type=`sine`,n.frequency.value=e,n.connect(t),n.start(),n});t.gain.setTargetAtTime(e===`office`?.025:.04,Y.currentTime,1.5),Ou={g:t,oscs:n}}function zu(){if(!Y)return()=>{};let e=Y.currentTime,t=Y.createGain();t.gain.setValueAtTime(1e-4,e),t.gain.exponentialRampToValueAtTime(.55,e+2.5);let n=Y.createBiquadFilter();n.type=`lowpass`,n.frequency.value=2200;let r=Y.createDelay(1);r.delayTime.value=.38;let i=Y.createGain();i.gain.value=.3,r.connect(i).connect(r),n.connect(t),n.connect(r),r.connect(t),t.connect(Du);let a=e=>440*2**((e-69)/12),o=[[57,60,64],[53,57,60],[48,52,55],[55,59,62]],s=3.6,c=[],l=(e,t,r,i,a,o)=>{let s=Y.createOscillator();s.type=e,s.frequency.value=t;let l=Y.createGain();l.gain.setValueAtTime(1e-4,r),l.gain.linearRampToValueAtTime(a,r+o),l.gain.exponentialRampToValueAtTime(1e-4,r+i),s.connect(l).connect(n),s.start(r),s.stop(r+i+.05),c.push(s)},u=e+.1;for(let e=0;e<10;e++){let t=o[e%4],n=u+e*s;t.forEach(e=>l(`triangle`,a(e),n,4.4,.035,1.2)),l(`sine`,a(t[0]-12),n,s,.07,.3),[t[0]+12,t[1]+12,t[2]+12,t[1]+12,t[2]+12,t[0]+24].forEach((e,t)=>l(`sine`,a(e),n+s/6*t,.9,.03,.02))}let d=!1;return function(){if(d)return;d=!0;let e=Y.currentTime;t.gain.cancelScheduledValues(e),t.gain.setTargetAtTime(1e-4,e,.35),setTimeout(()=>{c.forEach(e=>{try{e.stop()}catch{}}),t.disconnect()},1800)}}var Bu={irina:`Ирина Белова`,timur:`Тимур Сафин`,system:`Система`,lis:`Лис`,nikita:`Никита Орлов`};function Vu(e){let t=document.createElement(`div`);t.className=`hud`,t.innerHTML=`
    <div class="crosshair"></div>
    <div class="prompt hidden"></div>
    <div class="hud-tl">
      <div class="objective hidden"><small>Задача</small><span></span></div>
      <div class="shift-timer hidden"></div>
    </div>
    <div class="toasts"></div>
    <div class="keys-hint ${Ml?`hidden`:``}"><b>WASD</b> ходить · <b>E</b> действие · <b>Tab</b> планшет · <b>Esc</b> пауза</div>
    <div class="build-badge hidden"></div>
    <div class="glitch-fx"></div>`,e.appendChild(t);let n=t.querySelector(`.crosshair`),r=t.querySelector(`.prompt`),i=t.querySelector(`.objective`),a=i.querySelector(`span`),o=t.querySelector(`.toasts`),s=t.querySelector(`.glitch-fx`),c=t.querySelector(`.shift-timer`),l=t.querySelector(`.build-badge`),u=``;function d(){let e=document.querySelector(`.tb-panel`);if(!e)return;let t=e.querySelector(`.tb-guide`);if(!u){t?.remove();return}t||(t=document.createElement(`div`),t.className=`tb-guide`,e.insertBefore(t,e.querySelector(`.tb-body`)));let n=u.replace(/(Планшет \([^)]*\)|«Планшет»),\s*/,``);n=n.charAt(0).toUpperCase()+n.slice(1),t.textContent!==`Задача: ${n}`&&(t.textContent=`Задача: ${n}`)}G.on(`tablet:open`,d),G.on(`prompt`,e=>{n.classList.toggle(`on`,!!e),e?(r.textContent=Yl+e,r.classList.remove(`hidden`)):r.classList.add(`hidden`)});let f={el:t,show(e){t.classList.toggle(`hidden`,!e)},setBuild(e){l.classList.toggle(`hidden`,!e),e&&(l.textContent=`Сборка ${e}`,l.dataset.b=e)},setTimer(e){if(e==null){c.classList.add(`hidden`);return}c.classList.remove(`hidden`);let t=e<0,n=Math.max(0,Math.ceil(e)),r=t?`Смена закончилась`:`До конца смены ${Math.floor(n/60)}:${String(n%60).padStart(2,`0`)}`;c.textContent!==r&&(c.textContent=r),c.classList.toggle(`over`,t)},setObjective(e){u=e||``,d(),e?(a.textContent=e,i.classList.remove(`hidden`)):i.classList.add(`hidden`)},toast(e,{from:t=null,kind:n=``,ms:r=5200}={}){let i=document.createElement(`div`);for(i.className=`toast ${n}`,i.innerHTML=t?`<div class="from"></div><div class="txt"></div>`:`<div class="txt"></div>`,t&&(i.querySelector(`.from`).textContent=Bu[t]||t),i.querySelector(`.txt`).textContent=e,o.appendChild(i);o.children.length>3;)o.firstChild.remove();setTimeout(()=>{i.classList.add(`out`),setTimeout(()=>i.remove(),350)},r)},glitch({sound:e=!0}={}){s.classList.remove(`on`),s.offsetWidth,s.classList.add(`on`);let t=document.getElementById(`view`);t.classList.remove(`shake`),t.offsetWidth,t.classList.add(`shake`),e&&X.glitch()}},p=!1;return G.on(`tablet:open`,()=>p=!0),G.on(`tablet:close`,()=>p=!1),G.on(`chat`,e=>{X.message(),p||f.toast(e.text,{from:e.from,ms:7e3})}),f}var Hu={irina:`Ирина`,timur:`Тимур`,lis:`Лис`,nikita:`Никита`,me:`Ты`,system:``};function Uu(e){let t=document.createElement(`div`);t.className=`dialogue hidden`,t.innerHTML=`<button class="dlg-x" aria-label="Выйти из разговора" title="Выйти (Esc)">×</button><div class="speaker"></div><div class="line"></div><div class="options"></div><div class="next"></div>`,e.appendChild(t);let n=t.querySelector(`.speaker`),r=t.querySelector(`.line`),i=t.querySelector(`.options`),a=t.querySelector(`.next`),o=null,s=null,c=!1,l=null,u=-1e9;function d(e){return String(e).replaceAll(`{name}`,K.state?.name||`стажёр`)}let f=null;function p(e){return new Promise(t=>{let n=0;r.textContent=``,clearInterval(o);let i=()=>{clearInterval(o),o=null,f=null,r.textContent=e,t()};f=i,o=setInterval(()=>{n+=2,r.textContent=e.slice(0,n),n>=e.length&&i()},16)})}function m(){if(c){if(o)f?.();else if(s){let e=s;s=null,e()}}}t.querySelector(`.dlg-x`).addEventListener(`click`,e=>{e.stopPropagation(),l?.()}),t.addEventListener(`click`,e=>{e.target.closest(`.opt`)||e.target.closest(`.dlg-x`)||m()});let h=0;window.addEventListener(`keydown`,e=>{if(!c||e.repeat)return;if(e.code===`Escape`){e.preventDefault(),u=performance.now(),l?.();return}(e.code===`Space`||e.code===`KeyE`||e.code===`Enter`)&&(e.preventDefault(),performance.now()-h>150&&m());let t=parseInt(e.key,10);if(t>=1&&t<=9){let e=i.children[t-1];e&&e.click()}});async function g(e){let t=e.who||`system`;return n.textContent=Hu[t]??t,n.className=`speaker ${t}`,i.innerHTML=``,a.textContent=``,await p(d(e.text)),e.options?.length?new Promise(t=>{e.options.forEach((e,n)=>{let r=document.createElement(`button`);r.className=`opt`,r.innerHTML=`<span class="n">${n+1}</span><span></span>`,r.lastChild.textContent=d(e.text),r.addEventListener(`click`,n=>{n.stopPropagation(),X.ui(),i.innerHTML=``,e.onPick?.(),t(e.next||[])}),i.appendChild(r)})}):(a.textContent=Ml?`нажмите, чтобы продолжить`:`E или клик: дальше`,new Promise(e=>{s=()=>e([])}))}async function _(e){c=!0,h=performance.now(),t.classList.remove(`hidden`),G.emit(`dialogue:open`);let n={},r=new Promise(e=>l=()=>e(n)),a=[...e],u=!0;for(;a.length;){let e=a.shift();if(e.run){await e.run();continue}let t=await Promise.race([g(e),r]);if(t===n){u=!1;break}a.unshift(...t)}return clearInterval(o),o=null,f=null,s=null,l=null,i.innerHTML=``,c=!1,t.classList.add(`hidden`),G.emit(`dialogue:close`),u}return{play:_,isOpen:()=>c,escRecently:()=>performance.now()-u<300}}var Wu=e=>new Promise(t=>setTimeout(t,e)),Gu=e=>String(e).replace(/[&<>"]/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`})[e]);function Ku(e){let t=document.createElement(`div`);t.className=`fade`,t.innerHTML=`<div class="cap"></div>`,e.appendChild(t);let n=null;function r(t,r=``){return i(),n=document.createElement(`div`),n.className=`screen ${r}`,n.innerHTML=t,e.appendChild(n),n}function i(){n?.remove(),n=null}if(Ml){let t=document.createElement(`div`);t.className=`rotate-hint armed`,t.innerHTML=`<div>Поверни телефон горизонтально.<br>Так удобнее ходить и смотреть.<br><br><button class="btn">Играть вертикально</button></div>`,t.querySelector(`button`).addEventListener(`click`,()=>t.classList.remove(`armed`)),e.appendChild(t)}let a={close:i,loading(){let e=r(`<div class="title-wrap">
          <h1 class="game-title">ГЛИТЧ</h1>
          <div class="game-sub">Последняя сборка</div>
          <div class="profession">Профессия: тестировщик игр (QA)</div>
          <div class="load-bar"><div class="load-fill"></div></div>
          <div class="load-text">Загрузка…</div>
          <div class="btn-col start-btns hidden"></div>
        </div>`,`solid loading`),t=e.querySelector(`.load-fill`),n=e.querySelector(`.load-text`),i=e.querySelector(`.start-btns`);return{setProgress(e,r){t.style.width=`${Math.round(e*100)}%`,r&&(n.textContent=r)},askStart({canContinue:e,name:t}){return n.textContent=t?`Готово. Тестировщик: ${t}`:`Готово`,i.innerHTML=e?`<button class="btn primary" data-a="continue">Продолжить смену</button>
               <button class="btn" data-a="restart">Начать заново</button>`:`<button class="btn primary" data-a="start">Начать смену</button>`,i.insertAdjacentHTML(`beforeend`,`<button class="link" data-a="credits">Авторы и источники</button>`),Ml&&!Ol()&&window.parent===window&&i.insertAdjacentHTML(`beforeend`,`<p class="fs-tip">На весь экран на iPhone: «Поделиться», затем «На экран Домой».</p>`),i.classList.remove(`hidden`),new Promise(e=>{let t=async n=>{let r=n.target.closest(`[data-a]`)?.dataset.a;r&&(ju(),X.ui(),Ml&&r!==`credits`&&Al(),r===`credits`?await a.credits():(i.removeEventListener(`click`,t),e(r)))};i.addEventListener(`click`,t)})}}},credits(){return new Promise(t=>{let n=document.createElement(`div`);n.className=`screen`,n.style.zIndex=160,n.innerHTML=`<div class="card">
            <h2>Авторы и источники</h2>
            <div class="credits">
              <p>«ГЛИТЧ: Последняя сборка». Игра о профессии тестировщика игр. Cyber Garden 2026, кейс «Центр-инвест».</p>
              <p>Вся графика собрана из простых фигур в коде. Звук синтезирован в браузере. Чужих моделей, текстур и музыки нет.</p>
              <p>Технологии: Three.js (MIT), Vite (MIT).</p>
              <p>История, люди и компании выдуманы.</p>
            </div>
            <button class="btn" data-a="back">Назад</button>
          </div>`,e.appendChild(n),n.addEventListener(`click`,e=>{e.target.closest(`[data-a="back"]`)&&(n.remove(),t())})})},pause({muted:e,onSound:t}){return new Promise(n=>{let i=e=>`Звук: ${e?`выкл`:`вкл`}`;r(`<div class="card pause-card">
            <h2>Пауза</h2>
            <div class="btn-col">
              <button class="btn primary" data-a="resume">Продолжить</button>
              <button class="btn" data-a="sound">${i(e)}</button>
              <button class="btn" data-a="exit">Выйти в меню</button>
            </div>
          </div>`).addEventListener(`click`,e=>{let r=e.target.closest(`[data-a]`)?.dataset.a;r&&(X.ui(),r===`sound`?e.target.closest(`[data-a]`).textContent=i(t()):n(r))})})},chapterEnd({chapterNo:e=1,endingTitle:t,characters:n,stars:i,starRules:a=[],score:o,skillsUsed:s,career:c,teaser:l,hasNext:u=!1}){return new Promise(d=>{let f=`★`.repeat(i)+`☆`.repeat(3-i);r(`<div class="end-wrap">
            <div class="card">
              <div class="end-kicker">Глава ${e} завершена</div>
              <h2>${Gu(t)}</h2>
              <div class="stars" aria-label="Звёзды: ${i} из 3">${f}</div>
              <ul class="star-rules">${a.map(e=>`<li class="${e.done?``:`no`}"><span>${e.done?`★`:`☆`}</span>${Gu(e.text)}</li>`).join(``)}</ul>
              <p class="score">Очки: ${o}</p>
              <h3>Что стало с героями</h3>
              <ul class="heroes">
                ${n.map(e=>`<li><b>${Gu(e.name)}</b><span>${Gu(e.text)}</span></li>`).join(``)}
              </ul>
              <p class="teaser">${Gu(l||``)}</p>
            </div>
            <div class="card career">
              <div class="end-kicker">Карточка профессии</div>
              <h2>${Gu(c.profession)}</h2>
              <h3>Чем занимается на самом деле</h3>
              <ul>${c.what.map(e=>`<li>${Gu(e)}</li>`).join(``)}</ul>
              <h3>Что ты сегодня делал сам</h3>
              <ul class="end-list">
                ${s.map(e=>`<li class="${e.done?``:`no`}"><span class="mark">${e.done?`✓`:`·`}</span><span>${Gu(e.text)}</span></li>`).join(``)}
              </ul>
              <h3>Какие навыки нужны</h3>
              <ul>${c.skills.map(e=>`<li>${Gu(e)}</li>`).join(``)}</ul>
              <h3>Где учиться в Ростовской области</h3>
              <ul class="study">
                ${c.study.map(e=>`<li><b>${Gu(e.name)}</b> <span class="lvl">${Gu(e.level)}, ${Gu(e.city)}</span><br><span>${Gu(e.what)}</span> <a href="${Gu(e.url)}" target="_blank" rel="noopener">сайт</a></li>`).join(``)}
              </ul>
              <h3>Источники</h3>
              <ul class="sources">
                ${c.sources.map(e=>`<li><a href="${Gu(e.url)}" target="_blank" rel="noopener">${Gu(e.title)}</a></li>`).join(``)}
              </ul>
              <p class="checked">Данные проверены: ${Gu(c.checked)}</p>
            </div>
            <div class="end-actions">
              ${u?`<button class="btn primary" data-a="next">Глава ${e+1} ›</button>`:``}
              <button class="btn ${u?``:`primary`}" data-a="exit">Выйти в меню</button>
              <button class="btn" data-a="restart">Пройти заново</button>
            </div>
          </div>`,`solid end-screen`).addEventListener(`click`,e=>{let t=e.target.closest(`[data-a]`)?.dataset.a;t&&(X.ui(),d(t))})})},async fadeOut(e=``,n=``){t.querySelector(`.cap`).innerHTML=e?`${Gu(e)}${n?`<small>${Gu(n)}</small>`:``}`:``,t.classList.add(`on`),await Wu(650)},clearFade(){t.classList.remove(`on`)},async fadeIn(){t.classList.remove(`on`),await Wu(650)}};return a}var qu=[{id:`bench`,label:`Скамейка в зале ожидания`,title:`Скамейка висит в воздухе и вращается`,expected:[{id:`bench_floor`,text:`Скамейка стоит на полу`},{id:`bench_fly`,text:`Скамейка может подниматься в воздух`}],actual:[{id:`bench_flying`,text:`Скамейка висит в воздухе и вращается`},{id:`bench_missing`,text:`Скамейки нет в зале`}]},{id:`clock`,label:`Часы на станции`,title:`Часы на станции идут назад`,expected:[{id:`clock_forward`,text:`Часы идут вперёд`},{id:`clock_stopped`,text:`Часы стоят`}],actual:[{id:`clock_backward`,text:`Часы идут назад`},{id:`clock_fast`,text:`Часы спешат`}]},{id:`journal`,label:`Журнал путешественников`,title:`Журнал путешественников исчезает со стойки`,expected:[{id:`journal_stays`,text:`Журнал остаётся на стойке`},{id:`journal_gone_ok`,text:`Журнал убирается после разговора с Лисом`}],actual:[{id:`journal_vanishes`,text:`Журнал исчезает со стойки`},{id:`journal_moves`,text:`Журнал переносится в архив`}]},{id:`lis_name`,label:`Лис называет игрока по имени`,title:`Лис узнаёт игрока и ссылается на прошлую сборку`,expected:[{id:`lis_generic`,text:`Лис приветствует как нового путешественника`},{id:`lis_named_ok`,text:`Лис называет игрока по имени из профиля`}],actual:[{id:`lis_remembers`,text:`Лис говорит, что игрок уже проверял дверь в прошлой сборке`},{id:`lis_silent`,text:`Лис молчит`}]}],Ju=[{id:`low`,text:`Низкая: заметно, но не мешает играть`},{id:`medium`,text:`Средняя: мешает, но есть обход`},{id:`high`,text:`Высокая: теряется предмет или прогресс`},{id:`critical`,text:`Критическая: игра ломается или вылетает`}],Yu=[{id:`replay_journal`,title:`Твоя запись повтора: исчезновение журнала`,desc:`Взял фонарь → вошёл в архив → вышел. Журнал исчез.`},{id:`report_0412`,title:`Отчёт #0412 (n.orlov)`,desc:`Та же ошибка месяц назад. Закрыт: «Не воспроизводится».`},{id:`profile_match`,title:`Совпадение профиля tester_02`,desc:`Твой профиль скопирован с профиля Никиты Орлова вместе с историей.`},{id:`chalk_note`,title:`Надпись мелом в архиве`,desc:`«н.о. 0.9.3 журнал тут был». Видна только в свете фонаря.`}],Xu=[{id:`intro`,title:`1. Об игре`,body:`«Станция Рассвет»: приключение от первого лица. Ночная станция, смотритель Лис помогает заблудившимся путешественникам и записывает их истории в журнал. Сборка 0.9.7, релиз-кандидат.`},{id:`hall`,title:`2. Зал ожидания`,body:`Скамейки стоят на полу вдоль стен. Над залом три лампы с тёплым светом, лёгкое мерцание задумано.`},{id:`clock`,title:`2.3. Часы`,body:`Часы на станции идут назад. Это задумано: отсылка к сюжету, время на станции «отматывается» для каждого путешественника. Не баг.`,checkable:!0},{id:`journal`,title:`3. Журнал путешественников`,body:`Красная книга на стойке смотрителя. Журнал всегда остаётся на стойке, его нельзя взять или переместить. Сохраняется между сессиями вместе с прогрессом игрока.`},{id:`lis`,title:`4. Лис`,body:`Смотритель станции. Встречает игрока как нового путешественника. Имя игрока берёт из профиля. Ссылок на прошлые сессии в диалогах нет.`},{id:`lantern`,title:`5. Фонарь`,body:`Висит на крюке у будки. Игрок может взять его и вернуть. Нужен, чтобы видеть в архиве. Предмет переносится между зонами (флаг carry_over).`},{id:`archive`,title:`6. Архив`,body:`Небольшая комната с полками в западном крыле. Своего света нет.`},{id:`service`,title:`7. Служебный выход`,body:`Декорация. Дверь нарисована и не открывается. Комнаты за ней нет.`},{id:`saves`,title:`8. Сохранения`,body:`Игра сохраняется при переходе между зонами и при подборе предметов с флагом carry_over. С версии 0.9.5 работает перенос состояния между сборками (автор: Т. Сафин), чтобы игроки не теряли прогресс после обновлений.`}],Zu=`tester_02`,Qu=`0.9.7`,$u=[{id:`log`,label:`Журнал действий`,short:`Журнал`},{id:`tracker`,label:`Трекер`,short:`Трекер`},{id:`docs`,label:`Документация`,short:`Документы`},{id:`chat`,label:`Чат`,short:`Чат`}],ed={open:{text:`Открыт`,cls:`open`},accepted:{text:`Принят`,cls:`ok`},returned:{text:`На доработке`,cls:`warn`},rejected:{text:`Отклонён`,cls:`muted`},closed_cnr:{text:`Закрыт: не воспроизводится`,cls:`bad`}},td={accepted:{title:`Отчёт принят`,cls:`ok`},returned:{title:`Вернули на доработку`,cls:`warn`},rejected:{title:`Отчёт отклонён`,cls:`muted`}},nd={irina:{name:`Ирина Белова`,role:`руководитель тестирования`,letter:`И`,cls:`irina`},timur:{name:`Тимур Сафин`,role:`программист`,letter:`Т`,cls:`timur`},system:{name:`Система`,role:``,letter:`С`,cls:`system`},nikita:{name:`Никита Орлов`,role:`бывший тестировщик`,letter:`Н`,cls:`nikita`}},rd={subject:`Выбери объект`,steps:`Добавь хотя бы один шаг`,expected:`Выбери ожидаемый результат`,actual:`Выбери фактический результат`,severity:`Выбери серьёзность`};function Z(e){return String(e??``).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`)}function id(e){let t=new Date(e||0);return[t.getHours(),t.getMinutes(),t.getSeconds()].map(e=>String(e).padStart(2,`0`)).join(`:`)}var ad=e=>ou[e]||e,od=e=>qu.find(t=>t.id===e)||null,sd=(e,t,n)=>od(e)?.[t]?.find(e=>e.id===n)?.text||n||``,cd=e=>Ju.find(t=>t.id===e)?.text||e||``,ld=e=>`${e.t}:${e.id}`,ud=e=>e&&typeof e.then==`function`;function dd(e){if(nd[e])return nd[e];let t=String(e||`?`);return{name:t,role:``,letter:t.charAt(0).toUpperCase(),cls:`other`}}function fd(e){let t=ed[e]||{text:e||`Без статуса`,cls:`muted`};return`<span class="tb-pill tb-pill-${t.cls}">${Z(t.text)}</span>`}function pd(e,t=``){return`<span class="tb-check${e?` on`:``}" aria-hidden="true">${e?t||`<i></i>`:``}</span>`}function md(e,t={}){let n=t||{};async function r(e,...t){let r=n[e];if(typeof r==`function`)try{return await r(...t)}catch(t){console.error(`[tablet] ${e}:`,t);return}}let i={canHint:!1,getReplayResult:null};function a(e,t){let r=n[e];if(typeof r!=`function`)return t;let a;try{a=r()}catch(n){return console.error(`[tablet] ${e}:`,n),t}return ud(a)?(a.then(t=>{JSON.stringify(t)!==JSON.stringify(i[e])&&(i[e]=t,s&&_e())},t=>console.error(`[tablet] ${e}:`,t)),i[e]??t):(i[e]=a,a)}let o=()=>{let e=a(`getReplayResult`,null);return e&&e.ok&&Array.isArray(e.steps)?e:null},s=!1,c=!1,l=`tablet`,u=`log`,d={view:`list`,id:null},f=new Set,p=new Set,m=new Set,h=``,g=``,_=null,v=0,y=x(),b={picks:new Set,known:new Set,saved:null,saving:!1};function x(){return{subject:null,steps:[],source:null,picks:new Set,expected:null,actual:null,severity:null,attachment:!1,errors:{},result:null,sending:!1}}function S(){let e=K.state;e!==_&&(_=e,v=e?.chat?.length||0,f.clear(),p.clear(),y=x(),d={view:`list`,id:null})}let C=()=>K.state||{name:``,log:[],reports:[],evidence:{},chat:[],flags:{}},w=()=>Math.max(0,(C().chat?.length||0)-v),T=()=>Yu.filter(e=>C().evidence?.[e.id]).length,E=()=>Yu.filter(e=>C().evidence?.[e.id]||e.alwaysAvailable),D=document.createElement(`div`);D.className=`tb-layer`,D.hidden=!0,D.innerHTML=`
    <div class="tb-backdrop" data-act="close"></div>
    <section class="tb-panel" role="dialog" aria-modal="true" aria-label="Планшет тестировщика" tabindex="-1">
      <header class="tb-head"></header>
      <div class="tb-body">
        <nav class="tb-tabs" role="tablist"></nav>
        <main class="tb-main"></main>
      </div>
    </section>
    <section class="tb-term" role="dialog" aria-modal="true" aria-label="Терминал дежурного" tabindex="-1" hidden></section>`,e.appendChild(D);let O=D.querySelector(`.tb-panel`),k=D.querySelector(`.tb-head`),A=D.querySelector(`.tb-tabs`),j=D.querySelector(`.tb-main`),M=D.querySelector(`.tb-term`);function N(){let e=Ml||window.innerWidth<700||window.innerHeight<500;D.classList.toggle(`tb-mobile`,e),D.classList.toggle(`tb-touch`,!!Ml)}window.addEventListener(`resize`,()=>{s&&N()});function ee(){let e=C().name||`без имени`;k.innerHTML=`
      <div class="tb-head-main">
        <span class="tb-head-app">Планшет QA</span>
        <span class="tb-head-profile">Профиль: <b class="tb-mono">${Zu}</b><span class="tb-dot">·</span>${Z(e)}<span class="tb-head-build"><span class="tb-dot">·</span>Сборка <span class="tb-mono">${Qu}</span></span></span>
      </div>
      <div class="tb-head-side">
        <span class="tb-evidence" title="Собранные улики">Улики: <b class="tb-mono">${T()}/${Yu.length}</b></span>
        <button class="tb-close" data-act="close" aria-label="Закрыть планшет">
          <span class="tb-kbd">Tab</span><span class="tb-x" aria-hidden="true">×</span>
        </button>
      </div>`}function P(){let e={log:``,tracker:C().reports?.length?String(C().reports.length):``,docs:``,chat:w()?String(w()):``};A.innerHTML=$u.map(t=>{let n=t.id===u,r=e[t.id]?`<span class="tb-tab-count${t.id===`chat`?` tb-unread`:``}">${e[t.id]}</span>`:``;return`<button class="tb-tab${n?` on`:``}" role="tab" aria-selected="${n}" data-act="tab" data-tab="${t.id}">
        <span class="tb-tab-label tb-tab-full">${t.label}</span><span class="tb-tab-label tb-tab-short">${t.short}</span>${r}
      </button>`}).join(``)}function te(){let e=C().log||[],t=new Set(e.filter(e=>!e.foreign).map(ld));[...f].forEach(e=>t.has(e)||f.delete(e));let n=f.size,r=e.length?e.map(e=>{let t=`<span class="tb-log-time">${id(e.t)}</span>`;if(e.foreign)return`<li class="tb-log-row tb-foreign" aria-disabled="true">
                <span class="tb-check tb-check-none" aria-hidden="true"></span>${t}
                <span class="tb-log-text tb-glitch" data-text="${Z(e.text)}">${Z(e.text)}</span>
              </li>`;let n=f.has(ld(e));return`<li><button class="tb-log-row${n?` on`:``}" role="checkbox" aria-checked="${n}" data-act="log-toggle" data-key="${Z(ld(e))}">
              ${pd(n)}${t}<span class="tb-log-text">${Z(e.text)}</span>
            </button></li>`}).join(``):``;return`
      <div class="tb-section-head">
        <h2>Журнал действий</h2>
        <span class="tb-muted">Старые сверху, новые снизу. Отметь шаги и запусти повтор.</span>
      </div>
      ${e.length?`<ol class="tb-log">${r}</ol>`:`<p class="tb-empty">Журнал пуст. Действия на станции появятся здесь.</p>`}
      <div class="tb-actions">
        <span class="tb-muted tb-actions-info">Отмечено: <b class="tb-mono">${n}</b></span>
        <button class="tb-btn" data-act="log-clear"${n?``:` disabled`}>Снять выбор</button>
        <button class="tb-btn tb-btn-primary" data-act="replay"${n?``:` disabled`}>Воспроизвести выбранное</button>
      </div>`}function F(){if(d.view===`new`)return ce();if(d.view===`card`){let e=(C().reports||[]).find(e=>String(e.id)===String(d.id));if(e)return oe(e);d={view:`list`,id:null}}return ne()}function ne(){let e=[...C().reports||[]].reverse(),t=e.map(e=>`<li><button class="tb-rep-row" data-act="open-report" data-id="${Z(e.id)}">
          <span class="tb-rep-id">#${Z(e.id)}</span>
          <span class="tb-rep-title">${Z(e.title)}<span class="tb-rep-meta">${Z(e.author||``)}${e.date?`, ${Z(e.date)}`:``}</span></span>
          ${fd(e.status)}
        </button></li>`).join(``);return`
      <div class="tb-section-head tb-row-between">
        <div><h2>Отчёты</h2><span class="tb-muted">Сборка ${Qu}. Новые сверху.</span></div>
        <button class="tb-btn tb-btn-primary" data-act="new-report">Новый отчёт</button>
      </div>
      ${e.length?`<ul class="tb-rep-list">${t}</ul>`:`<p class="tb-empty">Отчётов пока нет. Нашёл странность: повтори её и опиши.</p>`}`}function re(e,t){return e?.length?`<ol class="tb-steps">${e.map(e=>`<li class="${t&&t.has(e)?`tb-match`:``}">${Z(ad(e))}</li>`).join(``)}</ol>`:`<p class="tb-muted">Шаги не указаны.</p>`}function ie(e){let t=(C().reports||[]).filter(t=>!t.foreign&&t.subject===e);return t.find(e=>e.status===`accepted`)||t[t.length-1]||null}function ae(e){let t=ie(e.subject),n=e.compare||{};if(!t)return`<div class="tb-compare-empty">Твой отчёт по объекту «${Z(od(e.subject)?.label||e.subject)}» не найден. Сравнивать не с чем.</div>`;let r=new Set(e.steps||[]),i=new Set(t.steps||[]),a=new Set([...r].filter(e=>i.has(e))),o=e.profile||Zu,s=t.profile||Zu,c=n.matchProfile??o===s,l=n.matchSteps??(a.size&&a.size===r.size&&r.size===i.size),u=(t,n,r)=>`
      <div class="tb-col">
        <div class="tb-col-head">${Z(n)}${t===e?``:` <span class="tb-mono">#${Z(t.id)}</span>`}</div>
        <div class="tb-col-row${c?` tb-match`:``}">Профиль: <b class="tb-mono">${Z(r)}</b></div>
        <div class="tb-col-row tb-col-label">Автор: ${Z(t.author||``)}</div>
        <div class="tb-col-label">Шаги</div>
        ${re(t.steps,a)}
      </div>`;return`
      <div class="tb-compare">
        <div class="tb-compare-sum">
          <span class="tb-pill tb-pill-${l?`warn`:`muted`}">Шаги: ${a.size} из ${Math.max(r.size,i.size)} совпадают</span>
          <span class="tb-pill tb-pill-${c?`warn`:`muted`}">Профиль ${c?`совпадает`:`другой`}</span>
        </div>
        <div class="tb-cols">
          ${u(e,`Отчёт #${e.id}`,o)}
          ${u(t,`Твой отчёт`,s)}
        </div>
      </div>`}function oe(e){let t=od(e.subject),n=[[`Автор`,Z(e.author||``)],[`Профиль`,`<span class="tb-mono">${Z(e.profile||``)}</span>`],[`Дата`,Z(e.date||``)],[`Закрыл`,e.closedBy?`<span class="tb-mono">${Z(e.closedBy)}</span>`:`<span class="tb-muted">нет</span>`],[`Объект`,Z(t?.label||e.subject||``)],[`Серьёзность`,Z(cd(e.severity))]].map(([e,t])=>`<dt>${e}</dt><dd>${t}</dd>`).join(``),r=(e.comments||[]).length?(e.comments||[]).map(e=>`<blockquote class="tb-quote"><p>${Z(e.text)}</p><cite class="tb-mono">${Z(e.from)}</cite></blockquote>`).join(``):`<p class="tb-muted">Комментариев нет.</p>`,i=e.attachment?`<div class="tb-attach"><span class="tb-attach-icon" aria-hidden="true">▶</span><span>Запись повтора${e.foreign?` (${Z(e.author||``)})`:``}</span>${e.foreign?`<button class="tb-btn tb-btn-small" data-act="play" data-id="${Z(e.id)}"${m.has(`play`)?` disabled`:``}>Воспроизвести запись</button>`:``}</div>`:`<p class="tb-muted">Вложений нет.</p>`,a=e.foreign?`<div class="tb-card-actions">
          <button class="tb-btn tb-btn-primary" data-act="compare" data-id="${Z(e.id)}"${m.has(`compare`)?` disabled`:``}>${m.has(`compare`)?`Сравниваю…`:`Сравнить с моим`}</button>
          <button class="tb-btn" data-act="play" data-id="${Z(e.id)}"${m.has(`play`)?` disabled`:``}>Воспроизвести запись</button>
        </div>`:``;return`
      <button class="tb-back" data-act="back">‹ Все отчёты</button>
      <div class="tb-card">
        <div class="tb-card-head">
          <span class="tb-rep-id tb-rep-id-big">#${Z(e.id)}</span>
          ${fd(e.status)}
          ${e.foreign?`<span class="tb-pill tb-pill-outline">Чужой отчёт</span>`:``}
        </div>
        <h2 class="tb-card-title">${Z(e.title)}</h2>
        <dl class="tb-meta">${n}</dl>
        ${a}
        ${e.foreign&&e.compare?`<h3>Сравнение</h3>${ae(e)}`:``}
        <h3>Шаги воспроизведения</h3>
        ${re(e.steps)}
        <div class="tb-two">
          <div><h3>Ожидаемый результат</h3><p>${Z(sd(e.subject,`expected`,e.expected))||`<span class="tb-muted">не указан</span>`}</p></div>
          <div><h3>Фактический результат</h3><p>${Z(sd(e.subject,`actual`,e.actual))||`<span class="tb-muted">не указан</span>`}</p></div>
        </div>
        <h3>Вложения</h3>
        ${i}
        <h3>Комментарии</h3>
        ${r}
      </div>`}function se(e){return`tb-field${y.errors[e]?` tb-field-err`:``}`}function I(e){return y.errors[e]?`<p class="tb-err-text">${rd[e]}</p>`:``}function L(e,t,n,r){return`<div class="tb-options" role="radiogroup" aria-label="${Z(r)}">${t.map(t=>`<button class="tb-opt${t.id===n?` on`:``}" role="radio" aria-checked="${t.id===n}" data-act="${e}" data-id="${Z(t.id)}">
          <span class="tb-radio" aria-hidden="true"></span><span>${Z(t.text??t.label)}</span>
        </button>`).join(``)}</div>`}function ce(){let e=od(y.subject),t=o();!t&&y.attachment&&(y.attachment=!1);let n=(C().log||[]).filter(e=>!e.foreign),r=new Set(n.map(ld));[...y.picks].forEach(e=>r.has(e)||y.picks.delete(e));let i=y.steps.length?`<ol class="tb-steps tb-steps-chosen">${y.steps.map(e=>`<li>${Z(ad(e))}</li>`).join(``)}</ol>`:`<p class="tb-muted tb-steps-empty">Шаги не выбраны.</p>`,a=n.length?`<ol class="tb-picker">${n.map(e=>{let t=y.picks.has(ld(e));return`<li><button class="tb-log-row tb-log-row-small${t?` on`:``}" role="checkbox" aria-checked="${t}" data-act="f-pick" data-key="${Z(ld(e))}">
              ${pd(t)}<span class="tb-log-time">${id(e.t)}</span><span class="tb-log-text">${Z(e.text)}</span>
            </button></li>`}).join(``)}</ol>`:`<p class="tb-muted">В журнале пока нет действий.</p>`,s=y.result,c=s?`<div class="tb-result tb-result-${td[s.status]?.cls||`muted`}" role="status">
          <b>${Z(td[s.status]?.title||s.status)}</b>${s.message?`<p>${Z(s.message)}</p>`:``}
        </div>`:``,l=Object.keys(y.errors).length>0;return`
      <button class="tb-back" data-act="back">‹ Все отчёты</button>
      <div class="tb-section-head"><h2>Новый отчёт</h2><span class="tb-muted">Шаги, что ожидал, что получил, насколько серьёзно.</span></div>
      ${c}
      <div class="tb-form">
        <div class="${se(`subject`)}">
          <div class="tb-label"><span class="tb-num">1</span>Объект</div>
          ${L(`f-subject`,qu,y.subject,`Объект`)}
          ${e?`<p class="tb-hint">Заголовок: <b>${Z(e.title)}</b></p>`:``}
          ${I(`subject`)}
        </div>

        <div class="${se(`steps`)}">
          <div class="tb-label"><span class="tb-num">2</span>Шаги воспроизведения</div>
          ${i}
          <div class="tb-inline-btns">
            ${t?`<button class="tb-btn tb-btn-small tb-btn-accent" data-act="f-replay-steps">Подставить шаги из повтора</button>`:``}
            ${y.steps.length?`<button class="tb-btn tb-btn-small" data-act="f-clear-steps">Очистить шаги</button>`:``}
          </div>
          <p class="tb-hint">${t?`Или отметь действия из журнала:`:`Повтора пока нет. Отметь действия из журнала по порядку:`}</p>
          ${a}
          ${I(`steps`)}
        </div>

        <div class="${se(`expected`)}">
          <div class="tb-label"><span class="tb-num">3</span>Ожидаемый результат</div>
          ${e?L(`f-expected`,e.expected,y.expected,`Ожидаемый результат`):`<p class="tb-muted">Сначала выбери объект.</p>`}
          <p class="tb-hint">Как должно быть, сверяйся с документацией.</p>
          ${I(`expected`)}
        </div>

        <div class="${se(`actual`)}">
          <div class="tb-label"><span class="tb-num">4</span>Фактический результат</div>
          ${e?L(`f-actual`,e.actual,y.actual,`Фактический результат`):`<p class="tb-muted">Сначала выбери объект.</p>`}
          ${I(`actual`)}
        </div>

        <div class="${se(`severity`)}">
          <div class="tb-label"><span class="tb-num">5</span>Серьёзность</div>
          ${L(`f-severity`,Ju,y.severity,`Серьёзность`)}
          ${I(`severity`)}
        </div>

        <div class="tb-field">
          <button class="tb-opt tb-opt-check${y.attachment?` on`:``}" role="checkbox" aria-checked="${y.attachment}" data-act="f-attach"${t?``:` disabled`}>
            ${pd(y.attachment)}<span>Приложить запись повтора${t?``:`<span class="tb-muted"> (нужен успешный повтор)</span>`}</span>
          </button>
        </div>
      </div>
      <div class="tb-actions">
        <span class="tb-actions-info ${l?`tb-err-text`:`tb-muted`}">${l?`Заполни отмеченные поля`:``}</span>
        <button class="tb-btn" data-act="back">Отмена</button>
        <button class="tb-btn tb-btn-primary" data-act="f-submit"${y.sending?` disabled`:``}>${y.sending?`Отправляю…`:`Отправить`}</button>
      </div>`}function le(){y.steps=(C().log||[]).filter(e=>!e.foreign&&y.picks.has(ld(e))).map(e=>e.id)}function ue(){let e={};return y.subject||(e.subject=!0),y.steps.length||(e.steps=!0),y.expected||(e.expected=!0),y.actual||(e.actual=!0),y.severity||(e.severity=!0),y.errors=e,!Object.keys(e).length}async function de(){if(y.sending)return;if(!ue()){y.result=null,_e(),j.querySelector(`.tb-field-err`)?.scrollIntoView({block:`center`});return}let e=od(y.subject),t={subject:y.subject,title:e?.title||``,steps:[...y.steps],expected:y.expected,actual:y.actual,severity:y.severity,attachment:!!(y.attachment&&o())};y.sending=!0,_e();let i=typeof n.onSubmitReport==`function`?await r(`onSubmitReport`,t):void 0;y.sending=!1;let a=i?.status;if(a===`returned`)y.result={status:a,message:i.message||``};else if(a===`accepted`||a===`rejected`){let e={status:a,message:i.message||``};y=x(),y.result=e}else y.result={status:`rejected`,message:i?.message||`Трекер не ответил. Попробуй ещё раз.`};a===`accepted`&&X.success?.(),_e(),j.scrollTop=0}function fe(e){if(p.has(e))return!0;if(typeof n.isDocChecked==`function`)try{return!!n.isDocChecked(e)}catch{return!1}return!1}function pe(){return`
      <div class="tb-section-head"><h2>Документация</h2><span class="tb-muted">«Станция Рассвет», ГДД. Источник ожидаемого поведения.</span></div>
      <div class="tb-docs">
        <nav class="tb-toc">${Xu.map(e=>`<a class="tb-toc-item" data-act="doc-jump" data-id="${Z(e.id)}">${Z(e.title)}</a>`).join(``)}</nav>
        <div class="tb-doc-list">${Xu.map(e=>{let t=fe(e.id),n=e.checkable?t?`<span class="tb-pill tb-pill-ok">Проверено</span>`:`<button class="tb-btn tb-btn-small" data-act="doc-check" data-id="${Z(e.id)}">Проверено: не баг</button>`:``;return`<article class="tb-doc" id="tb-doc-${Z(e.id)}">
        <div class="tb-doc-head"><h3>${Z(e.title)}</h3>${n}</div>
        <p>${Z(e.body)}</p>
      </article>`}).join(``)}</div>
      </div>`}function me(){let e=C().chat||[],t=e.length?e.map((t,n)=>{let r=dd(t.from),i=e[n-1];return`<li class="tb-msg${i&&i.from===t.from&&t.t-i.t<6e4?` tb-msg-grouped`:``}${t.from===`system`?` tb-msg-system`:``}">
              <span class="tb-avatar tb-av-${r.cls}" aria-hidden="true">${Z(r.letter)}</span>
              <div class="tb-msg-body">
                <div class="tb-msg-head"><b>${Z(r.name)}</b>${r.role?`<span class="tb-muted tb-msg-role">${Z(r.role)}</span>`:``}<span class="tb-log-time">${id(t.t)}</span></div>
                <p>${Z(t.text)}</p>
              </div>
            </li>`}).join(``):``,n=!!a(`canHint`,!1),r=``;try{let e=vu();Number.isFinite(e.hints)&&(r=`Осталось подсказок: ${Math.max(0,e.hints-(C().hintsUsed||0))}`)}catch{}return`
      <div class="tb-section-head"><h2>Чат команды</h2><span class="tb-muted">#релиз-097</span></div>
      ${e.length?`<ul class="tb-chat">${t}</ul>`:`<p class="tb-empty">Сообщений пока нет.</p>`}
      ${n||h?`<div class="tb-actions">
              <span class="tb-actions-info tb-muted">${Z(h||r)}</span>
              ${n?`<button class="tb-btn tb-btn-primary" data-act="hint"${m.has(`hint`)?` disabled`:``}>Спросить Ирину</button>`:``}
            </div>`:``}`}function he(){let e=E();e.forEach(e=>{b.known.has(e.id)||(b.known.add(e.id),b.saved===null&&b.picks.add(e.id))});let t=e.filter(e=>b.picks.has(e.id)).length,n;n=b.saved===null?e.length?`
        <p class="tb-term-line">&gt; Выбери данные для сохранения:</p>
        <ul class="tb-term-list">${e.map(e=>{let t=b.picks.has(e.id);return`<li><button class="tb-term-item${t?` on`:``}" role="checkbox" aria-checked="${t}" data-act="t-toggle" data-id="${Z(e.id)}"${b.saving?` disabled`:``}>
              <span class="tb-term-box">[${t?`x`:` `}]</span>
              <span><span class="tb-term-title">${Z(e.title)}</span><span class="tb-term-desc">${Z(e.desc)}</span></span>
            </button></li>`}).join(``)}</ul>
        <p class="tb-term-line tb-term-dim">&gt; Отмечено: ${t} из ${e.length}${b.saving?`. Сохраняю...`:``}</p>
        <div class="tb-term-actions">
          <button class="tb-term-btn tb-term-primary" data-act="t-save"${t&&!b.saving?``:` disabled`}>[ Сохранить в архив сборки ]</button>
          <button class="tb-term-btn" data-act="t-close"${b.saving?` disabled`:``}>[ Закрыть ]</button>
        </div>`:`
        <p class="tb-term-line">&gt; Нет данных для сохранения.</p>
        <div class="tb-term-actions"><button class="tb-term-btn" data-act="t-close">[ Закрыть ]</button></div>`:`
        <p class="tb-term-line">&gt; Запись в архив сборки ${Qu}... готово.</p>
        <p class="tb-term-line tb-term-big">Сохранено: ${b.saved}</p>
        <div class="tb-term-actions"><button class="tb-term-btn" data-act="t-close">[ Закрыть ]</button></div>`,M.innerHTML=`
      <div class="tb-term-head">
        <span>ТЕРМИНАЛ ДЕЖУРНОГО. Архив сборки</span>
        <button class="tb-term-x" data-act="t-close" aria-label="Закрыть терминал">×</button>
      </div>
      <div class="tb-term-sub">Станция Рассвет · сборка ${Qu} · профиль ${Zu}</div>
      <div class="tb-term-body">${n}<span class="tb-term-cursor" aria-hidden="true"></span></div>`}async function ge(){if(b.saving)return;let e=E().filter(e=>b.picks.has(e.id)).map(e=>e.id);e.length&&(b.saving=!0,_e(),await r(`onSaveEvidence`,e),b.saving=!1,b.saved=e.length,X.success?.(),_e())}function _e(){if(!s)return;if(S(),N(),l===`terminal`){O.hidden=!0,M.hidden=!1,D.classList.add(`tb-mode-term`),he();return}O.hidden=!1,M.hidden=!0,D.classList.remove(`tb-mode-term`);let e=u===`tracker`?`tracker:${d.view}:${d.id}`:u,t=e===g,n=j.scrollTop,r=j.scrollHeight-j.clientHeight-j.scrollTop<24;u===`chat`&&(v=C().chat?.length||0),ee(),P();let i=``;i=u===`log`?te():u===`tracker`?F():u===`docs`?pe():me(),j.innerHTML=`<div class="tb-view tb-view-${u}">${i}</div>`,j.setAttribute(`aria-label`,$u.find(e=>e.id===u)?.label||``),(u===`log`||u===`chat`)&&(!t||r)?j.scrollTop=j.scrollHeight:j.scrollTop=t?n:0,g=e}D.addEventListener(`click`,e=>{let t=e.target.closest(`[data-act]`);if(!t||!D.contains(t)||t.disabled)return;let n=t.dataset.act,r=t.dataset.id;(n!==`close`||t.classList.contains(`tb-close`))&&X.ui(),ve(n,t,r)});function ve(e,t,n){switch(e){case`close`:we();break;case`tab`:u=t.dataset.tab,u===`tracker`&&d.view===`card`&&(d={view:`list`,id:null}),_e();break;case`log-toggle`:{let e=t.dataset.key;f.has(e)?f.delete(e):f.add(e),_e();break}case`log-clear`:f.clear(),_e();break;case`replay`:{let e=(C().log||[]).filter(e=>!e.foreign&&f.has(ld(e))).map(e=>e.id);if(!e.length)return;f.clear(),we(),r(`onReplay`,e);break}case`new-report`:d={view:`new`,id:null},y.result&&y.result.status!==`returned`&&(y.result=null),_e();break;case`open-report`:d={view:`card`,id:n},_e();break;case`back`:d={view:`list`,id:null},_e();break;case`compare`:ye(`compare`,()=>r(`onCompare`,n));break;case`play`:we(),r(`onPlayRecording`,n);break;case`f-subject`:y.subject!==n&&(y.subject=n,y.expected=null,y.actual=null),R(`subject`),_e();break;case`f-replay-steps`:{let e=o();if(!e)return;y.steps=[...e.steps],y.source=`replay`,y.picks.clear(),y.attachment=!0,R(`steps`),_e();break}case`f-pick`:{let e=t.dataset.key;y.picks.has(e)?y.picks.delete(e):y.picks.add(e),y.source=`log`,le(),y.steps.length&&R(`steps`),_e();break}case`f-clear-steps`:y.steps=[],y.picks.clear(),y.source=null,_e();break;case`f-expected`:y.expected=n,R(`expected`),_e();break;case`f-actual`:y.actual=n,R(`actual`),_e();break;case`f-severity`:y.severity=n,R(`severity`),_e();break;case`f-attach`:o()&&(y.attachment=!y.attachment),_e();break;case`f-submit`:de();break;case`doc-jump`:j.querySelector(`#tb-doc-${CSS.escape(n)}`)?.scrollIntoView({block:`start`,behavior:`smooth`});break;case`doc-check`:p.add(n),_e(),r(`onDocCheck`,n);break;case`hint`:ye(`hint`,async()=>{h=await r(`onHint`)?``:`Подсказок не осталось`});break;case`t-toggle`:b.picks.has(n)?b.picks.delete(n):b.picks.add(n),_e();break;case`t-save`:ge();break;case`t-close`:we()}}function R(e){y.errors[e]&&delete y.errors[e]}async function ye(e,t){if(!m.has(e)){m.add(e),_e();try{await t()}finally{m.delete(e),_e()}}}function be(){let e=s;s=!0,D.hidden=!1,g=``,_e(),e||(c=!0,queueMicrotask(()=>c=!1),(l===`terminal`?M:O).focus({preventScroll:!0}),G.emit(`tablet:open`,{mode:l,tab:u}))}function xe(e){e&&$u.some(t=>t.id===e)&&(u=e),l=`tablet`,be()}function Se(){S(),l=`terminal`,b={picks:new Set,known:new Set,saved:null,saving:!1},be()}function Ce(e){S(),u=`tracker`,d={view:`card`,id:String(e)},l=`tablet`,be()}function we(){if(!s)return;s=!1,D.hidden=!0,h=``;let e=l;l=`tablet`,document.activeElement&&D.contains(document.activeElement)&&document.activeElement.blur(),G.emit(`tablet:close`,{mode:e})}function Te(){s&&!c&&queueMicrotask(()=>{s&&we()})}return G.on(`input:tablet`,Te),G.on(`input:pause`,Te),[`log`,`chat`,`flag`,`evidence`,`reports`].forEach(e=>G.on(e,()=>{K.state!==_&&(S(),e===`chat`&&(v=Math.max(0,v-1))),s&&_e()})),{open:xe,close:we,isOpen:()=>s,openTerminal:Se,openReport:Ce,refresh:()=>_e(),get unread(){return S(),w()}}}var hd=new Map;function gd(e,{emissive:t=0,emissiveIntensity:n=1,transparent:r=!1,opacity:i=1}={}){let a=`${e}|${t}|${n}|${i}`;return hd.has(a)||hd.set(a,new ia({color:e,emissive:t,emissiveIntensity:n,flatShading:!0,transparent:r||i<1,opacity:i})),hd.get(a)}function _d(e,t={}){return new ia({color:e,flatShading:!0,...t})}var vd=new Li(1,1,1);function Q(e,t,n,r,i=0,a=0,o=0,s=null){let c=new qr(vd,s||gd(r));return c.scale.set(e,t,n),c.position.set(i,a+t/2,o),c}function yd(e,t,n,r,i=0,a=0,o=0,s=8,c=null){let l=new qr(new Ri(e,t,n,s),c||gd(r));return l.position.set(i,a+n/2,o),l}function bd(e,t,n=0,r=0,i=0,a=8,o=null){let s=new qr(new Ki(e,a,Math.max(4,a-2)),o||gd(t));return s.position.set(n,r,i),s}function xd(e,t,n,r){return{minX:e-n/2,maxX:e+n/2,minZ:t-r/2,maxZ:t+r/2}}function Sd(e,t=0){let n=new Wn().setFromObject(e);return{minX:n.min.x-t,maxX:n.max.x+t,minZ:n.min.z-t,maxZ:n.max.z+t}}function Cd(e,{width:t=1,height:n=.3,bg:r=`#1b2430`,fg:i=`#e8edf2`,font:a=`bold 64px sans-serif`,align:o=`center`,pad:s=24,lineHeight:c=1.2,transparentBg:l=!1}={}){let u=1024,d=Math.round(u*n/t),f=document.createElement(`canvas`);f.width=u,f.height=d;let p=f.getContext(`2d`);l||(p.fillStyle=r,p.fillRect(0,0,u,d)),p.fillStyle=i,p.textAlign=o,p.textBaseline=`middle`;let m=String(e).split(`
`),h=parseInt(a.match(/(\d+)px/)?.[1]||64,10),g=e=>a.replace(/\d+px/,`${e}px`);p.font=g(h);let _=Math.max(...m.map(e=>p.measureText(e).width),1),v=Math.min(1,(u-s*2)/_,d*.86/(m.length*h*c));v<1&&(h=Math.floor(h*v),p.font=g(h));let y=m.length*h*c,b=o===`center`?u/2:o===`right`?u-s:s;m.forEach((e,t)=>p.fillText(e,b,d/2-y/2+h*c*(t+.5)));let x=new Ni(f);return x.colorSpace=We,x.anisotropy=4,new qr(new Gi(t,n),new Fr({map:x,transparent:l,toneMapped:!1}))}var $={officeFloor:2764602,officeWall:3883602,desk:9071183,deskTop:13214334,monitor:1382430,screenOn:7320575,chair:2041392,plant:5212763,whiteboard:15330543,windowNight:727603,cityLight:16765562,platform:7039856,platformEdge:14266940,rail:4866104,sleeper:5981750,stationWall:8019016,stationTrim:4140581,stationFloor:5917246,wood:9133628,bench:10251074,lamp:16764794,clockFace:15919832,book:8007471,lantern:14721088,archive:3814192,shelf:6178353,serviceDoor:5595243,terminal:2830648,terminalScreen:6547112,sky:659231,skin:14726036,skinDark:12158307,glitchCyan:3663615,glitchPink:16727434},wd={irina:{shirt:2059112,pants:2764344,hair:3875865,skin:$.skin,shoes:2760740},timur:{shirt:4608094,pants:3426654,hair:1513244,skin:$.skinDark,shoes:15132390},lis:{shirt:7035450,pants:3948075,hair:10112808,skin:$.skin,shoes:3811356}},Td=new Li(1,1,1),Ed=new Fr({transparent:!0,opacity:0,depthWrite:!1});function Dd(e,t,n,r=0,i=0,a=0){let o=new qr(Td,Ed);return o.scale.set(e,t,n),o.position.set(r,i,a),o.userData.hitbox=!0,o}var Od=new Map;function kd(e,t){return Od.has(e)||Od.set(e,t()),Od.get(e)}function Ad(e,t,n,r,i=0,a=0,o=0,s=8,c=null){let l=new qr(kd(`c${e}|${t}|${n}|${s}`,()=>new Ri(e,t,n,s)),c||gd(r));return l.position.set(i,a+n/2,o),l}function jd(e,t,n=0,r=0,i=0,a=8,o=null){let s=new qr(kd(`s${e}|${a}`,()=>new Ki(e,a,Math.max(4,a-2))),o||gd(t));return s.position.set(n,r,i),s}function Md(e,t,n,r=0,i=0,a=0,o=6,s=null){let c=new qr(kd(`k${e}|${t}|${o}`,()=>new zi(e,t,o)),s||gd(n));return c.position.set(r,i+t/2,a),c}function Nd(e,t){let n=new U(e);return n.multiplyScalar(t),n.getHex()}function Pd({name:e=`npc`,shirt:t,pants:n,hair:r,skin:i,extra:a}={}){let o=wd[a]||{};t=t??o.shirt??6976384,n=n??o.pants??3028032,r=r??o.hair??2759958,i=i??o.skin??$.skin;let s=o.shoes??1973796,c=new bn;c.name=e;let l=a===`lis`?.16:.08;for(let e of[-1,1])c.add(Q(.17,.76,.19,n,e*.105,.06,0)),c.add(Q(.19,l,.27,s,e*.105,0,.035)),a===`timur`&&c.add(Q(.195,.025,.275,3817288,e*.105,0,.035));a===`lis`&&c.add(Q(.12,.12,.02,Nd(n,.78),-.105,.36,.1));let u=new bn;u.position.y=.8,c.add(u),u.add(Q(.42,.14,.24,n,0,-.12,0));let d=a===`irina`?.42:.47;u.add(Q(d,.58,.26,t,0,0,0)),u.add(Ad(.06,.065,.1,i,0,.56,0,6));let f=[];for(let e of[-1,1]){let n=new bn;n.position.set(e*(d/2+.07),.55,0),n.rotation.z=e*.06,n.add(Q(.13,.56,.15,t,0,-.56,0)),n.add(Q(.1,.12,.11,i,0,-.68,0)),u.add(n),f.push(n)}let p=new bn;p.position.y=.65,u.add(p),p.add(Q(.23,.26,.24,i,0,0,0));for(let e of[-1,1])p.add(Q(.035,.035,.01,1710623,e*.055,.13,.124));p.add(Q(.04,.06,.03,Nd(i,.92),0,.07,.13)),p.add(Q(.07,.012,.01,Nd(i,.7),0,.035,.121));for(let e of[-1,1])p.add(Q(.03,.06,.05,Nd(i,.9),e*.125,.1,0));if(p.add(Q(.25,.07,.26,r,0,.235,-.005)),p.add(Q(.25,.2,.06,r,0,.07,-.11)),a===`irina`){for(let e of[-1,1])p.add(Q(.03,.15,.2,r,e*.125,.12,-.02));p.add(jd(.085,r,0,.29,-.1,7)),p.add(Q(.2,.03,.03,r,0,.27,.115));let e=2237739;for(let t of[-1,1])p.add(Q(.075,.052,.004,12574954,t*.055,.13,.137,gd(12574954,{opacity:.35}))),p.add(Q(.085,.012,.012,e,t*.055,.162,.138)),p.add(Q(.01,.012,.21,e,t*.118,.155,.02));p.add(Q(.03,.01,.01,e,0,.14,.137)),u.add(Ad(.1,.11,.07,t,0,.54,0,8)),u.add(Q(.07,.09,.01,15921906,.11,.33,.135)),u.add(Q(.012,.16,.008,3663615,.08,.38,.132)),u.add(Q(.42,.04,.27,Nd(t,.8),0,0,0))}if(a===`timur`){let e=Nd(t,.75);u.add(Q(.34,.16,.12,t,0,.46,-.15)),u.add(Q(.3,.15,.02,e,0,.08,.135));for(let e of[-1,1])u.add(Q(.015,.15,.01,15790320,e*.05,.36,.134));let n=15001322;u.add(Q(.28,.035,.05,n,0,.62,-.08));for(let e of[-1,1]){let t=Ad(.055,.055,.045,n,0,0,0,8);t.rotation.z=Math.PI/2,t.position.set(e*.115,.6,.04),u.add(t);let r=Ad(.04,.04,.01,16742973,0,0,0,8);r.rotation.z=Math.PI/2,r.position.set(e*.14,.6,.04),u.add(r),u.add(Q(.025,.03,.12,n,e*.12,.6,-.03))}p.add(Q(.12,.06,.12,r,.03,.27,.03))}if(a===`lis`){let e=Nd(t,.72);u.add(Q(.48,.12,.28,t,0,-.1,0)),u.add(Q(.36,.08,.3,e,0,.52,-.005)),u.add(Q(.02,.5,.01,2761754,0,.02,.132));for(let t of[-1,1])u.add(Q(.12,.1,.015,e,t*.12,.33,.135));u.add(Q(.1,.09,.012,8285e3,-.13,.1,.134));for(let e of f)e.add(Q(.135,.1,.12,5917745,0,-.38,-.02));let n=f[1],i=Q(.012,.08,.08,16742938,.068,-.2,0);i.rotation.x=Math.PI/4,n.add(i);for(let e of[-1,1]){let t=Md(.02,.04,16742938,0,0,0,3);t.position.set(.068,-.12,e*.025),n.add(t)}n.add(Q(.013,.02,.02,16774112,.069,-.235,0));for(let[e,t,n,i]of[[.06,.28,.04,.3],[-.07,.28,0,-.35],[0,.29,-.07,.15],[-.03,.27,.09,-.2]]){let a=Q(.1,.06,.1,r,e,t-.03,n);a.rotation.set(i*.6,i,i*.5),p.add(a)}for(let e of[-1,1])p.add(Q(.03,.1,.16,r,e*.125,.15,-.03))}return c.add(Dd(.62,1.75,.5,0,.88,0)),c.userData.head=p,c.userData.body=u,c.userData.bodyY=u.position.y,c.userData.arms=f,c.userData.phase=(e.length*1.37+(a?a.length:0)*.91)%(Math.PI*2),c}function Fd(e,t){let n=e.userData;if(!n.body)return;let r=n.phase,i=Math.sin(t*2+r);n.body.position.y=n.bodyY+i*.004,n.body.scale.set(1+i*.008,1+i*.005,1+i*.014),n.head.rotation.x=Math.sin(t*.6+r)*.045,n.head.rotation.z=Math.sin(t*.43+r*1.3)*.035,n.arms.forEach((e,n)=>{e.rotation.x=Math.sin(t*1.05+r+n*1.7)*.035})}function Id(e,t,n,r=1/60){let i=t-e.position.x,a=n-e.position.z;if(i*i+a*a<1e-6)return;let o=Math.atan2(i,a)-e.rotation.y;o=Math.atan2(Math.sin(o),Math.cos(o)),e.rotation.y+=o*(1-Math.exp(-5*r)),e.rotation.y=Math.atan2(Math.sin(e.rotation.y),Math.cos(e.rotation.y))}var Ld=3;function Rd(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function zd(e,t,n,r){let i=new Gi(e,t,1,4),a=new U(n),o=new U(r),s=i.attributes.position,c=[];for(let e=0;e<s.count;e++){let n=(s.getY(e)+t/2)/t,r=a.clone().lerp(o,n**.7);c.push(r.r,r.g,r.b)}return i.setAttribute(`color`,new dr(c,3)),new qr(i,new Fr({vertexColors:!0,fog:!1,depthWrite:!1}))}function Bd(e){let t=Rd(42),n=zd(320,90,3811916,660004);n.position.set(0,10,-95),e.add(n);let r=new Li(1,1,1),i=new Fr({color:1186608,fog:!1}),a=new Fr({color:857124,fog:!1}),o=new ai(r,i,46),s=new ai(r,a,46),c=new ai(new Gi(1,1),new Fr({color:16777215,fog:!1}),900),l=new Gt,u=new xt,d=new U,f=[$.cityLight,$.cityLight,16770736,16758876,10473727,13208394],p=0,m=(e,n,r,i,a)=>{let o=-45+90*(n+t()*.6)/46,s=r+t()*(i-r),m=3+t()*5*a,h=3+t()*4,g=-6+t()*22,_=g- -30;l.compose(new H(o,-30+_/2,s),u,new H(m,_,h)),e.setMatrixAt(n,l);let v=Math.max(1,Math.floor(m/1.1)),y=Math.floor(_/1.4);for(let e=0;e<y&&p<900;e++){let n=g-.9-e*1.4;if(n<-24)break;for(let e=0;e<v&&p<900;e++){if(t()>.32)continue;let r=o-m/2+m/v*(e+.5);l.compose(new H(r,n,s+h/2+.02),u,new H(.55,.75,1)),c.setMatrixAt(p,l),d.setHex(f[Math.floor(t()*f.length)]),c.setColorAt(p,d),p++}}};for(let e=0;e<46;e++)m(o,e,-16,-34,1);for(let e=0;e<46;e++)m(s,e,-42,-70,1.6);c.count=p,c.instanceMatrix.needsUpdate=!0,c.instanceColor&&(c.instanceColor.needsUpdate=!0),e.add(o,s,c);let h=Ad(.4,1.4,48,0,0,0,0,6,new Fr({color:1318195,fog:!1}));h.position.set(22,-2,-60),e.add(h);let g=jd(.7,0,22,22.3,-60,6,new Fr({color:16726843,fog:!1}));return e.add(g),{beacon:g}}function Vd(e,t,n,r=0){let i=new bn;return i.position.set(t,0,n),i.rotation.y=r,i.add(Q(1.6,.05,.8,$.deskTop,0,.7,0)),i.add(Q(.05,.7,.74,$.desk,-.75,0,0)),i.add(Q(.05,.7,.74,$.desk,.75,0,0)),i.add(Q(1.45,.42,.03,$.desk,0,.28,-.34)),e.add(i),i}function Hd(e,t,n,r=0){let i=new bn;return i.position.set(t,0,n),i.rotation.y=r,i.add(Ad(.28,.28,.04,2765116,0,.02,0,5)),i.add(Ad(.03,.03,.38,8950432,0,.05,0,6)),i.add(Q(.48,.08,.46,$.chair,0,.43,0)),i.add(Q(.46,.55,.07,$.chair,0,.55,.22)),e.add(i),i}function Ud(e,t,n,r,i,a,o,s=0){let c=new bn;c.position.set(t,n,r),c.rotation.y=s,c.add(Q(.2,.02,.15,$.monitor,0,0,0)),c.add(Q(.05,.16,.03,$.monitor,0,.02,-.03)),c.add(Q(i,a,.035,$.monitor,0,.12,-.02));let l=Q(i-.04,a-.04,.006,0,0,.14,0,o);return c.add(l),e.add(c),{group:c,screen:l}}function Wd(e,t,n,r,i,a,o,s){let c=Rd(s),l=[8376831,16764794,12096767,9298842,15134195],u=new bn;u.position.set(t,n,r),u.rotation.y=o;for(let e=0;e<6;e++){let t=(.15+c()*.6)*i,n=(c()>.5?.08:0)*i,r=Q(t,.012,.004,0,-i/2+.03+n+t/2,a/2-.05-e*(a-.06)/6,0,gd(l[e%l.length],{emissive:l[e%l.length],emissiveIntensity:.9}));u.add(r)}e.add(u)}function Gd(e,t,n,r=!0){let i=new bn;if(i.position.set(t,0,n),i.add(Ad(.2,.15,.4,12084287,0,0,0,7)),i.add(Ad(.19,.19,.02,3811870,0,.38,0,7)),r){i.add(Ad(.025,.03,.7,7031342,0,.4,0,5));for(let[e,t,n,r]of[[0,1.25,0,.32],[.14,1,.08,.26],[-.13,.95,-.06,.24],[.02,1.5,-.04,.22]])i.add(jd(r,$.plant,e,t,n,5))}else for(let e=0;e<5;e++){let t=e/5*Math.PI*2,n=Q(.06,.32,.02,$.plant,Math.cos(t)*.06,.38,Math.sin(t)*.06);n.rotation.set(Math.sin(t)*.5,0,-Math.cos(t)*.5),i.add(n)}return e.add(i),i}function Kd(e,t,n,r,i){e.add(Ad(.04,.035,.1,i,t,n,r,7));let a=Q(.015,.05,.05,i,t+.045,n+.025,r);e.add(a)}function qd(e,t,n){e.add(Ad(.15,.12,.34,3817808,t,0,n,7)),e.add(Q(.12,.04,.1,15330543,t+.02,.32,n))}function Jd(){let e=new kn;e.background=new U(660004),e.fog=new On(660004,10,34);let t=[],n=(e,n,r,i)=>{let a=xd(e,n,r,i);return t.push(a),a},r=t=>(e.add(t),t);e.add(new Oa(6122646,3024932,1.15));let i=new Ga(9414368,.45);i.position.set(-3,8,-12),e.add(i);let a=new Ha(16760691,3.2,6,2);a.position.set(-3.75,1.25,-.75),e.add(a);let o=new Ha(7320575,1.6,4.5,2);o.position.set(0,1.25,-2.6),e.add(o);let s=new Ha(16769208,9,11,2);s.position.set(.2,2.75,1.9),e.add(s);let c=new Ha(16763274,4.5,8,2);c.position.set(-4.55,1.75,3.5),e.add(c),r(Ad(.16,.18,.04,2764602,-4.55,0,3.5,7)),r(Ad(.02,.02,1.55,2764602,-4.55,.04,3.5,5)),r(Ad(.14,.22,.3,0,-4.55,1.55,3.5,8,gd(15917764,{emissive:16763274,emissiveIntensity:.8}))),n(-4.55,3.5,.4,.4),r(Q(10,.1,8,$.officeFloor,0,-.1,0)),r(Q(5.2,.012,3.4,3291724,.2,0,-.4)),r(Q(10.4,.1,8.4,2830395,0,Ld,0)),r(Q(10.4,Ld,.2,$.officeWall,0,0,4.1)),r(Q(.2,Ld,8.4,$.officeWall,-5.1,0,0)),r(Q(.2,Ld,8.4,$.officeWall,5.1,0,0)),n(0,4.1,10.4,.2),n(-5.1,0,.2,8.4),n(5.1,0,.2,8.4),n(0,-4.1,10.4,.2),r(Q(10,.1,.03,2764602,0,0,3.985)),r(Q(.03,.1,8,2764602,-4.985,0,0)),r(Q(.03,.1,8,2764602,4.985,0,0)),r(Q(10.4,.85,.2,$.officeWall,0,0,-4.1)),r(Q(10.4,.5499999999999998,.2,$.officeWall,0,2.45,-4.1));for(let e of[-4.9,-1.6,1.6,4.9])r(Q(.3,1.6,.22,$.officeWall,e,.85,-4.1));for(let e of[-3.25,0,3.25])r(Q(.04,1.6,.04,1909291,e,.85,-4.05));r(Q(10,.04,.04,1909291,0,1.75,-4.05)),r(Q(9.8,.04,.3,$.deskTop,0,.85,-3.86));let l=new qr(new Gi(10,1.6),new Fr({color:10470655,transparent:!0,opacity:.07,depthWrite:!1}));l.position.set(0,1.65,-4.06),e.add(l);for(let e of[-3.25,3.25])r(Q(1.3,.5,.1,11844292,e,.18,-3.93));let u=Bd(e),d=gd(15922424,{emissive:16773596,emissiveIntensity:.9}),f=gd(4870496);[[-2.5,-1.5,f],[2.5,-1.5,f],[-2.8,2.2,f],[.2,1.9,d],[2.8,2.2,f]].forEach(([e,t,n])=>{r(Q(1.2,.03,.6,0,e,2.97,t,n))}),r(Q(1,2.1,.06,5981750,-3.6,0,3.98)),r(Q(.08,2.18,.08,2764602,-4.14,0,3.98)),r(Q(.08,2.18,.08,2764602,-3.06,0,3.98)),r(Q(1.16,.08,.08,2764602,-3.6,2.12,3.98)),r(Q(.14,.03,.05,13225170,-3.25,1,3.93));let p=Cd(`ВЫХОД`,{width:.42,height:.15,bg:`#1d7f47`,fg:`#eafff1`,font:`bold 260px sans-serif`});p.position.set(-3.6,2.4,3.995),p.rotation.y=Math.PI,r(p);let m=new bn;m.add(Q(.04,1.3,2.1,10134445,-4.98,.85,1.7)),m.add(Q(.02,1.2,2,$.whiteboard,-4.95,.9,1.7)),m.add(Q(.08,.03,1.4,10134445,-4.92,.86,1.7));for(let[e,t]of[[1.3,14042437],[1.45,2902650],[1.6,3050327]])m.add(Q(.03,.03,.12,t,-4.91,.89,e));let h=Cd(`РЕЛИЗ ЗАВТРА`,{width:1.8,height:.36,transparentBg:!0,fg:`#d23c3c`,font:`bold 150px sans-serif`});h.position.set(-4.935,1.78,1.7),h.rotation.y=Math.PI/2,m.add(h);let g=Cd(`Сборка 0.9.7`,{width:1.3,height:.26,transparentBg:!0,fg:`#2c4a7a`,font:`bold 150px sans-serif`});g.position.set(-4.935,1.42,1.85),g.rotation.y=Math.PI/2,m.add(g);let _=Cd(`[x] сборка
[ ] смоук
[ ] регресс`,{width:.7,height:.4,transparentBg:!0,fg:`#3a3f48`,font:`bold 110px sans-serif`,align:`left`});_.position.set(-4.935,1.12,1.05),_.rotation.y=Math.PI/2,m.add(_),[[2.45,1.55,16045386],[2.5,1.2,16752565],[2.3,1.05,10477823]].forEach(([e,t,n])=>m.add(Q(.01,.14,.14,n,-4.935,t,e))),m.add(Dd(.3,1.3,2.1,-4.85,1.5,1.7)),e.add(m),n(-4.9,1.7,.2,2.1);let v=Vd(e,-3.2,-.6);Ud(v,.1,.725,-.2,.6,.36,gd(858666,{emissive:4157343,emissiveIntensity:.6})),v.add(Q(.42,.02,.14,2764602,.1,.725,.12)),v.add(Ad(.07,.08,.03,2764602,-.55,.725,-.15,6));let y=Q(.025,.4,.025,2764602,-.55,.75,-.15);y.rotation.z=.25,v.add(y);let b=Md(.09,.12,0,-.62,1.07,-.15,6,gd(2059112));b.rotation.z=Math.PI+.4,v.add(b),v.add(jd(.035,0,-.63,1.03,-.15,6,gd($.lamp,{emissive:$.lamp,emissiveIntensity:1}))),Kd(v,.55,.725,.15,2059112),v.add(Q(.22,.03,.3,15921906,-.3,.725,.15));let x=Gd(v,.62,-.2,!1);x.scale.setScalar(.5),x.position.y=.725,Hd(e,-3.2,.3,.2),qd(e,-2.2,-1.2),n(-3.2,-.6,1.6,.8),n(-3.2,.3,.55,.55),n(-2.2,-1.2,.32,.32);let S=Vd(e,3.2,-.6),C=gd(725536,{emissive:1780292,emissiveIntensity:.8});Ud(S,-.32,.725,-.2,.56,.34,C,.18),Ud(S,.32,.725,-.2,.56,.34,C,-.18),Wd(S,-.315,1.015,-.192,.44,.24,.18,3),Wd(S,.315,1.015,-.192,.44,.24,-.18,9),S.add(Q(.42,.02,.14,2764602,0,.725,.12));for(let e=0;e<3;e++)S.add(Ad(.032,.032,.12,[3663615,16727434,3663615][e],.55+e*.07,.725,.2-e*.05,7));S.add(jd(.06,16241210,-.6,.79,.1,6)),S.add(jd(.04,16241210,-.6,.86,.14,6)),S.add(Q(.03,.015,.04,16747050,-.6,.85,.185)),Kd(S,-.4,.725,.2,15330543),Hd(e,3.3,.35,-.5),qd(e,4.2,.4),n(3.2,-.6,1.6,.8),n(3.3,.35,.55,.55),n(4.2,.4,.32,.32);let w=Vd(e,0,-3),T=Ud(w,0,.725,-.15,.68,.4,_d(858666,{emissive:$.screenOn,emissiveIntensity:.55})),E=T.screen,D=Cd(`Н.О.
AT не
выключать`,{width:.14,height:.13,bg:`#f4d54a`,fg:`#3a2f12`,font:`bold 170px sans-serif`});D.position.set(.27,.2,.012),D.rotation.z=-.1,T.group.add(D),w.add(Q(.44,.02,.15,2764602,0,.725,.15)),w.add(Q(.06,.02,.1,2764602,.35,.725,.17)),w.add(Q(.2,.44,.45,1777447,.6,0,-.05)),w.add(Q(.02,.02,.01,0,.6,.38,.18,gd(6094746,{emissive:6094746,emissiveIntensity:1}))),Kd(w,-.5,.725,.1,14042437),w.add(Q(.16,.012,.22,15921906,-.3,.725,.2));let O=T.group;O.add(Dd(.9,.62,.5,0,.26,.05)),Hd(e,-.95,-2.05,.9),qd(e,1.15,-3.5),n(0,-3,1.6,.8),n(-.95,-2.05,.55,.55),n(1.15,-3.5,.32,.32),r(Q(2.5,.86,.6,4871270,3.65,0,3.65)),r(Q(2.56,.04,.64,$.deskTop,3.65,.86,3.65)),r(Q(2.5,.6,.35,4871270,3.65,1.65,3.82));for(let e of[3.05,4.25])r(Q(.02,.5,.01,13225170,e,1.7,3.64));let k=new bn;k.position.set(3,.9,3.7),k.add(Q(.4,.52,.36,2764083,0,0,0)),k.add(Q(.42,.06,.38,9081500,0,.52,0)),k.add(Q(.3,.04,.16,9081500,0,0,-.2)),k.add(Q(.06,.05,.06,9081500,0,.27,-.2)),k.add(Ad(.05,.04,.09,15921906,0,.04,-.2,7)),k.add(Ad(.09,.07,.16,3877406,.08,.58,.05,7));let A=_d(2764083,{emissive:6094746,emissiveIntensity:1});k.add(Q(.03,.03,.01,0,-.12,.42,-.185,A)),k.add(Q(.03,.03,.01,0,-.06,.42,-.185,gd(2764083,{emissive:16756810,emissiveIntensity:1}))),k.add(Dd(.6,.8,.6,0,.4,-.05)),e.add(k),r(Q(.48,.28,.34,14278114,4.25,.9,3.72)),r(Q(.3,.2,.01,1909291,4.2,.94,3.545)),Kd(e,3.45,.9,3.55,16747050),Kd(e,3.6,.9,3.62,3663615),Kd(e,4.75,.9,3.55,15330543),n(3.65,3.65,2.56,.66),r(Q(.45,.85,3.2,4871270,4.75,0,-1.6+1)),r(Q(.47,.03,3.22,$.deskTop,4.75,.85,-.6)),[14042437,2902650,16045386,3050327,9071183,2902650].forEach((e,t)=>r(Q(.28,.3,.07,e,4.75,.88,-1.7+t*.09))),Gd(e,4.75,.6,!1).position.y=.88,n(4.75,-.6,.5,3.2);let j=Cd(`СТАНЦИЯ
РАССВЕТ

релиз скоро`,{width:.8,height:1.1,bg:`#2a1f2e`,fg:`#ffcf7a`,font:`bold 120px sans-serif`});j.position.set(4.975,1.85,-1.4),j.rotation.y=-Math.PI/2,r(j),r(Q(.02,1.16,.86,1909291,4.99,1.27,-1.4));{let e=.6;r(Q(.04,.66,2.2,1053980,4.975,1.68,e)),r(Q(.05,.025,2.2,0,4.97,1.68,e,gd($.screenOn,{emissive:15911244,emissiveIntensity:1}))),r(Q(.05,.025,2.2,0,4.97,2.315,e,gd(2765120)));let t=Cd(`01`,{width:.44,height:.44,bg:`#f2c94c`,fg:`#1a1400`,font:`bold 260px sans-serif`});t.position.set(4.948,2.01,-.14),t.rotation.y=-Math.PI/2,r(t);let n=Cd(`НОЛЬ-ОДИН`,{width:1.4,height:.28,transparentBg:!0,fg:`#f4f1e8`,font:`bold 150px sans-serif`,align:`left`,pad:0});n.position.set(4.948,2.1,.87),n.rotation.y=-Math.PI/2,r(n);let i=Cd(`СТУДИЯ ИГР`,{width:1.4,height:.14,transparentBg:!0,fg:`#f2c94c`,font:`bold 90px sans-serif`,align:`left`,pad:0});i.position.set(4.948,1.87,.87),i.rotation.y=-Math.PI/2,r(i)}Gd(e,-4.5,-3.5,!0),Gd(e,4.5,-3.45,!0),n(-4.5,-3.5,.45,.45),n(4.5,-3.45,.45,.45),Gd(e,-1.2,-3.86,!1).position.y=.87;let M=Pd({name:`Ирина`,extra:`irina`});M.position.set(-1.9,0,.6),e.add(M);let N=Pd({name:`Тимур`,extra:`timur`});N.position.set(2.05,0,-.35),e.add(N),n(-1.9,.6,.5,.5),n(2.05,-.35,.5,.5);let ee={x:-3.6,z:3.2,yaw:Math.atan2(-(M.position.x+3.6),-(M.position.z-3.2))};M.rotation.y=Math.atan2(ee.x-M.position.x,ee.z-M.position.z),N.rotation.y=Math.atan2(-1-N.position.x,2.5-N.position.z);let P=[{ch:M,yaw:M.rotation.y},{ch:N,yaw:N.rotation.y}],te={x:0,z:-1.85,yaw:0},F=[{id:`irina`,object:M},{id:`timur`,object:N},{id:`pc`,object:O},{id:`whiteboard`,object:m},{id:`coffee`,object:k}];function ne(e,t,n){for(let{ch:r,yaw:i}of P){if(Fd(r,t),n){let t=n.x-r.position.x,i=n.z-r.position.z;if(t*t+i*i<9){Id(r,n.x,n.z,e);continue}}Id(r,r.position.x+Math.sin(i),r.position.z+Math.cos(i),e*.5)}u.beacon.visible=Math.sin(t*2.2)>.2,A.emissiveIntensity=.6+.4*Math.sin(t*3)}return{scene:e,colliders:t,slots:F,spawn:ee,points:{pcView:te},objects:{irina:M,timur:N,pcScreen:E},update:ne}}var Yd=4.2,Xd=9;function Zd(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function Qd(e){return Math.sin(e*7.3)*.5+Math.sin(e*13.1+1.3)*.3+Math.sin(e*23.7+2.1)*.2}function $d(e,t,n,r){let i=new Gi(e,t,1,4),a=new U(n),o=new U(r),s=i.attributes.position,c=[];for(let e=0;e<s.count;e++){let n=(s.getY(e)+t/2)/t,r=a.clone().lerp(o,n**.6);c.push(r.r,r.g,r.b)}return i.setAttribute(`color`,new dr(c,3)),new qr(i,new Fr({vertexColors:!0,fog:!1,depthWrite:!1}))}function ef(e,t,n){let r=new Cr;r.setAttribute(`position`,new dr(e,3)),r.setAttribute(`color`,new dr(t,3)),r.setIndex(n);let i=new qr(r,new Fr({vertexColors:!0,transparent:!0,opacity:0,blending:2,depthWrite:!1,side:2,fog:!1}));return i.visible=!1,i}var tf=new qi(.05,.009,4,10);function nf(e,t){let n=new bn,r=2827810,i=new qr(tf,gd(r));i.position.y=-.05,n.add(i);let a=Md(.11,.08,r,0,-.17,0,4);a.rotation.y=Math.PI/4,n.add(a),n.add(Q(.16,.02,.16,r,0,-.19,0)),n.add(Q(.12,.2,.12,0,0,-.39,0,e)),n.add(jd(.028,0,0,-.31,0,5,t));for(let e of[-1,1])for(let t of[-1,1])n.add(Q(.018,.2,.018,r,e*.065,-.39,t*.065));return n.add(Q(.17,.04,.17,r,0,-.43,0)),n}function rf(e=2){let t=new bn,n=$.stationTrim;for(let n of[-.15,0,.15])t.add(Q(e,.05,.13,$.bench,0,.42,n));for(let n of[.6,.78]){let r=Q(e,.11,.04,$.bench,0,n,-.24);r.rotation.x=-.12,t.add(r)}for(let r of[-1,1]){let i=r*(e/2-.15);t.add(Q(.06,.42,.48,n,i,0,0)),t.add(Q(.06,.5,.05,n,i,.45,-.26)),t.add(Q(.06,.04,.46,n,i,.62,0))}return t}function af(){let e=new kn;e.background=new U($.sky),e.fog=new On($.sky,16,50);let t=[],n=(e,n,r,i)=>{let a={minX:e,maxX:n,minZ:r,maxZ:i};return t.push(a),a},r=(e,n,r,i)=>{let a=xd(e,n,r,i);return t.push(a),a},i=(t,n=e)=>(n.add(t),t);e.add(new Oa(4608636,2760214,.6));let a=new Ga(10466047,.5);a.position.set(-15,25,-30),e.add(a);let o=[{light:new Ha(16761978,11,7.5,2),base:11,pos:[-3.75,2.9,2.3]},{light:new Ha(16761978,12,10,2),base:12,pos:[3.25,2.9,2.3]}];for(let t of o)t.light.position.set(...t.pos),e.add(t.light);let s=new Ha(11066623,0,7,2);s.position.set(8.5,1.3,3.9),e.add(s);let c=Zd(11),l=$d(320,100,2501458,$.sky);l.position.set(0,14,-100),e.add(l),e.add(jd(4,0,-28,26,-92,10,new Fr({color:15986134,fog:!1}))),e.add(jd(6.5,0,-28,26,-93,10,new Fr({color:5923988,transparent:!0,opacity:.18,fog:!1,depthWrite:!1})));let u=new Fr({color:988456,fog:!1});[[-45,-80,34,14],[-10,-88,40,10],[30,-78,30,16],[60,-85,36,11],[-75,-75,30,9]].forEach(([e,t,n,r])=>{i(Md(n,r,0,e,-1.2,t,6,u))});{let t=new Float32Array(1140);for(let e=0;e<380;e++){let n=c()*Math.PI*2,r=.08+c()**.7*1.3;t[e*3]=Math.cos(n)*Math.cos(r)*120,t[e*3+1]=Math.sin(r)*120,t[e*3+2]=Math.sin(n)*Math.cos(r)*120-20}let n=new Cr;n.setAttribute(`position`,new cr(t,3)),e.add(new Ai(n,new Ti({color:14674175,size:1.6,sizeAttenuation:!1,fog:!1})))}i(Q(90,.2,30,1711386,0,-.21,11)),i(Q(90,.1,55,1448471,0,-1.25,-31.6)),i(Q(90,1.1,.4,2762790,0,-1.2,-4.3)),i(Q(90,.12,3.6,3420204,0,-1.2,-6.5));for(let e of[-5.75,-7.25])i(Q(90,.1,.07,8024426,0,-1.06,e));{let t=new ai(new Li(.22,.06,2.3),gd($.sleeper),128),n=new Gt;for(let e=0;e<128;e++)n.makeTranslation(-44.5+e*.7,-1.05,-6.5),t.setMatrixAt(e,n);e.add(t)}{let t=new ai(new Li(.08,1,.08),gd(2762018),46),n=new Gt;for(let e=0;e<46;e++)n.makeTranslation(-45+e*2,-.65,-9.8),t.setMatrixAt(e,n);e.add(t);for(let e of[-.85,-.35])i(Q(90,.05,.04,2762018,0,e,-9.8))}{let t=[];for(let e=0;e<44;e++)t.push([-44+e*2+c()*1.2,-1.15,-12-c()*7]);for(let e=0;e<10;e++)t.push([12+c()*10,-.05,-2+c()*12]);for(let e=0;e<10;e++)t.push([-15-c()*9,-.05,-2+c()*12]);let n=new ai(new zi(1,1,5),gd(1253661),t.length),r=new Gt,i=new xt;t.forEach(([e,t,a],o)=>{let s=1.1+c()*1.4,l=3+c()*4;r.compose(new H(e,t+l/2,a),i,new H(s,l,s)),n.setMatrixAt(o,r)}),e.add(n)}i(Ad(.06,.06,3.2,2762018,8.5,-1.15,-8.8,6)),i(Q(.25,.5,.2,1710618,8.5,1.6,-8.8)),i(jd(.07,0,8.5,1.95,-8.68,6,new Fr({color:6094746,fog:!1}))),i(Q(18.4,1.2,3.1,$.platform,0,-1.2,-2.55)),i(Q(18.4,.02,.3,8750474,0,0,-3.95)),i(Q(18.4,.025,.18,$.platformEdge,0,0,-3.72)),n(-9.4,9.4,-4.4,-3.8);for(let e of[-1,1]){let t=e*9.15;for(let e of[-3.9,-2.5,-1.1])i(Q(.08,1,.08,$.stationTrim,t,0,e));for(let e of[.5,.95])i(Q(.05,.05,2.9,$.stationTrim,t,e,-2.5))}let d=new Fr({color:16769704});for(let e of[-6.8,6.8])i(Ad(.05,.07,3,$.stationTrim,e,0,-2.6,6)),i(Q(.1,.1,.1,$.stationTrim,e,2.95,-2.6)),i(jd(.16,0,e,3.18,-2.6,8,d)),r(e,-2.6,.3,.3);i(Q(18,.02,8,$.stationFloor,0,0,3));{let t=[];for(let e=0;e<18;e++)for(let n=0;n<8;n++)(e+n)%2==0&&t.push([-8.5+e,-.5+n]);let n=new ai(new Li(1,.004,1),gd(Nd($.stationFloor,.84)),t.length),r=new Gt;t.forEach(([e,t],i)=>{r.makeTranslation(e,.021,t),n.setMatrixAt(i,r)}),e.add(n)}let f=gd($.stationWall);i(Q(18.6,Yd,.3,0,0,0,7.15,f)),n(-9.4,9.4,7,7.4),i(Q(.3,Yd,2.85,0,-9.15,0,.425,f)),i(Q(.3,Yd,4.15,0,-9.15,0,5.225,f)),i(Q(.3,1.9500000000000002,1.3,0,-9.15,2.25,2.5,f)),n(-9.4,-9,-4.4,1.85),n(-9.4,-9,3.15,7.4),i(Q(.3,Yd,4.15,0,9.15,0,.925,f)),i(Q(.3,Yd,3.3,0,9.15,0,5.65,f)),i(Q(.3,2.0500000000000003,1,0,9.15,2.15,3.5,f)),n(Xd,9.4,-4.4,7.4);let p=$.stationTrim;i(Q(18,1,.04,p,0,0,6.98)),i(Q(18,.06,.07,$.wood,0,1,6.965)),i(Q(18.2,.15,.1,p,0,3.7,6.95));for(let e of[-1,1]){let t=e*8.98,n=e<0?[[-1,1.75],[3.25,7]]:[[-1,2.92],[4.08,7]];for(let[e,r]of n)i(Q(.04,1,r-e,p,t,0,(e+r)/2)),i(Q(.07,.06,r-e,$.wood,t,1,(e+r)/2));i(Q(.1,.15,8,p,e*8.95,3.7,3))}i(Q(18.6,.2,9.8,p,0,Yd,2.3));for(let e of[-.95,1.4,3.8,6.2])i(Q(18.3,.22,.18,$.wood,0,3.98,e));for(let e of[-6,-2,2,6])i(Ad(.11,.13,3.98,p,e,0,-1,8)),i(Q(.36,.2,.36,p,e,0,-1)),i(Q(.34,.12,.34,p,e,3.8600000000000003,-1)),r(e,-1,.4,.4);i(Q(3.7,.62,.08,p,0,3.15,-.95));for(let e of[-1.5,1.5])i(Ad(.012,.012,.3,1710618,e,3.76,-.95,4));{let e={width:3.5,height:.52,bg:`#5b1a24`,fg:`#f2e6c8`,font:`bold 170px serif`,pad:48},t=Cd(`Станция Рассвет`,e);t.position.set(0,3.46,-1),t.rotation.y=Math.PI,i(t);let n=Cd(`Станция Рассвет`,e);n.position.set(0,3.46,-.9),i(n)}let m=[];for(let e of[-5.5,-2,1.5,5]){let t=_d($.lamp,{emissive:$.lamp,emissiveIntensity:1});m.push(t),i(Ad(.012,.012,3.98-3.24,1710618,e,3.24,2.3,4)),i(Md(.34,.24,3099196,e,3,2.3,8)),i(Ad(.3,.3,.01,0,e,2.99,2.3,8,t)),i(jd(.09,0,e,2.95,2.3,6,t))}for(let[t,n]of[[-2.2,.7],[1.8,.7],[-.6,3.1],[-4,-1.85]]){let i=rf();i.position.set(t,0,n),i.rotation.y=Math.PI,e.add(i),r(t,n,2,.62)}let h=new bn;h.position.set(3,1,3);let g=rf();g.position.y=-.45,h.add(g),h.add(Dd(2.1,.9,.7,0,0,0)),e.add(h),r(3,3,1.5,1.5);let _=[$.glitchCyan,$.glitchPink].map(t=>{let n=new bn,r=new Fr({color:t,transparent:!0,opacity:.22,blending:2,depthWrite:!1});return n.add(Q(2,.08,.45,0,0,-.03,0,r)),n.add(Q(2,.3,.04,0,0,.13,-.24,r)),n.visible=!1,e.add(n),n}),v=new bn;v.position.set(.8,2.75,6.95);{let e=Ad(.9,.9,.1,p,0,0,0,16);e.rotation.x=Math.PI/2,e.position.set(0,0,0),v.add(e);let t=Ad(.8,.8,.02,0,0,0,0,16,gd($.clockFace,{emissive:3814440}));t.rotation.x=Math.PI/2,t.position.set(0,0,-.055),v.add(t);for(let e=0;e<12;e++){let t=e/12*Math.PI*2,n=e%3==0,r=Q(n?.05:.03,n?.14:.09,.01,2761760,0,0,0);r.position.set(Math.sin(t)*.68,Math.cos(t)*.68,-.07),r.rotation.z=-t,v.add(r)}let n=Cd(`РАССВЕТ`,{width:.36,height:.08,transparentBg:!0,fg:`#3f2e25`,font:`bold 180px serif`});n.position.set(0,-.3,-.07),n.rotation.y=Math.PI,v.add(n)}let y=(e,t,n,r)=>{let i=new bn;return i.position.z=r,i.add(Q(e,t,.012,n,0,-.08,0)),v.add(i),i},b=y(.06,.45,1972760,-.08),x=y(.04,.68,1972760,-.09),S=y(.015,.74,12597547,-.1),C=Ad(.04,.04,.04,1972760,0,0,0,8);C.rotation.x=Math.PI/2,C.position.z=-.11,v.add(C),v.add(Dd(1.8,1.8,.25,0,0,-.05)),e.add(v),i(Q(2.36,1.42,.06,p,5,1.6,6.97));{let e=Cd(`РАСПИСАНИЕ ПОЕЗДОВ
01:10  на Полдень     по графику
02:45  на Туман       задержан
03:17  Сборка 0.9.3   отменён
05:30  Утренний       по графику`,{width:2.2,height:1.3,bg:`#141a22`,fg:`#ffcf7a`,font:`bold 50px monospace`,align:`left`,pad:40,lineHeight:1.45});e.position.set(5,2.31,6.935),e.rotation.y=Math.PI,i(e)}{let e=Cd(`НЕ ЗАБЫВАЙТЕ
СВОИ ВЕЩИ`,{width:.8,height:.6,bg:`#e8dcc0`,fg:`#5a2f22`,font:`bold 120px sans-serif`});e.position.set(-1.9,1.95,6.975),e.rotation.y=Math.PI,i(e)}for(let[e,t]of[[-3.65,.7],[4.2,-.4],[7.8,.6]])i(Ad(.2,.16,.6,3425594,e,0,t,8)),i(Ad(.22,.22,.04,2503467,e,.6,t,8)),r(e,t,.45,.45);i(Q(.45,.6,.2,8010538,3.15,0,.75)),i(Q(.16,.04,.04,2761760,3.15,.6,.75)),r(3.15,.75,.5,.3);for(let e of[8.35,-8.35]){i(Ad(.25,.2,.45,9062958,e,0,6.4,7));for(let[t,n,r,a]of[[0,.85,0,.32],[.15,1.15,.05,.24],[-.12,1.1,-.06,.22]])i(jd(a,$.plant,e+t,n,6.4+r,5));r(e,6.4,.55,.55)}let w=$.wood;for(let e of[-6.25,-3.15])i(Q(.3,2.6,.3,w,e,0,4.15));i(Q(.1,2.6,2.7,Nd(w,.8),-6.3,0,5.65)),i(Q(.1,2.6,2.7,Nd(w,.8),-3.1,0,5.65)),i(Q(3.7,.15,3.25,p,-4.7,2.6,5.45)),i(Q(3.6,.42,.06,p,-4.7,2.28,3.92));{let e=Cd(`Смотритель`,{width:1.6,height:.32,bg:`#3f2e25`,fg:`#f2d9a6`,font:`bold 150px serif`});e.position.set(-4.7,2.49,3.885),e.rotation.y=Math.PI,i(e)}i(Q(2.8,1,.55,w,-4.7,0,4.35)),i(Q(3,.05,.72,p,-4.7,1,4.36));for(let e of[-5.65,-4.7,-3.75])i(Q(.78,.6,.02,$.bench,e,.2,4.07));i(Ad(.06,.07,.02,9075290,-5.4,1.05,4.3,8)),i(jd(.05,13148240,-5.4,1.09,4.3,6)),i(Ad(.03,.035,.05,1710634,-3.65,1.05,4.25,6)),i(Q(2.6,.04,.3,w,-4.7,1.45,6.82)),i(Q(.3,.2,.18,5913130,-5.6,1.49,6.85)),i(Ad(.07,.08,.16,8030858,-4.9,1.49,6.85,7)),i(jd(.07,0,-3.8,1.6,6.85,6,gd($.lamp,{emissive:$.lamp,emissiveIntensity:.9})));for(let e=0;e<4;e++)i(Q(.05,.24,.18,[8007471,2902650,3824186,9071162][e],-4.35+e*.07,1.49,6.85));i(Q(.5,.35,.03,w,-5.6,1.75,6.97));for(let e=0;e<3;e++)i(Q(.03,.08,.01,13148240,-5.75+e*.15,1.8,6.95));n(-6.45,-2.95,4,7);let T=_d($.book),E=_d(15919832),D=new bn;D.position.set(-4.05,1.05,4.32),D.rotation.y=.18,D.add(Q(.34,.06,.26,0,0,0,0,T)),D.add(Q(.33,.045,.24,0,.012,.008,0,E)),D.add(Q(.015,.002,.14,12597547,.08,.06,.15));{let e=Cd(`ЖУРНАЛ`,{width:.22,height:.06,bg:`#7a2f2f`,fg:`#e8c66a`,font:`bold 200px serif`});e.rotation.set(-Math.PI/2,0,Math.PI),e.position.set(0,.062,0),D.add(e)}D.add(Dd(.5,.25,.42,0,.1,0)),e.add(D);let O=D.position.clone(),k=new bn;k.position.set(-6.25,0,4),k.add(Q(.1,.14,.02,2827810,0,1.56,-.01)),k.add(Q(.025,.025,.15,2827810,0,1.64,-.085)),k.add(Q(.025,.06,.025,2827810,0,1.64,-.16)),k.add(Dd(.28,.24,.22,0,1.66,-.1)),e.add(k),n(-6.45,-6.05,3.6,4.3);let A=gd(16767392,{emissive:16752704,emissiveIntensity:.55,opacity:.85}),j=gd(16770720,{emissive:16760928,emissiveIntensity:1}),M=nf(A,j);M.position.set(-6.25,1.69,3.84),M.add(Dd(.36,.56,.36,0,-.24,0)),e.add(M);let N=Pd({name:`Лис`,extra:`lis`});N.position.set(-4.7,0,5.35),N.rotation.y=Math.PI,e.add(N);let ee=Math.PI,P={minX:-13,maxX:-9.3,minZ:.65,maxZ:4.35},te=gd(3024676);i(Q(3.75,.02,3.75,2301210,-11.15,0,2.5)),i(Q(4.3,3.2,.3,0,-11.15,0,.5,te)),i(Q(4.3,3.2,.3,0,-11.15,0,4.5,te)),i(Q(.3,3.2,4.3,0,-13.15,0,2.5,te)),i(Q(4.4,.15,4.4,p,-11.15,3.2,2.5)),n(-13.4,-9,.3,.65),n(-13.4,-9,4.35,4.7),n(-13.4,-13,.3,4.7);{let t=4075040,a=[],o=Zd(5);for(let[e,n]of[[.875,-1],[4.125,1]]){for(let n of[-12.5,-11.1,-9.7])i(Q(.05,2.25,.45,t,n,0,e));for(let n of[.1,.65,1.2,1.75,2.22])i(Q(2.85,.04,.45,t,-11.1,n,e));i(Q(2.85,2.25,.02,Nd(t,.8),-11.1,0,e+n*.215));for(let t of[.14,.69,1.24,1.79]){let n=-12.45;for(;n<-9.8;){let r=.28+o()*.3;if(n+r>-9.75)break;if(o()>.18){let i=.18+o()*.28,s=.28+o()*.1;a.push([n+r/2,t,e,r*.92,i,s])}n+=r+.03}}}i(Q(.45,.95,1.8,t,-12.775,0,2.5)),i(Q(.5,.04,1.85,Nd(t,1.2),-12.775,.95,2.5)),a.push([-12.8,.99,1.9,.4,.3,.38],[-12.75,.99,2.9,.35,.22,.4],[-9.75,0,3.55,.5,.5,.5],[-9.75,.5,3.55,.42,.36,.42]),i(Q(.12,.42,.55,4860450,-12.75,.99,2.35));let s=[6967862,5916208,8020032,9077880,5127208],c=new ai(new Li(1,1,1),gd(16777215),a.length),l=new Gt,u=new xt,d=new U;a.forEach(([e,t,n,r,i,a],o)=>{l.compose(new H(e,t+i/2,n),u,new H(r,i,a)),c.setMatrixAt(o,l),d.setHex(s[o%s.length]),c.setColorAt(o,d)}),e.add(c),n(-12.9,-9.65,.65,1.12),n(-12.9,-9.65,3.88,4.35),n(-13,-12.5,1.55,3.45),r(-9.75,3.55,.55,.55),i(Ad(.01,.01,.6,1710618,-11.15,2.6,2.5,4)),i(jd(.06,3815478,-11.15,2.56,2.5,6))}let F=Cd(`н.о. 0.9.3
журнал тут был`,{width:2,height:.8,transparentBg:!0,fg:`#f4f1e8`,font:`bold 100px "Segoe Print", "Comic Sans MS", cursive`});F.material.opacity=0,F.material.depthWrite=!1,F.visible=!1,F.position.set(-12.985,1.85,2.5),F.rotation.set(0,Math.PI/2,-.04),e.add(F);let ne=new bn;ne.add(Dd(.12,1.2,2,-12.94,1.85,2.5)),e.add(ne);let re=6965808,ie=new bn;ie.position.set(-9.15,0,1.85),ie.add(Q(.06,2.2,1.3,re,0,0,.65));for(let e of[-1,1])ie.add(Q(.01,.8,.95,Nd(re,1.18),e*.034,.25,.65)),ie.add(Q(.01,.75,.95,Nd(re,1.18),e*.034,1.25,.65)),ie.add(Q(.04,.03,.14,13148240,e*.055,1,1.12));e.add(ie),i(Q(.1,2.3,.1,p,-8.97,0,1.8)),i(Q(.1,2.3,.1,p,-8.97,0,3.2)),i(Q(.1,.1,1.5,p,-8.97,2.25,2.5));{let e=Cd(`Архив`,{width:.8,height:.22,bg:`#3f2e25`,fg:`#f2d9a6`,font:`bold 150px serif`});e.position.set(-8.98,2.6,2.5),e.rotation.y=Math.PI/2,i(e)}let ae=n(-9.3,-9,1.85,3.15),oe=new Fr({color:14217983,fog:!1});i(Q(.5,2.15,1,0,9.55,0,3.5,oe));let se=new bn;se.position.set(8.97,0,2.97),se.add(Q(.05,2.2,1.06,$.serviceDoor,0,0,.53));let I=new bn;{let e=Nd($.serviceDoor,.7),t=-.028;I.add(Q(.006,.05,.9,e,t,1.95,.53)),I.add(Q(.006,.05,.9,e,t,.12,.53)),I.add(Q(.006,1.88,.05,e,t,.12,.1)),I.add(Q(.006,1.88,.05,e,t,.12,.96)),I.add(Q(.006,.42,.5,9413816,t,1.35,.53)),I.add(Q(.006,.05,.16,2830648,t,1,.86));for(let e of[.35,1.8])I.add(Q(.006,.12,.03,2830648,t,e,.03))}se.add(I);let L=new bn;{let e=Nd($.serviceDoor,1.15),t=12106946;L.add(Q(.02,.62,.84,e,-.03,.18,.53)),L.add(Q(.02,.05,.84,Nd($.serviceDoor,.8),-.03,.95,.53)),L.add(Q(.012,.5,.56,3817286,-.03,1.12,.53)),L.add(Q(.014,.42,.48,0,-.031,1.16,.53,gd(16769720,{emissive:16763016,emissiveIntensity:.75}))),L.add(Q(.008,.16,.96,9080984,-.03,.02,.53)),L.add(Q(.012,.2,.07,t,-.032,.9,.92)),L.add(Q(.05,.035,.035,t,-.06,1,.92)),L.add(Q(.03,.03,.15,t,-.09,1,.86)),L.add(Q(.012,.03,.02,1710618,-.034,.86,.92));for(let e of[.3,1.85])L.add(Q(.035,.14,.035,t,-.03,e,.015))}se.add(L),e.add(se);let ce=new bn;{let e=3817286;ce.add(Q(.06,2.3,.1,e,8.95,0,2.92)),ce.add(Q(.06,2.3,.1,e,8.95,0,4.08)),ce.add(Q(.06,.1,1.26,e,8.95,2.2,3.5));let t=new Fr({color:16767392,fog:!1});ce.add(Q(.03,.012,1,0,8.93,0,3.5,t)),ce.add(Q(.012,2.05,.012,0,8.945,.05,4.02,t));let n=new U(16763016),r=ef([8.98,.026,3,8.98,.026,4,8.25,.026,2.85,8.25,.026,4.15],[n.r,n.g,n.b,n.r,n.g,n.b,0,0,0,0,0,0],[0,1,2,1,3,2]);r.material.opacity=.4,r.visible=!0,ce.add(r)}e.add(ce);let le=Cd(`Служебный выход`,{width:1.3,height:.24,bg:`#2b3138`,fg:`#e8edf2`,font:`bold 120px sans-serif`});le.position.set(8.985,2.42,3.5),le.rotation.y=-Math.PI/2,i(le);let ue=Cd(`Диагностика`,{width:1.3,height:.24,bg:`#2b3138`,fg:`#f2e6c8`,font:`bold 120px sans-serif`});ue.position.set(8.92,2.45,3.5),ue.rotation.y=-Math.PI/2,i(ue);let de=new U(10475775),fe=ef([9,.03,3.9,9,.03,4.02,5.6,.03,3.1,5.6,.03,5.2],[de.r,de.g,de.b,de.r,de.g,de.b,0,0,0,0,0,0],[0,1,2,1,3,2]),pe=ef([9,0,3.97,9,2.15,3.97,7.2,0,4.4,7.2,2.6,4.4],[de.r*.6,de.g*.6,de.b*.6,de.r*.6,de.g*.6,de.b*.6,0,0,0,0,0,0],[0,1,2,1,3,2]);e.add(fe,pe);let me=new bn;me.position.set(5.3,0,3.5),me.rotation.y=Math.PI/2,me.add(Q(.72,.06,.5,1909288,0,0,-.05)),me.add(Q(.7,.85,.45,$.terminal,0,0,-.05)),me.add(Q(.66,.04,.28,3818059,0,.85,.2)),me.add(Q(.5,.025,.16,1382686,0,.89,.2));{let e=new bn;e.position.set(0,1.25,-.1),e.rotation.x=-.15,e.add(Q(.7,.54,.14,$.terminal,0,-.27,0));let t=Cd(`ТЕРМИНАЛ
ДЕЖУРНОГО

> архив сборки_`,{width:.6,height:.44,bg:`#06170f`,fg:`#63e6a8`,font:`bold 92px monospace`});t.position.set(0,0,.072),e.add(t),e.add(jd(.035,0,.29,.3,0,6,gd(16756810,{emissive:16756810,emissiveIntensity:1}))),me.add(e)}me.add(Q(.04,.9,.04,1382686,.3,0,-.3)),e.add(me),n(5,5.65,3.12,3.88);let he={x:0,z:-2,yaw:((e,t,n,r)=>Math.atan2(-(n-e),-(r-t)))(0,-2,N.position.x,N.position.z)},ge={terminalView:{x:6.2,z:3.5,yaw:Math.PI/2},lisTalk:{x:-4.7,z:3,yaw:Math.PI},serviceReturn:{x:7.8,z:3.5,yaw:Math.PI/2},serviceDoorFront:{x:7.8,z:3.5,yaw:-Math.PI/2}},_e={counter:{pos:[-4.5,1.8,2.5],look:[-4.1,1.05,4.3]},hook:{pos:[-5.5,1.65,2.6],look:[-6.25,1.35,3.9]},archiveDoor:{pos:[-6.3,1.7,3.3],look:[-9.1,1.2,2.5]},archiveInside:{pos:[-9.7,1.65,2.5],look:[-12.6,1.2,2.5]},serviceDoor:{pos:[6.2,1.7,2.2],look:[9,1.1,3.5]},wide:{pos:[6.8,3.3,-2.6],look:[-3,.8,3.8]}},ve=.44,R={archOpen:!1,archAngle:0,archPendingCollider:!1,serviceOpen:!1,serviceAngle:0,chalkTarget:0,journalFx:0,lastPlayer:null,jitter:0,jitterT:.4,lastT:0,build:`0.9.7`},ye=null;function be(){D.position.copy(O),D.scale.set(1,1,1),T.color.setHex($.book),T.emissive.setHex(0),E.color.setHex(15919832)}function xe(e){let t=R.lastPlayer;if(!t)return!1;let n=.3;return t.x+n>e.minX&&t.x-n<e.maxX&&t.z+n>e.minZ&&t.z-n<e.maxZ}let Se={resetState(){Se.setJournalVisible(!0),Se.setLanternOnHook(!0),R.archOpen=!1,R.archAngle=0,ie.rotation.y=0,R.archPendingCollider=!0,xe(ae)||(ae.enabled=!0,R.archPendingCollider=!1),R.chalkTarget=0,F.material.opacity=0,F.visible=!1},setLanternOnHook(e){M.visible=!!e},setJournalVisible(e,{glitch:t=!1}={}){e?(R.journalFx=0,be(),D.visible=!0):t&&D.visible?R.journalFx=1e-4:(R.journalFx=0,be(),D.visible=!1)},openArchiveDoor(){R.archOpen=!0,R.archPendingCollider=!1,ae.enabled=!1},closeArchiveDoor(){R.archOpen=!1,R.archPendingCollider=!0},isArchiveOpen(){return R.archOpen},openServiceDoor(){R.serviceOpen=!0},closeServiceDoor(){R.serviceOpen=!1},setChalkVisible(e){R.chalkTarget=+!!e},setBuild(e){if(e!==`0.9.3`&&e!==`0.9.5`&&e!==`0.9.7`)return;R.build=e;let t=e===`0.9.3`;I.visible=!t,L.visible=ce.visible=t,le.visible=!t,ue.visible=t,s.color.setHex(t?16767144:11066623),oe.color.setHex(t?16771272:14217983),we(0,R.lastT,null)},getBuild(){return R.build},makeHandLantern(){if(ye)return ye;let e=gd(16769712,{emissive:16754760,emissiveIntensity:1.1,opacity:.9}),t=gd(16773312,{emissive:16765040,emissiveIntensity:1.4}),n=new bn;n.name=`handLantern`;let r=nf(e,t);r.scale.setScalar(.85),n.add(r);let i=new Ha(16756832,3.4,6,1.6);return i.position.set(0,-.26,-.05),n.add(i),n.position.set(.32,-.06,-.7),n.userData.light=i,n.userData.baseIntensity=3.4,ye=n,n}},Ce=[{id:`lis`,object:N},{id:`lantern`,object:M},{id:`hook`,object:k},{id:`journal`,object:D},{id:`archive_door`,object:ie},{id:`service_door`,object:se},{id:`clock`,object:v},{id:`bench`,object:h},{id:`terminal`,object:me},{id:`chalk_wall`,object:ne}];function we(e,t,n){e=Math.min(e||0,.1),n&&(R.lastPlayer={x:n.x,z:n.z}),R.lastT=t||0;let r=Math.PI*2,i=R.build===`0.9.3`?1:-1;if(S.rotation.z=.4+i*Math.floor(t)*(r/60),x.rotation.z=2.1+i*t*(r/600),b.rotation.z=-.6+i*t*(r/7200),R.build!==`0.9.7`)h.position.set(3,.45,3),h.rotation.set(0,Math.PI,0),_.forEach(e=>e.visible=!1);else{R.jitterT-=e,R.jitterT<=0&&(R.jitter=.08+Math.random()*.1,R.jitterT=.5+Math.random()*1.6);let n=R.jitter>0;n&&(R.jitter-=e),h.position.set(3+(n?(Math.random()-.5)*.04:0),1+Math.sin(t*1.6)*.06+(n?(Math.random()-.5)*.03:0),3+(n?(Math.random()-.5)*.04:0)),h.rotation.set(Math.sin(t*.8)*.04,t*.35,Math.sin(t*1.1)*.06),_.forEach((e,t)=>{e.visible=n,n&&(e.position.copy(h.position),e.position.x+=t?-.05:.05,e.rotation.copy(h.rotation))})}if(o.forEach((e,n)=>{e.light.intensity=e.base*(.95+.04*Qd(t*1.3+n*4))}),m.forEach((e,n)=>{let r=.95+.05*Qd(t*1.3+n*2.7);n===3&&Math.sin(t*.7)*Math.sin(t*1.9)>.82&&(r*=Math.random()>.5?.25:1),e.emissiveIntensity=r}),j.emissiveIntensity=.85+.15*Qd(t*2.1),ye&&(ye.userData.light.intensity=ye.userData.baseIntensity*(.92+.06*Qd(t*2.3))),Fd(N,t),n&&(n.x-N.position.x)**2+(n.z-N.position.z)**2<9?Id(N,n.x,n.z,e):Id(N,N.position.x+Math.sin(ee),N.position.z+Math.cos(ee),e*.5),R.journalFx>0){R.journalFx+=e;let t=R.journalFx/.6;if(t>=1)R.journalFx=0,be(),D.visible=!1;else{D.visible=Math.random()>t*.7,D.position.set(O.x+(Math.random()-.5)*.08*t,O.y,O.z+(Math.random()-.5)*.04),D.scale.set(1+(Math.random()-.5)*.5*t,1,1-(Math.random()-.5)*.3*t);let e=[$.book,$.glitchPink,$.glitchCyan][Math.floor(Math.random()*3)];T.color.setHex(e),T.emissive.setHex(e===$.book?0:e),E.color.setHex(Math.random()>.5?15919832:$.glitchCyan)}}let a=R.archOpen?1.45:0;R.archAngle+=(a-R.archAngle)*(1-Math.exp(-6*e)),Math.abs(a-R.archAngle)<.002&&(R.archAngle=a),ie.rotation.y=R.archAngle,R.archPendingCollider&&!xe(ae)&&(ae.enabled=!0,R.archPendingCollider=!1);let c=R.serviceOpen?ve:0;R.serviceAngle+=(c-R.serviceAngle)*(1-Math.exp(-2.5*e)),se.rotation.y=R.serviceAngle;let l=R.serviceAngle/ve;s.intensity=l*5*(.94+.06*Qd(t*.9)),fe.visible=pe.visible=l>.01,fe.material.opacity=l*.55,pe.material.opacity=l*.3;let u=F.material;if(u.opacity!==R.chalkTarget){let t=e/1.2;u.opacity=R.chalkTarget>u.opacity?Math.min(R.chalkTarget,u.opacity+t):Math.max(R.chalkTarget,u.opacity-t)}F.visible=u.opacity>.001}return Se.setBuild(`0.9.7`),{scene:e,colliders:t,slots:Ce,spawn:he,zones:{archive:P},points:ge,cams:_e,api:Se,objects:{lis:N,journal:D,lantern:M,archiveDoor:ie,serviceDoor:se,terminal:me,clock:v,bench:h,hook:k,chalk:F},update:we}}var of=Object.fromEntries([{id:`gl_first_bug`,title:`Первый баг`,description:`Твой первый отчёт об ошибке приняли`},{id:`gl_reproduced`,title:`Воспроизвёл`,description:`Повторил ошибку по шагам из журнала действий`},{id:`gl_clean_report`,title:`Отчёт с первого раза`,description:`Отчёт об исчезновении журнала приняли без доработки`},{id:`gl_duplicate`,title:`Тот же профиль`,description:`Сравнил свой отчёт со старым и нашёл совпадение`},{id:`gl_evidence`,title:`Доказательство сохранено`,description:`Сохранил запись и старый отчёт в терминале`},{id:`gl_chapter1`,title:`Первый рабочий день`,description:`Прошёл главу 1`},{id:`gl_not_a_bug`,title:`Это не баг`,description:`Проверил по документации, что часы идут назад специально`},{id:`gl_chalk`,title:`След в темноте`,description:`Нашёл надпись мелом в архиве при свете фонаря`},{id:`gl_side_bugs`,title:`Глаз-алмаз`,description:`Осмотрел обе странности в зале: скамейку и часы`},{id:`gl_team`,title:`Знакомство с командой`,description:`Поговорил с разработчиком Тимуром`},{id:`gl_coffee`,title:`Перерыв на кофе`,description:`Заглянул к кофемашине в офисе`},{id:`gl_lis_friend`,title:`Собеседник Лиса`,description:`Поговорил с Лисом три раза`},{id:`gl_careful`,title:`Аккуратный тестировщик`,description:`Вернул фонарь на крюк`},{id:`gl_nikita_record`,title:`Запись Никиты`,description:`Посмотрел запись предыдущего тестировщика`},{id:`gl_all_evidence`,title:`Все улики`,description:`Собрал 4 улики из 4`},{id:`gl_perfect`,title:`Без ошибок`,description:`Прошёл главу, и ни один отчёт не вернули`},{id:`gl_fast`,title:`Быстрая смена`,description:`Прошёл главу 1 за 6 минут или быстрее`},{id:`gl_three_stars`,title:`Три звезды`,description:`Получил 3 звезды за главу`},{id:`gl_no_hints`,title:`Сам разобрался`,description:`Прошёл главу 1 без подсказок Ирины`},{id:`gl_switcher`,title:`Переключатель сборок`,description:`Взял прибор Никиты в комнате, которой нет`},{id:`gl_stranger`,title:`Незнакомец`,description:`Поговорил с Лисом в сборке 0.9.3, где он тебя ещё не знает`},{id:`gl_all_diffs`,title:`Полная таблица`,description:`Нашёл все 5 различий между сборками`},{id:`gl_bisect`,title:`Бисекция`,description:`С первой попытки назвал сборку, где появилась причина ошибки`},{id:`gl_feature_check`,title:`Фича, а не баг`,description:`С первой попытки отличил изменение по документации от бага`},{id:`gl_chapter2`,title:`Комната, которой нет`,description:`Прошёл главу 2`},{id:`gl_detective`,title:`Детектив`,description:`С первой попытки восстановил порядок событий по следам Никиты`},{id:`gl_console`,title:`Отладчик`,description:`Впервые воспользовался консолью отладки`},{id:`gl_nikita_wrong`,title:`Никита ошибался`,description:`Опроверг гипотезу «Лис учится»`},{id:`gl_hypotheses`,title:`Проверено`,description:`Вынес верные вердикты по всем гипотезам без ошибок`},{id:`gl_autotest`,title:`Автоматизатор`,description:`Собрал рабочий автотест AT-08 с первого запуска`},{id:`gl_chapter3`,title:`След найден`,description:`Прошёл главу 3`},{id:`gl_retest`,title:`Ретест`,description:`Прошёл чек-лист проверки исправления без ошибок`},{id:`gl_regression`,title:`Регрессия`,description:`Нашёл, что исправление сломало память Лиса`},{id:`gl_best_ending`,title:`Воспроизводится`,description:`Получил лучшую концовку: релиз перенесли, причину исправили`},{id:`gl_saved_lis`,title:`Хранитель журнала`,description:`Сохранил журнал Лиса`},{id:`gl_chapter4`,title:`Последняя сборка`,description:`Прошёл финальную главу`}].map(e=>[e.id,e.title])),sf=[[`start`,`office`,0],[`met_irina`,`briefing`,8],[`entered_station`,`station`,15],[`met_lis`,`lis`,22],[`bench_reported`,`first_report`,30],[`journal_gone`,`journal_gone`,42],[`replay_ok`,`reproduced`,55],[`journal_reported`,`reported`,65],[`compared`,`duplicate`,75],[`evidence_saved`,`evidence_saved`,85],[`door_opened`,`door`,95],[`chapter_done`,`end`,100]],cf={gl_ch1_thorough:{title:`Внимательная смена`,heroes:e=>[{name:`Ирина Белова`,text:`Перечитала твой отчёт два раза. Утром она впервые за месяц откроет старый отчёт #0412.`},{name:`Тимур Сафин`,text:`Остался в офисе до ночи. Ищет строчку, которой не должно быть в сборке.`},{name:`Никита Орлов`,text:`Ещё не знает, что его надпись в архиве нашли. Но его запись наконец кто-то сохранил.`},lf(e)]},gl_ch1_standard:{title:`Смена закрыта`,heroes:e=>[{name:`Ирина Белова`,text:`Приняла отчёт. Про #0412 пока ничего не сказала.`},{name:`Тимур Сафин`,text:`Обещал посмотреть утром. Но уходить домой не спешит.`},{name:`Никита Орлов`,text:`Его запись сохранена. Следы в архиве пока никто не нашёл.`},lf(e)]}};function lf(e){return e.gl_reported_lis?{name:`Лис`,text:`Ждёт у будки. Он заметил, что ты всё-таки отправил отчёт о нём. И всё равно ждёт.`}:{name:`Лис`,text:`Снова собирает журнал. Кажется, он рад, что ты вернулся.`}}var uf={irinaBrief:[{who:`irina`,text:`Ты {name}? Отлично. Я Ирина, руковожу тестированием.`},{who:`irina`,text:`Завтра релиз «Станции Рассвет». Твоя задача: найти, где игра ведёт себя не так, как написано в документации.`},{who:`irina`,text:`Нашёл странность, повтори её. Не повторяется, значит пока это не баг. Твой компьютер у окна.`}],irinaAgain:[{who:`irina`,text:`Компьютер у окна. Профиль tester_02, его вчера сделали админы.`}],irinaLater:[{who:`irina`,text:`Работай. Я тут, если что.`}],timurFirst:[{who:`timur`,text:`О, новенький тестировщик! Я Тимур, пишу системы. Сохранения, перенос, вот это всё.`},{who:`timur`,text:`Если что-то сломается, это не мой код. Ну, скорее всего не мой.`},{who:`timur`,text:`Перенос состояния между сборками, кстати, моя гордость. Обновил игру, а прогресс на месте. Красиво же?`,options:[{text:`Красиво.`,next:[{who:`timur`,text:`Вот! Хоть кто-то ценит.`}]},{text:`А если что-то перенесётся лишнее?`,next:[{who:`timur`,text:`Лишнее… Не перенесётся. Наверное. Иди работай, а?`}]}]}],timurAgain:[{who:`timur`,text:`Нашёл баг, сразу пиши. Только с шагами, пожалуйста. «Что-то странное» я не чиню.`}],pcLocked:[{who:`me`,text:`Сначала стоит представиться Ирине.`}],whiteboard:[{who:`me`,text:`«РЕЛИЗ ЗАВТРА. Сборка 0.9.7». Ниже мелко: «демо издателю в четверг, 10:00».`}],coffee:[{who:`me`,text:`Кофемашина. На ней записка: «Не работает с 0.9.3». Похоже, это шутка про сборки.`}],lisIntro:[{who:`lis`,text:`{name}.`},{who:`lis`,text:`Ты уже проверял эту дверь. В прошлой сборке. Пожалуйста, в этот раз не отправляй отчёт.`},{who:`lis`,text:`…`,options:[{text:`Мы знакомы?`,next:[{who:`lis`,text:`Ты в прошлый раз обещал вернуться. Хотя… куртка у тебя была другая.`}]},{text:`Какую дверь?`,next:[{who:`lis`,text:`Ту, в архив. Ты всегда идёшь туда с фонарём.`}]},{text:`Я здесь впервые.`,next:[{who:`lis`,text:`Все так говорят после обновления.`}]}]},{who:`lis`,text:`Если пойдёшь в архив, возьми фонарь с крюка. Там темно. Только журнал не трогай, я его каждый раз заново собираю.`}],lisAfterGone:[{who:`lis`,text:`Опять. Я же просил.`},{who:`lis`,text:`Я соберу его заново. Я всегда собираю.`}],lisAfterGoneHint:{who:`lis`,text:`Каждый раз, когда ты приходишь из архива с фонарём.`},lisAfterSaved:[{who:`lis`,text:`Ты сохранил? Хорошо. В прошлый раз ты не успел.`}],lisIdle:[[{who:`lis`,text:`Поезд опаздывает. Он всегда опаздывает, это часть работы.`}],[{who:`lis`,text:`Журнал я веду для тех, кто потерялся. Иногда кажется, что и для себя тоже.`}],[{who:`lis`,text:`Фонарь потом верни на крюк. Хотя ты всегда забываешь.`}]],journal:[{who:`me`,text:`Красная книга: «Журнал путешественников». Десятки записей разными почерками.`},{who:`me`,text:`Последняя запись: «tester_02. Проверил дверь архива. Вернусь». Дата: месяц назад.`},{who:`me`,text:`tester_02. Это же мой профиль.`}],journalGone:[{who:`me`,text:`Что это мигнуло?`},{who:`me`,text:`Журнала на стойке больше нет! Он только что там лежал.`}],clock:[{who:`me`,text:`Часы идут назад. Секундная стрелка уверенно крутится против хода. Баг или так задумано?`}],bench:[{who:`me`,text:`Скамейка висит в воздухе. И медленно крутится. Это точно не дизайн.`}],serviceLocked:[{who:`me`,text:`Заперто. Ручка не двигается. Похоже, дверь просто нарисована на стене.`}],chalk:[{who:`me`,text:`На стене проступает надпись мелом. Видно только в свете фонаря.`},{who:`me`,text:`«н.о. 0.9.3. журнал тут был».`}],terminalEmpty:[{who:`system`,text:`ТЕРМИНАЛ ДЕЖУРНОГО. Архив сборки. Доказательств для сохранения пока нет.`}],compareRealize:[{who:`me`,text:`Те же шаги. Тот же результат. И тот же профиль: tester_02.`},{who:`me`,text:`Мне выдали копию профиля Никиты Орлова. Вместе со всей историей.`},{who:`me`,text:`Поэтому Лис и сказал: «Ты уже проверял эту дверь».`},{who:`me`,text:`В комментарии Никита пишет: «Если тебе тоже сказали, что это невозможно, сохрани запись до следующего обновления».`}],afterSave:[{who:`me`,text:`Сохранено. Странность объяснена. Можно идти домой.`}],doorBehind:[{who:`me`,text:`…Это был щелчок двери?`}]},df={stationEnter:[`irina`,`Ты в игре. Жёлтый ромб показывает, куда идти. Планшет тестировщика: {tabletKey}. Если запутаешься, жми там «Спросить Ирину».`],lisName:[`irina`,`Персонаж назвал тебя по имени? Странно. Хотя имя он берёт из профиля. Запиши себе, но пока не отвлекайся.`],benchGuide:[`irina`,`Нашёл? Отлично, это твой первый отчёт. Планшет, вкладка «Трекер», «Новый отчёт». Ожидаемое поведение смотри в документации.`],benchOk:[`timur`,`Ха. Коллайдер. Исправлю после релиза. Добро пожаловать в команду.`],clockRejected1:[`timur`,`Это фича. Документация, раздел 2.3. Я её сам писал, представляешь.`],clockRejected2:[`irina`,`Перед отчётом сверяйся с документацией. Ничего страшного, все так попадались.`],clockChecked:[`irina`,`Правильно. Сначала документация, потом отчёт.`],journalNoRepro:[`timur`,`У меня журнал на месте. Пришли шаги и запись повтора, тогда поверю.`],replayOk:[`irina`,`Повторил? Хорошо. Теперь отчёт: шаги у тебя уже есть.`],replayExtra:[`irina`,`Воспроизводится, но в шагах лишнее. Убери всё, что не влияет на результат, и повтори.`],journalAccepted:[`timur`,`Подожди. Ничего не нажимай. Я знаю эту строчку. Её вообще не должно быть в этой сборке.`],duplicate:[`system`,`Трекер: найден похожий отчёт #0412. Автор: n.orlov.`],saved1:[`irina`,`Видела твой отчёт. Хорошая работа. Завтра в девять разберём. Иди домой.`],saved2:[`timur`,`…подожди. Профиль tester_02? Ладно. Завтра.`],autoJournalGone:[`irina`,`Открой журнал действий. Что ты делал прямо перед тем, как журнал пропал? Отметь это и нажми «Воспроизвести выбранное».`],autoReport:[`irina`,`Теперь отчёт про журнал: шаги подставь из повтора, ожидаемое смотри в документации, раздел 3. Не забудь приложить запись.`],autoCompare:[`irina`,`Открой похожий отчёт #0412 в трекере. Сравни со своим.`],autoSave:[`irina`,`Доказательства лучше сохранить в архив сборки. Терминал дежурного у восточной стены.`]},ff={office_irina:`Ирина стоит у своего стола. Подойди к ней поближе, разговор начнётся сам.`,office_pc:`Твой стол у окна, на мониторе жёлтый стикер. Подойди и нажми «Сесть за компьютер».`,lis:`Лис стоит в будке с табличкой «Смотритель». Подойди к нему поближе.`,lantern:`Фонарь висит на крюке рядом с будкой Лиса, его показывает ромб. Наведись на него и возьми.`,archive:`Дверь архива в боковой стене зала, её показывает жёлтый ромб. Открой её и зайди внутрь, фонарь не вешай обратно.`,archive_out:`Внутри темно, это нормально. Просто выйди обратно в зал и посмотри на стойку Лиса.`,replay:`Открой планшет, вкладка «Журнал». Поставь галочки: «Взял фонарь», «Вошёл в архив», «Вышел из архива». Нажми «Воспроизвести выбранное».`,report:`Планшет, вкладка «Трекер», «Новый отчёт». Объект: «Журнал путешественников». Нажми «Подставить шаги из повтора». Ожидаемое: «Журнал остаётся на стойке». Фактическое: «Журнал исчезает». Серьёзность: «Высокая». Отправь.`,compare:`Вкладка «Трекер». Открой отчёт #0412 от n.orlov и нажми «Сравнить с моим».`,save:`Терминал дежурного стоит у дальней стены, его показывает ромб. Подойди и сохрани запись и отчёт #0412.`,wait:`Ты всё сделал. Просто постой у терминала пару секунд.`,final:`Открой планшет, вкладка «Журнал». Посмотри на последнюю запись.`,door:`Обернись: служебный выход за спиной открыт. Подойди к нему и войди.`},pf=e=>new Promise(t=>setTimeout(t,e)),mf=new H;function hf(e,t){return!!e&&t.x>e.minX&&t.x<e.maxX&&t.z>e.minZ&&t.z<e.maxZ}function gf(e,t){return e?(e.getWorldPosition(mf),Math.hypot(mf.x-t.x,mf.z-t.z)):1/0}function _f(e){let t=!1,n=!1,r=!1;for(let i of e)i===`take_lantern`?t=!0:i===`return_lantern`?t=!1:i===`enter_archive`?n=t:i===`exit_archive`&&(n&&t&&(r=!0),n=!1);let i=e.length!==su.length||e.some((e,t)=>e!==su[t]);return{ok:r,extra:i}}function vf(){return{id:`0412`,title:`Журнал путешественников исчезает со стойки`,subject:`journal`,steps:[...su],expected:`journal_stays`,actual:`journal_vanishes`,severity:`high`,attachment:!0,status:`closed_cnr`,author:`n.orlov`,profile:`tester_02`,date:`24.10`,build:`0.9.6`,closedBy:`qa-lead`,comments:[{from:`qa-lead`,text:`Повторила по шагам на тестовом стенде. Журнал на месте. Не воспроизводится.`},{from:`n.orlov`,text:`Если тебе тоже сказали, что это невозможно, сохрани запись до следующего обновления.`}],foreign:!0,compare:null}}function yf(e){let{player:t,hud:n,dialogue:r,screens:i,camera:a}=e,o=()=>K.state,s=[],c=[],l=!1,u=null,d=!1,f=!1,p=!1,m=!1,h=!1,g=0,_=``,v=0,y=0,b=(e,t)=>{c.push(setTimeout(()=>{l||t()},e))};function x(e){let[t,n]=df[e];Eu(t,n.replace(`{tabletKey}`,Ml?`кнопка «Планшет» справа`:`клавиша Tab`))}function S(e){let t=`chat_${e}`;q(t)||(J(t),x(e))}async function C(e){if(m)return!1;m=!0;let t=!1;try{t=await r.play(e)}finally{m=!1}return P(),t}let w=new Set,T=()=>Ml?`«Планшет»`:`Планшет (Tab)`,E=t=>e.world?.slots.find(e=>e.id===t)?.object||null;function D(){let t=e.world?.objects||{};return o().scene===`office`?q(`met_irina`)?{id:`office_pc`,text:`Сядь за свой компьютер у окна и запусти сборку`,target:E(`pc`)}:{id:`office_irina`,text:`Подойди к Ирине и поговори с ней`,target:t.irina}:q(`door_opened`)?{id:`door`,text:`Обернись. Служебный выход открыт. Подойди к нему`,target:t.serviceDoor}:q(`final_logged`)?{id:`final`,text:`Открой ${Ml?`«Планшет»`:`планшет (Tab)`}: в журнале действий новая запись`}:q(`evidence_saved`)?{id:`wait`,text:`Постой у терминала. Смена почти закончилась`,target:t.terminal}:q(`compared`)?{id:`save`,text:`Подойди к терминалу дежурного и сохрани доказательства`,target:t.terminal}:q(`dup_found`)?{id:`compare`,text:`${T()}, вкладка «Трекер»: открой отчёт #0412 и нажми «Сравнить с моим»`}:q(`journal_reported`)?{id:`compare`,text:`Отчёт принят. Трекер ищет похожие отчёты…`}:q(`replay_ok`)?{id:`report`,text:`${T()}, «Трекер», «Новый отчёт»: выбери «Журнал путешественников», нажми «Подставить шаги из повтора», заполни поля и отправь`}:q(`journal_gone`)?{id:`replay`,text:vu().strict?`Журнал исчез. Найди в журнале действий, что к этому привело, и воспроизведи ошибку`:`Журнал исчез. ${T()}, вкладка «Журнал»: отметь «Взял фонарь», «Вошёл в архив», «Вышел из архива» и нажми «Воспроизвести выбранное»`}:q(`met_lis`)?q(`lantern_held`)?d?{id:`archive_out`,text:`Ты в архиве. Теперь выйди обратно в зал`,target:t.archiveDoor}:e.world.api.isArchiveOpen()?{id:`archive`,text:`Зайди в архив с фонарём`,target:t.archiveDoor}:{id:`archive`,text:`Открой дверь архива и зайди внутрь с фонарём`,target:t.archiveDoor}:{id:`lantern`,text:`Возьми фонарь с крюка у будки`,target:t.lantern}:{id:`lis`,text:`Подойди к будке смотрителя и поговори с Лисом`,target:t.lis}}function O(){return D().text}let k=(()=>{let e=new Fr({color:15911244,depthTest:!1,depthWrite:!1,transparent:!0,opacity:.92}),t=new bn,n=new qr(new zi(.13,.22,4),e);n.position.y=.11;let r=new qr(new zi(.13,.3,4),e);return r.rotation.x=Math.PI,r.position.y=-.15,t.add(n,r),t.traverse(e=>e.renderOrder=999),t.visible=!1,t})(),A=new Wn,j=null,M=new H;function N(t,n){let r=e.world;n&&vu().markers&&!e.cutscene&&r?(k.parent!==r.scene&&r.scene.add(k),n!==j&&(j=n,A.setFromObject(n),A.getCenter(M),M.y=Math.min(A.max.y,2.4)+.45),k.visible=!0,k.position.set(M.x,M.y+Math.sin(t*3)*.07,M.z),k.rotation.y=t*1.5):k.visible=!1}let ee=``;function P(){if(l)return;let e=O();e!==ee&&(ee=e,n.setObjective(e))}let te=3.4;function F(t){u||(u=e.world.api.makeHandLantern(),a.add(u)),u.children.forEach(e=>{e.isLight||(e.visible=t)}),u.userData.baseIntensity=t?te:0,u.userData.light.intensity=t?te:0}function ne(t){e.world.api.setLanternOnHook(!t),F(t),J(`lantern_held`,t)}function re(){u&&(a.remove(u),u=null)}function ie(n){re();let r=e.loadScene(`office`);t.place(n||r.spawn),e.interactor.setHandlers(L()),P()}function ae(){let t=e.world;t.api.resetState(),q(`journal_gone`)&&t.api.setJournalVisible(!1),q(`archive_open`)&&t.api.openArchiveDoor(),ne(q(`lantern_held`)),p=!!o().evidence.chalk_note,p&&t.api.setChalkVisible(!0),q(`door_opened`)?t.api.openServiceDoor():t.api.closeServiceDoor?.()}function oe(n){re();let r=e.loadScene(`station`);t.place(n||r.spawn),ae(),d=hf(r.zones.archive,t.pos),f=d&&q(`lantern_held`),e.interactor.setHandlers(ue()),P()}async function se(){J(`pc_used`),e.cutscene=!0,e.block(`cutscene`,!0),await i.fadeOut(`Станция Рассвет`,`Сборка 0.9.7 · релиз-кандидат · профиль tester_02`),await pf(1300),oe(null),e.cutscene=!1,await i.fadeIn(),e.block(`cutscene`,!1),q(`entered_station`)||(J(`entered_station`),wu(`enter_station`),b(900,()=>x(`stationEnter`))),P()}async function I(){await C(uf.irinaBrief)?J(`met_irina`):w.add(`irina`)}function L(){return{irina:{label:`Поговорить с Ириной`,onUse:()=>q(`met_irina`)?C(q(`pc_used`)?uf.irinaLater:uf.irinaAgain):I()},timur:{label:`Поговорить с Тимуром`,onUse:async()=>{if(q(`met_timur`))return C(uf.timurAgain);await C(uf.timurFirst)&&(J(`met_timur`),Cu(`gl_team`))}},pc:{label:`Сесть за компьютер`,onUse:async()=>{if(!q(`met_irina`))return C(uf.pcLocked);let e=!1;await C([{who:`system`,text:`Вход выполнен. Профиль: tester_02. Имя: {name}. Сборка: 0.9.7 (релиз-кандидат).`,options:[{text:`Запустить сборку`,onPick:()=>e=!0},{text:`Позже`}]}]),e&&se()}},whiteboard:{label:`Прочитать доску`,onUse:()=>C(uf.whiteboard)},coffee:{label:`Кофемашина`,onUse:()=>(Cu(`gl_coffee`),C(uf.coffee))}}}async function ce(){wu(`talk_lis`);let e=[`familiar`,`which_door`,`first_time`];await C(uf.lisIntro.map(t=>t.options?{...t,options:t.options.map((t,n)=>({...t,onPick:()=>Su(`gl_lis_first_answer`,e[n])}))}:t))?(J(`met_lis`),b(900,()=>S(`lisName`))):w.add(`lis`)}async function le(){if(!q(`met_lis`))return ce();if(wu(`talk_lis`),o().lisTalks=(o().lisTalks||1)+1,o().lisTalks>=3&&Cu(`gl_lis_friend`),q(`journal_gone`)&&!q(`lis_gone_talk`)){let e=[...uf.lisAfterGone];vu().autoHints&&e.splice(1,0,uf.lisAfterGoneHint),await C(e)&&J(`lis_gone_talk`)}else return q(`evidence_saved`)?C(uf.lisAfterSaved):C(uf.lisIdle[g++%uf.lisIdle.length])}function ue(){let t=e.world;return{lis:{label:`Поговорить с Лисом`,onUse:le},lantern:{label:`Взять фонарь`,enabled:()=>!q(`lantern_held`),onUse:()=>{ne(!0),wu(`take_lantern`),X.pickup()}},hook:{label:`Повесить фонарь на крюк`,enabled:()=>q(`lantern_held`),onUse:()=>{ne(!1),wu(`return_lantern`),Cu(`gl_careful`),X.pickup()}},journal:{label:`Осмотреть журнал`,enabled:()=>!q(`journal_gone`),onUse:()=>{wu(`inspect_journal`),C(uf.journal)}},archive_door:{label:`Открыть дверь архива`,enabled:()=>!t.api.isArchiveOpen(),onUse:()=>{t.api.openArchiveDoor(),J(`archive_open`),wu(`open_archive`),X.door()}},service_door:{label:()=>q(`door_opened`)?`Войти`:`Открыть служебный выход`,onUse:()=>{if(q(`door_opened`))return ve();X.locked(),wu(`try_service_door`),C(uf.serviceLocked)}},clock:{label:`Осмотреть часы`,onUse:()=>{wu(`inspect_clock`),J(`inspected_clock`),q(`inspected_bench`)&&Cu(`gl_side_bugs`),C(uf.clock)}},bench:{label:`Осмотреть скамейку`,onUse:async()=>{wu(`inspect_bench`),J(`inspected_bench`),q(`inspected_clock`)&&Cu(`gl_side_bugs`),await C(uf.bench),q(`bench_reported`)||S(`benchGuide`)}},terminal:{label:`Терминал дежурного`,onUse:()=>{if(wu(`use_terminal`),Object.keys(o().evidence).length===0)return C(uf.terminalEmpty);e.tablet?.openTerminal()}},chalk_wall:{label:`Рассмотреть надпись`,enabled:()=>p&&!o().evidence.chalk_note,onUse:async()=>{wu(`inspect_wall`),await C(uf.chalk),Tu(`chalk_note`)}}}}function de(){J(`journal_gone`),e.world.api.setJournalVisible(!1,{glitch:!0}),n.glitch(),J(`noticed_gone`),b(700,()=>C(uf.journalGone)),P()}async function fe(r,{ok:o,badge:s}){let c=e.world;e.tablet?.close?.(),e.cutscene=!0,e.block(`cutscene`,!0),await i.fadeOut();let l=document.createElement(`div`);l.className=`letterbox`,l.style.cssText=`position:absolute;inset:0;pointer-events:none`,l.innerHTML=`<div class="replay-badge"></div><div class="replay-cap"></div>`,l.querySelector(`.replay-badge`).textContent=s;let u=l.querySelector(`.replay-cap`);document.getElementById(`ui`).appendChild(l),n.show(!1),F(!1),c.api.resetState();let d=new H,f=e=>{e&&(a.position.set(...e.pos),d.set(...e.look),a.lookAt(d))};f(c.cams.wide),await i.fadeIn();for(let e=0;e<r.length;e++){let t=r[e];u.textContent=`Шаг ${e+1}/${r.length}: ${ou[t]||t}`,t===`take_lantern`?(f(c.cams.hook),await pf(500),c.api.setLanternOnHook(!1),X.pickup(),await pf(700)):t===`return_lantern`?(f(c.cams.hook),await pf(500),c.api.setLanternOnHook(!0),await pf(700)):t===`open_archive`?(f(c.cams.archiveDoor),await pf(400),c.api.openArchiveDoor(),X.door(),await pf(800)):t===`enter_archive`?(c.api.isArchiveOpen()||c.api.openArchiveDoor(),f(c.cams.archiveInside),await pf(1100)):t===`exit_archive`?(f(c.cams.archiveDoor),await pf(1100)):t===`try_service_door`||t===`use_terminal`?(f(c.cams.serviceDoor),await pf(900)):t===`inspect_journal`||t===`talk_lis`?(f(c.cams.counter),await pf(900)):(f(c.cams.wide),await pf(900))}f(c.cams.counter),u.textContent=`Проверка: журнал на стойке?`,await pf(1e3),o?(c.api.setJournalVisible(!1,{glitch:!0}),n.glitch(),await pf(900),u.textContent=`Воспроизведено. Журнал исчез со стойки.`,X.success()):(u.textContent=`Не воспроизвелось. Журнал на месте.`,X.fail()),await pf(1900),await i.fadeOut(),l.remove(),ae(),t.apply(),e.cutscene=!1,n.show(!0),await i.fadeIn(),e.block(`cutscene`,!1)}function pe(){let e=o();e.reports.find(e=>e.id===`0412`)||e.reports.push(vf()),Tu(`report_0412`),J(`dup_found`),G.emit(`reports`)}function me(){pe(),b(1200,()=>x(`journalAccepted`)),b(3400,()=>{x(`duplicate`),P()})}async function he(e){let t=o(),n=qu.find(t=>t.id===e.subject),r=vu().strict,i=`accepted`,a=``,s=null,c=(e,t)=>{i=`returned`,a=`Вернули на доработку. ${t}`,Eu(e,t)},l=e=>({status:`rejected`,message:`Такой отчёт уже есть в трекере.`,f:e});if(!n)return{status:`returned`,message:`Выбери, о чём отчёт.`};if(e.subject===`bench`){if(q(`bench_reported`))return l();e.expected===`bench_floor`?e.actual===`bench_flying`?e.severity===`high`||e.severity===`critical`||r&&e.severity!==`low`?c(`irina`,`Скамейка мешает пройти игру? Нет. Серьёзность ниже.`):(J(`bench_reported`),a=`Принят. Тимур взял в работу.`,s=()=>b(1200,()=>x(`benchOk`))):c(`irina`,`Фактический результат опиши так, как видишь. Что именно со скамейкой не так?`):c(`irina`,`Ожидаемое берём из документации, раздел 2: скамейки стоят на полу.`)}else if(e.subject===`clock`){if(q(`clock_rejected`))return l();i=`rejected`,a=`Отклонён: так задумано. Документация, раздел 2.3.`,J(`clock_rejected`),s=()=>{b(1e3,()=>x(`clockRejected1`)),b(3e3,()=>x(`clockRejected2`))}}else if(e.subject===`lis_name`){if(q(`lis_reported`))return l();J(`lis_reported`),a=`Принят. Тимур посмотрит.`,s=()=>b(1200,()=>Eu(`timur`,`Имя из профиля, это нормально. А вот про прошлую сборку… странно. Посмотрю после релиза.`))}else if(e.subject===`journal`){if(q(`journal_reported`))return l();let t=_f(e.steps||[]);!q(`journal_gone`)&&!q(`replay_ok`)?c(`timur`,`У меня журнал на месте. Что именно ты видел?`):t.ok?!e.attachment||!q(`replay_ok`)?(i=`returned`,a=`Вернули на доработку. Нужна запись повтора.`,x(`journalNoRepro`)):r&&t.extra?c(`irina`,`В шагах лишнее. Оставь только то, без чего ошибка не повторяется.`):e.expected===`journal_stays`?e.actual===`journal_vanishes`?e.severity===`low`||e.severity===`medium`?c(`irina`,`Игрок теряет сюжетный предмет и прогресс. Это выше, чем «низкая» или «средняя».`):r&&e.severity!==`high`?c(`irina`,`Игра не вылетает. Это высокая, а не критическая.`):(J(`journal_reported`),a=`Принят. Тимур смотрит.`,s=me):c(`irina`,`Фактический результат неточный. Что ты видел своими глазами?`):c(`irina`,`Сверься с документацией, раздел 3. Что там сказано про журнал?`):c(`timur`,`По твоим шагам у меня не воспроизводится. Проверь шаги повтором.`)}if(i!==`accepted`&&(t.mistakes=(t.mistakes||0)+1),e.subject===`journal`&&i===`returned`&&(t.journalReturns=(t.journalReturns||0)+1),i===`accepted`&&(Cu(`gl_first_bug`),e.subject===`journal`&&!t.journalReturns&&Cu(`gl_clean_report`),e.subject===`lis_name`&&Su(`gl_reported_lis`,!0)),e.subject===`clock`&&Su(`gl_clock_trap`,`reported`),i!==`returned`){let r=t.reports.filter(e=>!e.foreign).length;t.reports.push({id:String(418+r).padStart(4,`0`),title:n.title,subject:e.subject,steps:e.steps||[],expected:e.expected,actual:e.actual,severity:e.severity,attachment:!!e.attachment,status:i,author:`tester_02 (${t.name})`,profile:`tester_02`,date:`сегодня`,closedBy:null,comments:i===`rejected`&&e.subject===`clock`?[{from:`t.safin`,text:`Так задумано. См. документацию 2.3.`}]:[],foreign:!1,compare:null}),G.emit(`reports`),yu(),X.success()}else X.fail();return s?.(),P(),{status:i,message:a}}function ge(){J(`final_logged`),wu(`door_other_side`,{foreign:!0}),n.glitch({sound:!1}),X.glitch(),n.toast(`Журнал действий: новая запись`,{kind:`evidence`,ms:8e3}),y=0,P()}async function _e(){J(`door_opened`),await pf(1300),l||(X.clickBehind(),e.world.api.openServiceDoor(),await pf(1e3),await C(uf.doorBehind),P())}async function ve(){h||(h=!0,e.cutscene=!0,e.block(`cutscene`,!0),X.door(),await i.fadeOut(``,``),J(`chapter_done`),re(),Ru(null),e.cutscene=!1,e.finishChapter(),e.block(`cutscene`,!1),await i.fadeIn())}function R(){let e=sf[0];for(let t of sf)(t[0]===`start`||q(t[0]))&&(e=t);iu.progress(e[1],e[2])}s.push(G.on(`flag`,R),G.on(`achievement`,e=>n.toast(`Достижение: ${of[e]||e}`,{kind:`evidence`})),G.on(`evidence`,e=>{e===`chalk_note`&&Cu(`gl_chalk`);let t=Yu.find(t=>t.id===e);n.toast(`Новая улика: ${t?t.title:e}`,{kind:`evidence`})}),G.on(`tablet:close`,()=>{o().scene===`station`&&(q(`evidence_saved`)&&!q(`after_save_said`)&&(J(`after_save_said`),b(400,()=>C(uf.afterSave))),q(`final_logged`)&&!q(`door_opened`)&&_e())}));let ye={async onReplay(t){if(e.sceneName!==`station`||!t?.length)return;let{ok:r,extra:i}=_f(t),a=r&&i&&vu().strict;await fe(t,{ok:r,badge:`ПОВТОР · профиль tester_02`}),r&&!a?(o().replay={steps:[...t],ok:!0},q(`replay_ok`)||(J(`replay_ok`),Tu(`replay_journal`),Cu(`gl_reproduced`),b(700,()=>x(`replayOk`)))):a?b(500,()=>x(`replayExtra`)):n.toast(`Не воспроизвелось. Попробуй другой набор шагов.`),yu(),P()},onSubmitReport:he,onDocCheck(e){e===`clock`&&!q(`clock_checked`)&&(J(`clock_checked`),Cu(`gl_not_a_bug`),q(`clock_rejected`)||Su(`gl_clock_trap`,`docs`),b(600,()=>x(`clockChecked`)))},canHint(){let e=vu();return e.hints>0&&o().hintsUsed<e.hints},onHint(){if(!ye.canHint())return null;o().hintsUsed+=1;let e=D(),t=ff[e.id]||e.text;return Eu(`irina`,t),t},onCompare(e){let t=o(),n=t.reports.find(t=>t.id===e);if(!n)return;let r=t.reports.find(e=>!e.foreign&&e.subject===n.subject);n.compare={matchSteps:!!r&&r.steps.join()===n.steps.join(),matchProfile:!0},G.emit(`reports`),yu(),q(`compared`)||(J(`compared`),Tu(`profile_match`),Cu(`gl_duplicate`),b(900,()=>C(uf.compareRealize))),P()},async onPlayRecording(t){if(e.sceneName!==`station`)return;let n=o().reports.find(e=>e.id===t);await fe(n?.steps?.length?n.steps:su,{ok:!0,badge:`ЗАПИСЬ n.orlov · сборка 0.9.6`}),J(`nikita_played`),Cu(`gl_nikita_record`),Su(`gl_watched_nikita_record`,!0)},onSaveEvidence(e){o().savedEvidence=[...e],Su(`gl_saved_evidence`,[...e].sort()),yu();let t=e.includes(`replay_journal`)&&e.includes(`report_0412`);t&&q(`compared`)&&!q(`evidence_saved`)?(J(`evidence_saved`),Cu(`gl_evidence`),X.success(),b(1500,()=>x(`saved1`)),b(4200,()=>x(`saved2`))):!t&&q(`compared`)&&b(600,()=>Eu(`irina`,`Сохрани и свою запись, и отчёт #0412. Одно без другого ничего не доказывает.`)),P()},getReplayResult(){return o().replay||null},isDocChecked(e){return e===`clock`&&q(`clock_checked`)}};function be(r,i=0){if(l||e.cutscene||!e.world){k.visible=!1;return}let a=e.world,s=t.pos,c=Fl.enabled&&!m,u=vu().shiftSec-(o().playTime||0);if(n.setTimer(u),u<0&&!q(`shift_over`)&&(J(`shift_over`),Eu(`irina`,`Смена уже закончилась. Ничего, доделай спокойно.`)),e.sceneName===`office`){w.has(`irina`)&&gf(a.objects.irina,s)>4&&w.delete(`irina`),c&&!q(`met_irina`)&&!w.has(`irina`)&&gf(a.objects.irina,s)<3&&I(),N(i,D().target),P();return}let h=hf(a.zones.archive,s);if(h!==d&&(d=h,h?(wu(`enter_archive`),f=q(`lantern_held`)):(wu(`exit_archive`),f&&q(`lantern_held`)&&!q(`journal_gone`)&&de(),f=!1)),!o().evidence.chalk_note){let e=a.slots.find(e=>e.id===`chalk_wall`),t=h&&q(`lantern_held`)&&gf(e?.object,s)<2.6;t!==p&&(p=t,a.api.setChalkVisible(t))}w.has(`lis`)&&gf(a.objects.lis,s)>4.5&&w.delete(`lis`),c&&!q(`met_lis`)&&!w.has(`lis`)&&gf(a.objects.lis,s)<3.2&&ce();let g=D();if(g.id!==_&&(_=g.id,v=0),v+=r,vu().autoHints&&v>vu().autoHintDelay&&ff[g.id]&&!q(`auto_${g.id}`)&&(J(`auto_${g.id}`),Eu(`irina`,ff[g.id])),N(i,g.target),P(),q(`evidence_saved`)&&!q(`final_logged`)&&c&&q(`after_save_said`)){let e=a.points.terminalView;Math.hypot(s.x-e.x,s.z-e.z)<3&&t.stillTime>1.5&&ge()}q(`final_logged`)&&!q(`door_opened`)&&(y+=r,y>20&&(y=0,n.toast(Ml?`Журнал действий: новая запись. Открой планшет.`:`Журнал действий: новая запись. Tab, чтобы открыть.`,{kind:`evidence`})))}return{tabletCallbacks:ye,async start(){let t=o();if(iu.resetProgress(),q(`journal_reported`)&&!q(`dup_found`)&&pe(),R(),t.scene===`station`){let n=t.debugSpawn?e.loadScene(`station`).points[t.debugSpawn]:null;delete t.debugSpawn,oe(n||t.pos)}else if(ie(t.pos),!t.pos){if(e.cutscene=!0,await i.fadeOut(`Студия «Ноль-Один». 21:40`,`Первый рабочий день. Релиз завтра.`),await pf(900),l)return;e.cutscene=!1,await i.fadeIn()}P()},update:be,preferredTab(){return q(`final_logged`)&&!q(`door_opened`)?`log`:void 0},result(e){let t=o(),n=vu(),r=t.evidence,i=Yu.filter(e=>r[e.id]).length,a=e||(r.chalk_note&&i===Yu.length?`gl_ch1_thorough`:`gl_ch1_standard`),s=Math.round(t.playTime||0);n.shiftSec,r.chalk_note||q(`clock_checked`);let c=[{text:`Глава пройдена`,done:!0},{text:n.mistakesForStar===0?`Ни одной ошибки в отчётах`:`Ошибок в отчётах: не больше ${n.mistakesForStar}`,done:(t.mistakes||0)<=n.mistakesForStar},{text:`Уложился в смену: ${Math.round(n.shiftSec/60)} мин`,done:s<=n.shiftSec}],l=c.filter(e=>e.done).length,u=Math.round(Math.max(0,n.shiftSec-s)/n.shiftSec*300),d=Math.max(0,500+i*100+(q(`clock_checked`)?150:0)-(t.mistakes||0)*75+u);Su(`gl_reported_lis`,!!q(`lis_reported`)),Su(`gl_chalk_found`,!!r.chalk_note),Su(`gl_watched_nikita_record`,!!q(`nikita_played`)),t.decisions.gl_clock_trap||Su(`gl_clock_trap`,`none`),Su(`gl_ch1_ending`,a),i===Yu.length&&Cu(`gl_all_evidence`),(t.mistakes||0)===0&&Cu(`gl_perfect`),s>0&&s<=360&&Cu(`gl_fast`),l===3&&Cu(`gl_three_stars`);let f=cf[a];return{starRules:c,chapterNo:1,teaser:`Дальше: глава 2. Комната, которой нет.`,ending:a,endingTitle:f.title,characters:f.heroes(t.decisions),stars:l,score:d,durationSec:s,choices:Object.entries(t.decisions).map(([e,t])=>({key:e,value:t})),skillsUsed:[{text:`Воспроизвёл ошибку по шагам`,done:q(`replay_ok`)},{text:`Описал ожидаемый и фактический результат`,done:q(`journal_reported`)||q(`bench_reported`)},{text:`Оценил, насколько ошибка серьёзная`,done:q(`journal_reported`)},{text:`Сверил странность с документацией`,done:q(`clock_checked`)},{text:`Нашёл похожий отчёт и сравнил`,done:q(`compared`)},{text:`Сохранил доказательство`,done:q(`evidence_saved`)}]}},dispose(){l=!0,k.parent?.remove(k),c.forEach(clearTimeout),s.forEach(e=>e()),re()}}}var bf=[[`office`,`Офис: начало`],[`station`,`Станция: начало`],[`lis`,`Станция: Лис встречен`],[`journal_gone`,`Журнал исчез`],[`replay`,`Ошибка воспроизведена`],[`reported`,`Отчёт принят, найден #0412`],[`compared`,`Отчёты сравнены`],[`final`,`Доказательства сохранены, у терминала`],[`door`,`Служебный выход открыт`]],xf=(e,t=!1)=>({id:e,text:ou[e]||e,t:Date.now(),foreign:t}),Sf={office:e=>{e.scene=`office`},station:e=>{Object.assign(e.flags,{met_irina:!0,met_timur:!0,pc_used:!0,entered_station:!0}),e.scene=`station`,e.log.push(xf(`enter_station`))},lis:e=>{Object.assign(e.flags,{met_lis:!0,chat_lisName:!0}),e.log.push(xf(`talk_lis`))},journal_gone:e=>{Object.assign(e.flags,{bench_reported:!0,archive_open:!0,journal_gone:!0,noticed_gone:!0}),e.log.push(xf(`inspect_bench`),xf(`open_archive`),xf(`take_lantern`),xf(`enter_archive`),xf(`exit_archive`)),e.reports.push({id:`0418`,title:`Скамейка висит в воздухе и вращается`,subject:`bench`,steps:[`inspect_bench`],expected:`bench_floor`,actual:`bench_flying`,severity:`low`,attachment:!1,status:`accepted`,author:`tester_02 (${e.name})`,profile:`tester_02`,date:`сегодня`,closedBy:null,comments:[],foreign:!1,compare:null}),e.flags.lantern_held=!0},replay:e=>{e.flags.replay_ok=!0,e.replay={steps:[...su],ok:!0},e.evidence.replay_journal=!0},reported:e=>{Object.assign(e.flags,{journal_reported:!0,dup_found:!0}),e.reports.push({id:`0419`,title:`Журнал путешественников исчезает со стойки`,subject:`journal`,steps:[...su],expected:`journal_stays`,actual:`journal_vanishes`,severity:`high`,attachment:!0,status:`accepted`,author:`tester_02 (${e.name})`,profile:`tester_02`,date:`сегодня`,closedBy:null,comments:[],foreign:!1,compare:null}),e.reports.push(vf()),e.evidence.report_0412=!0},compared:e=>{e.flags.compared=!0,e.evidence.profile_match=!0;let t=e.reports.find(e=>e.id===`0412`);t&&(t.compare={matchSteps:!0,matchProfile:!0})},final:e=>{Object.assign(e.flags,{evidence_saved:!0,after_save_said:!0}),e.savedEvidence=[`replay_journal`,`report_0412`,`profile_match`],e.debugSpawn=`terminalView`},door:e=>{Object.assign(e.flags,{final_logged:!0,door_opened:!0}),e.log.push(xf(`door_other_side`,!0)),e.debugSpawn=`terminalView`}};function Cf(e,t){for(let[n]of bf)if(Sf[n](e),n===t)break;return e}var wf=[`0.9.7`,`0.9.3`,`0.9.5`],Tf=[`0.9.3`,`0.9.5`,`0.9.7`],Ef=[{id:`bench`,label:`Скамейка`,values:{"0.9.3":`стоит`,"0.9.5":`стоит`,"0.9.7":`висит и крутится`},note:`Сломалась в 0.9.7: это регрессия.`},{id:`clock`,label:`Часы`,values:{"0.9.3":`идут вперёд`,"0.9.5":`идут назад`,"0.9.7":`идут назад`},note:`С 0.9.5 по документации. Не баг.`},{id:`journal`,label:`Журнал`,values:{"0.9.3":`его нет`,"0.9.5":`на стойке`,"0.9.7":`пропал`},note:`В 0.9.7 как в 0.9.3: тянется старый снимок.`},{id:`lis`,label:`Лис`,values:{"0.9.3":`не узнаёт`,"0.9.5":`узнаёт тебя`,"0.9.7":`узнаёт тебя`},note:`Память появилась в 0.9.5.`},{id:`door`,label:`Служебный выход`,values:{"0.9.3":`дверь «Диагностика»`,"0.9.5":`нарисована`,"0.9.7":`открыта`},note:`Комнату вырезали в 0.9.4.`}],Df={wake:[{who:`me`,text:`Серые стены. Розовые кубы висят прямо в воздухе. Это не похоже на станцию.`},{who:`me`,text:`Комната, которой нет в документации.`}],noteWall:[{who:`me`,text:`Доска с записками. Почерк тот же, что на стене архива.`},{who:`me`,text:`«Комнату вырезали в 0.9.4. Если ты здесь, перенос вернул её».`},{who:`me`,text:`«Возьми переключатель. Сравни сборки. Ищи, когда всё началось. н.о.»`}],switcher:[{who:`me`,text:`Самодельная коробка с ручкой и маленьким экраном. На экране: «0.9.7».`},{who:`me`,text:`Похоже, она переключает версию мира. Как будто у меня в руках сразу три сборки.`}],atTerminal:[{who:`system`,text:`АВТОТЕСТЫ. AT-07: служебный выход, проверка изнутри. ЗАВЕРШЁН. AT-08: ОЖИДАЕТ РЕЛИЗ.`}],firstSwitch:[{who:`me`,text:`Комната изменилась. Значит, в разных сборках мир правда разный. Пора сравнить станцию.`}],lis093:[{who:`lis`,text:`Добро пожаловать на станцию Рассвет, путешественник.`},{who:`lis`,text:`Поезд скоро будет. Журнал я пока не завёл, но обязательно заведу.`},{who:`me`,text:`Он меня не узнал. В этой сборке у него ещё нет памяти.`}],lis095:[{who:`lis`,text:`{name}. Ты снова здесь. Ты уже проверял эту дверь.`},{who:`me`,text:`А здесь узнаёт. Значит, память Лиса появилась в 0.9.5.`}],lis097:[{who:`lis`,text:`Журнал снова пропал. Ты ведь знаешь почему, правда?`}],bench:{"0.9.3":[{who:`me`,text:`Скамейка стоит на полу. Ровно, как в документации.`}],"0.9.5":[{who:`me`,text:`Скамейка стоит на полу.`}],"0.9.7":[{who:`me`,text:`Скамейка снова висит и крутится. Раньше такого не было.`}]},clock:{"0.9.3":[{who:`me`,text:`Часы идут вперёд. Обычные часы.`}],"0.9.5":[{who:`me`,text:`Часы идут назад. В документации сказано, что так задумано.`}],"0.9.7":[{who:`me`,text:`Часы идут назад.`}]},journal:{"0.9.3":`Журнала на стойке нет. В этой сборке его ещё не добавили в уровень.`,"0.9.5":`Журнал лежит на стойке. Значит, в 0.9.5 он был.`,"0.9.7":`Журнала нет, как после ошибки. Совсем как в 0.9.3.`},door:{"0.9.3":`Тут настоящая дверь с табличкой «Диагностика».`,"0.9.5":`Дверь просто нарисована на стене. «Служебный выход».`,"0.9.7":`Служебный выход открыт. Его открыл автотест.`},callIntro:[{who:`irina`,text:`Видела твою таблицу. Аккуратно. Теперь главный вопрос.`}],quiz1:`В какой сборке появилась причина пропажи журнала?`,quiz1Wrong:{"0.9.3":`В 0.9.3 журнала просто не было. Его тогда ещё не добавили. Это не ошибка.`,"0.9.7":`В 0.9.7 журнал уже пропадает. Ищи раньше: что ещё изменилось вместе с памятью Лиса?`},quiz1Right:[{who:`irina`,text:`Да. В 0.9.5 Лис начал узнавать игроков. И в 0.9.5 появился перенос состояния.`},{who:`timur`,text:`Подожди. Перенос в 0.9.5 это мой код.`}],quiz2:`Что из найденного не баг?`,quiz2Wrong:`Сверься с таблицей и документацией: что изменили специально, по документу?`,quiz2Right:[{who:`irina`,text:`Верно. Часы поменяли по документации. Отчёт на них писать не нужно.`}],callEnd:[{who:`timur`,text:`Перенос берёт снимок из профиля. А в твоём профиле лежит снимок 0.9.3. Без журнала.`},{who:`timur`,text:`Мне надо посмотреть код. Ничего не трогай, ладно?`},{who:`irina`,text:`Он трогать не будет. А ты вернись в ту комнату. Если Никита что-то оставил, то там.`}],hiddenNote:[{who:`me`,text:`На стене проступает надпись. Видна только в 0.9.3.`},{who:`me`,text:`«Перенос тащит не только журнал. Он тащит мой профиль и мои автотесты».`},{who:`me`,text:`«AT-07 был последним. AT-08 запустится на релизе. У всех игроков». н.о.`},{who:`me`,text:`AT-08 на терминале: «ожидает релиз». Релиз завтра.`}]},Of={start:[`irina`,`Ты где? Трекер показывает тебя в зоне, которой нет на карте.`],timurNoRoom:[`timur`,`Это невозможно. Эту комнату удалили ещё в 0.9.4. Я сам удалял.`],switchTip:[`irina`,`Если это переключатель сборок, сравни станцию в трёх версиях. Записывай всё, что отличается.`],rowFound:[`irina`,`Хорошо. Одна строка таблицы есть. Ищи дальше.`],allRows:[`irina`,`Таблицы хватит. Подойди к терминалу дежурного, созвонимся.`]},kf={wake:`Осмотрись. На доске записки Никиты, на подставке какой-то прибор.`,take:`Возьми прибор с подставки, его показывает ромб.`,switch:`Переключи сборку: клавиша Q или кнопка «Сборка». Посмотри, как меняется комната.`,exit:`Выйди через дверь обратно на станцию.`,compare:`Переключай сборки и осматривай скамейку, часы, Лиса. К стойке и служебному выходу просто подойди. Таблица: клавиша C или кнопка «Таблица».`,call:`Подойди к терминалу дежурного на станции.`,note:`Вернись в комнату за служебным выходом, переключи на 0.9.3 и найди надпись на стене.`},Af={gl_ch2_thorough:{title:`Полная таблица`,heroes:e=>[{name:`Ирина Белова`,text:`Впервые за месяц открыла переписку с Никитой. Пока ничего не написала.`},{name:`Тимур Сафин`,text:`Сидит над кодом переноса. Строчку из 0.9.5 он узнал сразу.`},{name:`Никита Орлов`,text:`Его записка дождалась читателя. AT-08 всё ещё ждёт релиза.`},jf(e)]},gl_ch2_standard:{title:`Сборка найдена`,heroes:e=>[{name:`Ирина Белова`,text:`Попросила Тимура до утра ничего не исправлять. Сначала понять причину.`},{name:`Тимур Сафин`,text:`Ищет, откуда в профиле снимок 0.9.3. И не может найти.`},{name:`Никита Орлов`,text:`Его записка найдена. Но кто он и где он, пока неизвестно.`},jf(e)]}};function jf(e){return e.gl_ch2_met_stranger?{name:`Лис`,text:`В 0.9.3 он тебя не узнал. В 0.9.7 узнал снова. Какой из них настоящий?`}:{name:`Лис`,text:`Ждёт у будки. Журнал так и не вернулся.`}}var Mf=[[`start`,`ch2_room`,0],[`has_switcher`,`ch2_switcher`,12],[`first_switch`,`ch2_first_switch`,20],[`on_station`,`ch2_station`,28],[`rows_2`,`ch2_rows_half`,50],[`rows_done`,`ch2_table`,70],[`call_done`,`ch2_answer`,85],[`note_read`,`ch2_note`,95],[`chapter_done`,`ch2_end`,100]],Nf=e=>String(e).replace(/[&<>"]/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`})[e]);function Pf(e,t){let n=Tf.filter(n=>e?.[t.id]?.[n]);return new Set(n.map(e=>t.values[e])).size>=2}function Ff(e){let t=document.createElement(`div`);t.className=`cmp-layer hidden`,t.innerHTML=`<div class="cmp-panel" role="dialog" aria-label="Таблица сравнения сборок">
      <div class="cmp-head"><b>Таблица сравнения сборок</b><span class="cmp-count"></span><button class="cmp-x" aria-label="Закрыть">×</button></div>
      <div class="cmp-body"></div>
      <div class="cmp-foot">${Ml?`Закрой таблицу и переключай сборку кнопкой «Сборка».`:`C: закрыть таблицу. Сборка переключается клавишей Q, когда таблица закрыта.`}</div>
    </div>`,e.appendChild(t);let n=t.querySelector(`.cmp-body`),r=t.querySelector(`.cmp-count`),i=!1,a=()=>({obs:{},build:null,need:4});function o(){let{obs:e,build:t,need:i}=a(),o=Ef.filter(t=>Pf(e,t)).length;r.textContent=o>=i?`Найдено различий: ${o}. Нужно: ${i}`:`Найдено различий: ${o} из ${i}`,n.innerHTML=`<table class="cmp-table">
      <thead><tr><th></th>${Tf.map(e=>`<th class="${e===t?`cur`:``}">${e}</th>`).join(``)}</tr></thead>
      <tbody>${Ef.map(n=>{let r=Pf(e,n),i=Tf.map(r=>{let i=e?.[n.id]?.[r];return`<td class="${i?`seen`:`unk`} ${r===t?`cur`:``}">${i?Nf(n.values[r]):`?`}</td>`}).join(``);return`<tr class="${r?`ok`:``}"><th>${r?`✓ `:``}${Nf(n.label)}</th>${i}</tr>${r?`<tr class="note"><td colspan="4">${Nf(n.note)}</td></tr>`:``}`}).join(``)}</tbody></table>`}let s={setSource(e){a=e},isOpen:()=>i,open(){i||(i=!0,o(),t.classList.remove(`hidden`),X.ui(),G.emit(`compare:open`))},close(){i&&(i=!1,t.classList.add(`hidden`),G.emit(`compare:close`))},refresh(){i&&o()}};return t.querySelector(`.cmp-x`).addEventListener(`click`,()=>s.close()),t.addEventListener(`click`,e=>{e.target===t&&s.close()}),G.on(`input:pause`,()=>s.close()),s}function If(){let e=new Fr({color:15911244,depthTest:!1,depthWrite:!1,transparent:!0,opacity:.92}),t=new bn,n=new qr(new zi(.13,.22,4),e);n.position.y=.11;let r=new qr(new zi(.13,.3,4),e);r.rotation.x=Math.PI,r.position.y=-.15,t.add(n,r),t.traverse(e=>e.renderOrder=999),t.visible=!1;let i=new Wn,a=new H,o=null;return{update(e,n,r,s){!n||!r||!s?t.visible=!1:(t.parent!==s&&s.add(t),n!==o&&(o=n,i.setFromObject(o),i.getCenter(a),a.y=Math.min(i.max.y,2.4)+.45),t.visible=!0,t.position.set(a.x,a.y+Math.sin(e*3)*.07,a.z),t.rotation.y=e*1.5)},hide(){t.visible=!1},reset(){o=null},dispose(){t.parent?.remove(t)}}}var Lf=e=>new Promise(t=>setTimeout(t,e)),Rf=new H;function zf(e,t){return e?(e.getWorldPosition(Rf),Math.hypot(Rf.x-t.x,Rf.z-t.z)):1/0}function Bf(e){let{player:t,hud:n,dialogue:r,screens:i,compare:a}=e,o=()=>K.state,s=()=>{let e=o();return e.ch2||(e.ch2={build:`0.9.7`,obs:{},hasSwitcher:!1}),e.ch2},c=[],l=[],u=If(),d=!1,f=!1,p=!1,m=``,h=0,g=``,_=(e,t)=>{l.push(setTimeout(()=>{d||t()},e))},v=e=>Eu(...Of[e]),y=e=>{q(`chat_${e}`)||(J(`chat_${e}`),v(e))};async function b(e){if(f)return!1;f=!0;let t=!1;try{t=await r.play(e)}finally{f=!1}return j(),t}async function x(e,t,n){let r=-1;return await b([{who:e,text:t,options:n.map((e,t)=>({text:e,onPick:()=>r=t}))}]),r}let S=()=>s().build;function C(){let t=e.world;t&&(t.api.setBuild?.(S()),n.setBuild(s().hasSwitcher?S():null),e.sceneName===`station`&&t.api.setJournalVisible(S()===`0.9.5`),a.refresh())}function w(){if(!s().hasSwitcher||f||e.cutscene||!Fl.enabled||p)return;let t=wf.indexOf(S());s().build=wf[(t+1)%wf.length],C(),n.glitch(),wu(`switch_build`,{text:`Переключил сборку на ${S()}`}),q(`first_switch`)||(J(`first_switch`),_(500,()=>b(Df.firstSwitch)),_(1500,()=>y(`switchTip`))),yu(),j()}let T=()=>Ef.filter(e=>Pf(s().obs,e)).length;function E(e){let t=s().obs;if(t[e]=t[e]||{},t[e][S()])return!1;let r=Ef.find(t=>t.id===e),i=Pf(t,r);if(t[e][S()]=!0,wu(`observe`,{text:`${r.label} в ${S()}: ${r.values[S()]}`}),n.toast(`Таблица: ${r.label}, ${S()}: ${r.values[S()]}`),a.refresh(),!i&&Pf(t,r)){X.success(),n.toast(`Различие найдено: ${r.label}`,{kind:`evidence`}),y(`rowFound`);let e=T();e>=2&&J(`rows_2`),e>=vu().rowsNeeded&&!q(`rows_done`)&&(J(`rows_done`),_(1200,()=>v(`allRows`))),e===Ef.length&&Cu(`gl_all_diffs`)}return yu(),j(),!0}let D=()=>Ml?`кнопка «Сборка»`:`Q`,O=()=>Ml?`кнопка «Таблица»`:`C`,k={bench:`bench`,clock:`clock`,lis:`lis`,journal:`journal`,door:`serviceDoor`};function A(){let t=e.world?.objects||{},n=e.sceneName===`diagnostic`;if(q(`call_done`))return n?S()===`0.9.3`?{id:`note`,text:`Прочитай надпись на стене`,target:t.hiddenNote}:{id:`note`,text:`Переключи сборку на 0.9.3 (${D()}) и найди надпись на стене`}:{id:`note`,text:`Вернись в комнату за служебным выходом`,target:t.serviceDoor};if(q(`rows_done`))return n?{id:`call`,text:`Выйди на станцию к терминалу дежурного`,target:t.exitDoor}:{id:`call`,text:`Подойди к терминалу дежурного`,target:t.terminal};if(n)return!s().hasSwitcher&&!q(`read_board`)?{id:`wake`,text:`Осмотрись: прочитай записки на доске`,target:t.noteWall}:s().hasSwitcher?q(`first_switch`)?{id:`exit`,text:`Выйди на станцию и сравни её в трёх сборках`,target:t.exitDoor}:{id:`switch`,text:`Переключи сборку: ${D()}`}:{id:`take`,text:`Возьми прибор с подставки`,target:t.switcher};let r=Ef.find(e=>!Pf(s().obs,e));return{id:`compare`,text:`Сравни станцию в разных сборках (${D()}). Различий: ${T()} из ${vu().rowsNeeded}. Таблица: ${O()}`,target:r?t[k[r.id]]:null}}function j(){if(d)return;let e=A().text;e!==g&&(g=e,n.setObjective(e))}async function M(t,n=``){e.cutscene=!0,e.block(`cutscene`,!0),u.hide(),await i.fadeOut(n),t(),e.cutscene=!1,await i.fadeIn(),e.block(`cutscene`,!1)}function N(n){let r=e.loadScene(`diagnostic`);t.place(n||r.spawn),s().hasSwitcher&&r.api.takeSwitcher?.(),e.interactor.setHandlers(P()),C(),u.reset(),j()}function ee(n){let r=e.loadScene(`station`);r.api.resetState(),r.api.openServiceDoor(),t.place(n||r.points.serviceReturn||r.spawn),e.interactor.setHandlers(te()),C(),u.reset(),q(`on_station`)||J(`on_station`),j()}function P(){let t=e.world;return{note_wall:{label:`Прочитать записки`,onUse:async()=>{await b(Df.noteWall)&&J(`read_board`)}},switcher:{label:`Взять прибор`,enabled:()=>!s().hasSwitcher,onUse:async()=>{s().hasSwitcher=!0,t.api.takeSwitcher?.(),J(`has_switcher`),Cu(`gl_switcher`),X.pickup(),G.emit(`touch:ch2`,!0),C(),yu(),await b(Df.switcher)}},at_terminal:{label:`Терминал автотестов`,onUse:()=>b(Df.atTerminal)},exit_door:{label:`Выйти на станцию`,enabled:()=>s().hasSwitcher,onUse:()=>M(()=>ee(null))},hidden_note:{label:`Прочитать надпись`,enabled:()=>S()===`0.9.3`&&q(`call_done`),onUse:async()=>{await b(Df.hiddenNote)&&(J(`note_read`),Su(`gl_ch2_read_at08`,!0),ne())}}}}function te(){return{lis:{label:`Поговорить с Лисом`,onUse:async()=>{if(E(`lis`),S()===`0.9.3`)await b(Df.lis093)&&!q(`met_stranger`)&&(J(`met_stranger`),Su(`gl_ch2_met_stranger`,!0),Cu(`gl_stranger`));else return b(S()===`0.9.5`?Df.lis095:Df.lis097)}},bench:{label:`Осмотреть скамейку`,onUse:()=>(E(`bench`),b(Df.bench[S()]))},clock:{label:`Осмотреть часы`,onUse:()=>(E(`clock`),b(Df.clock[S()]))},journal:{label:`Осмотреть журнал`,onUse:()=>(E(`journal`),b([{who:`me`,text:Df.journal[S()]}]))},service_door:{label:`Войти в комнату`,onUse:()=>M(()=>N(null))},terminal:{label:`Терминал дежурного`,onUse:()=>q(`rows_done`)&&!q(`call_done`)?F():q(`call_done`)?b([{who:`me`,text:`Звонок окончен. Надо вернуться в комнату Никиты.`}]):b([{who:`system`,text:`ТЕРМИНАЛ ДЕЖУРНОГО. Таблица сравнения: ${T()} из ${vu().rowsNeeded}. Продолжи сравнение.`}])}}}async function F(){if(!await b(Df.callIntro))return;let e=s();for(;;){let t=await x(`irina`,Df.quiz1,[`0.9.3`,`0.9.5`,`0.9.7`]);if(t===1)break;if(t<0||(e.q1miss=!0,o().mistakes=(o().mistakes||0)+1,X.fail(),yu(),!await b([{who:`irina`,text:Df.quiz1Wrong[t===0?`0.9.3`:`0.9.7`]}])))return}if(Su(`gl_ch2_bisect_first_try`,!e.q1miss),e.q1miss||Cu(`gl_bisect`),X.success(),await b(Df.quiz1Right)){for(;;){let t=await x(`irina`,Df.quiz2,[`Часы`,`Скамейка`,`Журнал`]);if(t===0)break;if(t<0||(e.q2miss=!0,o().mistakes=(o().mistakes||0)+1,X.fail(),yu(),!await b([{who:`irina`,text:Df.quiz2Wrong}])))return}e.q2miss||Cu(`gl_feature_check`),await b(Df.quiz2Right)&&await b(Df.callEnd)&&(J(`call_done`),yu(),j())}}async function ne(){p||(p=!0,e.cutscene=!0,e.block(`cutscene`,!0),n.glitch(),await Lf(600),d||(await i.fadeOut(``,``),d||(J(`chapter_done`),e.cutscene=!1,e.finishChapter(),e.block(`cutscene`,!1),await i.fadeIn())))}function re(){let e=Mf[0];for(let t of Mf)(t[0]===`start`||q(t[0]))&&(e=t);iu.progress(e[1],e[2])}c.push(G.on(`flag`,re),G.on(`input:switch`,w),G.on(`achievement`,e=>n.toast(`Достижение: ${of[e]||e}`,{kind:`evidence`})),G.on(`input:compare`,()=>{a.isOpen()?a.close():s().hasSwitcher&&Fl.enabled&&a.open()})),a.setSource(()=>({obs:s().obs,build:S(),need:vu().rowsNeeded}));function ie(r,i=0){if(d||e.cutscene||!e.world){u.hide();return}let a=t.pos,c=e.world,l=(vu().shiftSec2||vu().shiftSec)-(o().playTime||0);n.setTimer(l),l<0&&!q(`shift_over`)&&(J(`shift_over`),Eu(`irina`,`Уже поздно. Ничего, доделай спокойно.`)),e.sceneName===`station`&&!f&&Fl.enabled&&(zf(c.objects.journal,a)<2.4&&!s().obs.journal?.[S()]&&(E(`journal`),n.toast(Df.journal[S()])),zf(c.objects.serviceDoor,a)<2.6&&!s().obs.door?.[S()]&&(E(`door`),n.toast(Df.door[S()]))),e.sceneName===`diagnostic`&&c.objects.hiddenNote&&!q(`call_done`)&&(c.objects.hiddenNote.visible=!1),!q(`rows_done`)&&T()>=vu().rowsNeeded&&J(`rows_done`);let p=A();p.id!==m&&(m=p.id,h=0),h+=r,vu().autoHints&&h>vu().autoHintDelay&&kf[p.id]&&!q(`auto_${p.id}`)&&(J(`auto_${p.id}`),Eu(`irina`,kf[p.id])),u.update(i,p.target,vu().markers,c.scene),j()}let ae={onReplay(){n.toast(`Повтор нужен был в главе 1. Здесь сравнивай сборки.`)},async onSubmitReport(){return{status:`rejected`,message:`В этой главе отчёт не нужен: собери таблицу сравнения сборок.`}},onDocCheck(){},canHint(){let e=vu();return e.hints>0&&o().hintsUsed<e.hints},onHint(){if(!ae.canHint())return null;o().hintsUsed+=1;let e=A(),t=kf[e.id]||e.text;return Eu(`irina`,t),t},onCompare(){},onPlayRecording(){n.toast(`Запись Никиты уже просмотрена. Здесь сравнивай сборки.`)},onSaveEvidence(){},getReplayResult(){return o().replay||null},isDocChecked(e){return e===`clock`&&!!o().prev?.[1]?.flags?.clock_checked}};return{tabletCallbacks:ae,async start(){let t=o();iu.resetProgress(),re(),G.emit(`touch:ch2`,!!s().hasSwitcher);let n=t.debugSpawn;if(delete t.debugSpawn,t.scene===`station`?ee(n?e.loadScene(`station`).points[n]:t.pos):N(n?e.loadScene(`diagnostic`).points[n]:t.pos),!q(`started`)){if(J(`started`),e.cutscene=!0,await i.fadeOut(`Глава 2. Комната, которой нет`,`За служебным выходом`),await Lf(1500),d)return;e.cutscene=!1,await i.fadeIn(),Eu(`system`,`Глава 2. Комната, которой нет`),_(300,()=>b(Df.wake)),_(2500,()=>v(`start`)),_(6e3,()=>v(`timurNoRoom`))}j()},update:ie,preferredTab(){},result(e){let t=o(),n=vu(),r=T(),i=e||(r===Ef.length&&(t.mistakes||0)===0?`gl_ch2_thorough`:`gl_ch2_standard`),a=Math.round(t.playTime||0),s=n.shiftSec2||n.shiftSec,c=[{text:`Глава пройдена`,done:!0},{text:n.mistakesForStar===0?`Ни одной ошибки в ответах`:`Ошибок в ответах: не больше ${n.mistakesForStar}`,done:(t.mistakes||0)<=n.mistakesForStar},{text:`Уложился в смену: ${Math.round(s/60)} мин`,done:a<=s}],l=c.filter(e=>e.done).length,u=Math.round(Math.max(0,s-a)/s*300),d=Math.max(0,500+r*80+(t.decisions.gl_ch2_bisect_first_try?150:0)-(t.mistakes||0)*75+u);Su(`gl_ch2_rows_found`,r),t.decisions.gl_ch2_met_stranger===void 0&&Su(`gl_ch2_met_stranger`,!1),t.decisions.gl_ch2_bisect_first_try===void 0&&Su(`gl_ch2_bisect_first_try`,!1),Su(`gl_ch2_ending`,i),l===3&&Cu(`gl_three_stars`);let f=Af[i];return{starRules:c,chapterNo:2,ending:i,endingTitle:f.title,characters:f.heroes(t.decisions),stars:l,score:d,durationSec:a,choices:Object.entries(t.decisions).map(([e,t])=>({key:e,value:t})),teaser:`Дальше: глава 3. След предыдущего тестировщика.`,skillsUsed:[{text:`Сравнил три версии одной локации (регрессионное тестирование)`,done:r>=n.rowsNeeded},{text:`Нашёл сборку, где появилась причина ошибки`,done:q(`call_done`)},{text:`Отличил изменение по документации от бага`,done:q(`call_done`)},{text:`Собрал наблюдения в таблицу сравнения`,done:r>=2}]}},dispose(){d=!0,l.forEach(clearTimeout),c.forEach(e=>e()),u.dispose(),a.close(),n.setBuild(null),G.emit(`touch:ch2`,!1)}}}var Vf=[[`ch2_start`,`Глава 2: комната`],[`ch2_switcher`,`Глава 2: прибор взят`],[`ch2_station`,`Глава 2: станция`],[`ch2_table`,`Глава 2: таблица собрана`],[`ch2_call`,`Глава 2: после звонка`]],Hf=Object.fromEntries(Ef.map(e=>[e.id,{"0.9.3":!0,"0.9.5":!0,"0.9.7":!0}])),Uf={ch2_start:()=>{},ch2_switcher:e=>{Object.assign(e.flags,{started:!0,read_board:!0,has_switcher:!0,first_switch:!0}),e.ch2.hasSwitcher=!0},ch2_station:e=>{e.flags.on_station=!0,e.scene=`station`,e.debugSpawn=`serviceReturn`},ch2_table:e=>{e.ch2.obs=JSON.parse(JSON.stringify(Hf)),Object.assign(e.flags,{rows_2:!0,rows_done:!0}),e.debugSpawn=`terminalView`},ch2_call:e=>{e.flags.call_done=!0,e.scene=`diagnostic`,e.ch2.build=`0.9.3`,e.debugSpawn=`hiddenNote`}};function Wf(e,t){for(let[n]of Vf)if(Uf[n](e),n===t)break;return e}var Gf=3,Kf=[`0.9.3`,`0.9.5`,`0.9.7`];function qf(e){return Math.sin(e*7.3)*.5+Math.sin(e*13.1+1.3)*.3+Math.sin(e*23.7+2.1)*.2}var Jf=`"Segoe Print", "Comic Sans MS", "Marker Felt", cursive`;function Yf(){let e=new kn;e.background=new U(1709586),e.fog=new On(1709586,8,24);let t=[],n=(e,n,r,i)=>{let a={minX:e,maxX:n,minZ:r,maxZ:i};return t.push(a),a},r=(t,n=e)=>(n.add(t),t),i=[],a=(e,t)=>{let n=_d(e);return i.push([n,e,t]),n},o=a(8358786,7830402),s=a(4935500,5593182),c=a(10263186,5922146),l=a(3752266,8027780),u=r(new bn),d=r(new bn),f=r(new bn,d),p=new Oa(16769728,3813416,.7);e.add(p);let m=new Ga(16767400,.35);m.position.set(2,6,3),e.add(m);let h=new Ha(16764810,7,8,2);h.position.set(-1.3,2.7,.2);let g=new Ha(16764810,6,8,2);g.position.set(1.6,2.7,-.6);let _=new Ha(16760944,1.6,4,2);_.position.set(2.55,1.3,1.05),e.add(h,g,_),r(Q(6.4,.02,5.4,0,0,-.02,0,s));let v=_d(16773846,{emissive:16769192,emissiveIntensity:1}),y=_d(16773846,{emissive:16769192,emissiveIntensity:1});r(Q(1.1,.05,.32,0,-1.3,2.94,.2,v));let b=r(Q(1.1,.05,.32,0,1.6,2.94,-.6,y)),x={},S=(e,t,n,i,a,s,c,l=o)=>{let u=r(Q(t,n,i,0,a,s,c,l));return u.userData.base={pos:u.position.clone(),rot:u.rotation.clone()},x[e]=u,u};S(`ceilW`,2.4,.15,5.4,-2,Gf,0,c),S(`ceilM`,2.2,.15,5.4,.3,Gf,0,c),S(`ceilE`,2,.15,5.4,2.2,Gf,0,c),S(`nW`,2.8,Gf,.2,-1.8,0,-2.6),S(`nM`,1.4,Gf,.2,.3,0,-2.6),S(`nE`,2.2,Gf,.2,2.1,0,-2.6),S(`sW`,2.6,Gf,.2,-1.9,0,2.6),S(`sE`,2.6,Gf,.2,1.9,0,2.6),S(`sTop`,1.2,.7999999999999998,.2,0,2.2,2.6),S(`w`,.2,Gf,5.4,-3.1,0,0),S(`eN`,.2,Gf,2.1,3.1,0,-1.55),S(`eM`,.2,Gf,1.7,3.1,0,.35),S(`eS`,.2,Gf,1.5,3.1,0,1.95),n(-3.4,3.4,-2.9,-2.5),n(-3.4,3.4,2.5,2.9),n(-3.4,-3,-2.9,2.9),n(3,3.4,-2.9,2.9);let C={"0.9.5":{eM:{hide:!0},ceilE:{hide:!0},nE:{dz:-.55,dy:.35,rz:.035,ry:.07}},"0.9.7":{eM:{hide:!0},ceilE:{hide:!0},nE:{dz:-.7,dy:.5,rz:.05,ry:.1},nW:{dz:-.35,dy:.28,rx:-.07,rz:-.02},ceilM:{dy:.45,rz:.06},eS:{dx:.4,dy:-.15,ry:-.12}}},w=new fi({color:$.glitchCyan,transparent:!0,opacity:.35,fog:!1});for(let e of[`eM`,`ceilE`]){let t=x[e],n=new wi(new Wi(new Li(1,1,1)),w);n.scale.copy(t.scale),n.position.copy(t.position),d.add(n)}{let e=(e,t,n,r)=>{u.add(Q(e,.9,t,5917246,n,0,r)),u.add(Q(e+.01,.05,t+.01,$.stationTrim,n,.9,r))};e(6,.03,0,-2.485),e(2.4,.03,-1.8,2.485),e(2.4,.03,1.8,2.485),e(.03,5,-2.985,0),e(.03,5,2.985,0);let t=Cd(`ДИАГНОСТИКА`,{width:1.9,height:.34,bg:`#2b3138`,fg:`#f2e6c8`,font:`bold 150px sans-serif`});t.position.set(.3,2.5,-2.485),u.add(t),u.add(Q(2,.42,.02,$.stationTrim,.3,2.29,-2.497));let n=Cd(`ПРОВЕРКА СБОРКИ

1. Снять снимок состояния
2. Сравнить с прошлой сборкой
3. Записать каждое различие
4. Отличить баг от изменения`,{width:1,height:1.2,bg:`#e8dcc0`,fg:`#3a2a22`,font:`bold 56px sans-serif`,align:`left`,pad:50,lineHeight:1.35});n.position.set(-1.75,1.65,2.485),n.rotation.y=Math.PI,u.add(n);let r=Cd(`Зал ожидания`,{width:.9,height:.2,bg:`#2b3138`,fg:`#e8edf2`,font:`bold 120px sans-serif`});r.position.set(0,2.5,2.485),r.rotation.y=Math.PI,u.add(r);let i=Cd(`сборка 0.9.3`,{width:.6,height:.14,bg:`#14201a`,fg:`#7de0a0`,font:`bold 90px monospace`});i.position.set(2.985,2.2,.6),i.rotation.y=-Math.PI/2,u.add(i)}let T=new bn;T.position.set(0,0,2.5);{let e=2830648;T.add(Q(1.1,2.15,.06,$.serviceDoor,0,0,-.01)),T.add(Q(.9,.04,.01,Nd($.serviceDoor,.75),0,1.9,-.045)),T.add(Q(.9,.04,.01,Nd($.serviceDoor,.75),0,.15,-.045)),T.add(Q(.36,.5,.01,9413816,0,1.35,-.045)),T.add(Q(.06,.04,.16,12106946,.4,1,-.1)),T.add(Q(.06,.04,.06,12106946,.4,1,-.06)),T.add(Q(.1,2.3,.1,e,-.6,0,-.04)),T.add(Q(.1,2.3,.1,e,.6,0,-.04)),T.add(Q(1.3,.1,.1,e,0,2.2,-.04)),T.add(Dd(1.2,2.2,.3,0,1.1,-.1))}r(T);let E={x:0,z:-.4};r(Q(.5,.06,.5,0,E.x,0,E.z,l)),r(Q(.3,1,.3,0,E.x,.06,E.z,l)),r(Q(.46,.05,.42,0,E.x,1.06,E.z,l)),n(E.x-.3,E.x+.3,E.z-.3,E.z+.3);{let e=Cd(`ОБРАЗЕЦ Н.О.
не выносить`,{width:.26,height:.12,bg:`#e8dcc0`,fg:`#3a2a22`,font:`bold 80px sans-serif`});e.position.set(E.x,.8,E.z+.152),u.add(e)}let D=new bn;D.position.set(E.x,1.11,E.z);let O={},k=_d(16728128,{emissive:16724016,emissiveIntensity:1});{let e=4873808;D.add(Q(.3,.14,.2,e,0,0,0)),D.add(Q(.31,.012,.21,Nd(e,.75),0,.14,0)),D.add(Q(.05,.145,.205,14271306,-.09,.002,0));for(let e of[-1,1])for(let t of[-1,1])D.add(Q(.012,.004,.012,12106946,e*.135,.152,t*.085));let t=Ad(.038,.042,.04,1973794,0,0,0,10);t.rotation.x=Math.PI/2,t.position.set(.075,.07,.12),D.add(t),D.add(Q(.008,.03,.008,15921906,.075,.075,.142));for(let e=0;e<3;e++){let t=-.7+e*.7;D.add(Q(.006,.012,.004,15918792,.075+Math.sin(t)*.056,.064+Math.cos(t)*.056,.102))}D.add(Q(.11,.06,.01,1053720,-.02,.04,.1));for(let e of Kf){let t=Cd(e,{width:.09,height:.04,bg:`#0b1a14`,fg:e===`0.9.7`?`#ff6fa8`:`#63e6a8`,font:`bold 200px monospace`,pad:8});t.position.set(-.02,.07,.106),D.add(t),O[e]=t}D.add(jd(.012,0,-.115,.1,.1,6,k));let n=Ad(.005,.005,.16,1710618,.12,.14,-.07,4);n.rotation.z=-.35,D.add(n),D.add(jd(.012,12597547,.15,.29,-.07,5)),D.add(Dd(.5,.34,.46,0,.12,0))}r(D);let A=new bn;A.position.set(-2.98,0,.2);{A.add(Q(.04,1.2,1.95,6178353,.02,.92,0)),A.add(Q(.02,1.1,1.85,11108686,.045,.97,0));let e=[[`Комнату вырезали
в 0.9.4`,-.62,1.78,.05],[`Если ты здесь,
перенос вернул её`,.02,1.8,-.04],[`Возьми
переключатель`,.62,1.74,.06],[`Сборки по кругу:
0.9.7, 0.9.3, 0.9.5`,-.5,1.28,-.05],[`Сравни станцию.
Что изменилось?`,.25,1.3,.04],[`не выключай AT
н.о.`,.68,1.22,-.07]],t=gd(12597547);for(let[n,r,i,a]of e){let e=Cd(n,{width:.42,height:.3,bg:`#f3dc5a`,fg:`#2a2418`,font:`bold 90px ${Jf}`,pad:30});e.position.set(.058,i,-r),e.rotation.set(0,Math.PI/2,a),A.add(e),A.add(jd(.014,0,.065,i+.12,-r,5,t))}A.add(Q(.005,.2,.26,15263968,.058,1.06,.13)),A.add(Q(.006,.15,.22,4874886,.06,1.085,.13)),A.add(Q(.007,.05,.22,5917246,.061,1.085,.13)),A.add(Q(.008,.02,.03,16764794,.062,1.11,.1));let n=new Cr().setFromPoints([new H(.068,1.9,.62),new H(.068,1.92,-.02),new H(.068,1.86,-.62),new H(.068,1.4,.5)]);A.add(new bi(n,new fi({color:12597547}))),A.add(Dd(.2,1.25,2,.08,1.52,0))}r(A);let j=new bn;j.position.set(1.7,0,-2.2);let M={m:null};{j.add(Q(.9,.8,.6,4869973,0,0,0)),j.add(Q(.86,.02,.01,3159098,0,.4,.302)),j.add(Q(.55,.45,.45,12169884,0,.8,-.06)),j.add(Q(.4,.33,.22,Nd(12169884,.85),0,.86,-.38));let e=Cd(`АВТОТЕСТЫ  н.о.
AT-06 ... ЗАВЕРШЁН
AT-07 ... ЗАВЕРШЁН
AT-08 ... ОЖИДАЕТ РЕЛИЗ
> _`,{width:.46,height:.3,bg:`#06170f`,fg:`#63e6a8`,font:`bold 64px monospace`,align:`left`,pad:40,lineHeight:1.3});e.position.set(0,1.055,.172),j.add(e),M.m=e.material,j.add(Q(.46,.025,.14,11051404,0,.8,.22)),j.add(Q(.05,.025,.01,1710618,.2,.83,.166));let t=Cd(`AT`,{width:.07,height:.05,bg:`#f3dc5a`,fg:`#2a2418`,font:`bold 160px ${Jf}`,pad:6});t.position.set(-.2,.845,.17),j.add(t),j.add(Dd(.95,1.8,.7,0,.9,0))}r(j),n(1.2,2.2,-2.5,-1.85);let N=gd(8027780);for(let[e,t,r,i,a]of[[1.75,3,-.2,1.4,.76],[2.3,3,-2.5,-1.8,1.9],[-3,-2.45,1.35,2.45,1.1]]){n(e,t,r,i);let o=Q(t-e,a,i-r,0,(e+t)/2,0,(r+i)/2,N);d.add(o)}let ee=_d(6547112,{emissive:6547112,emissiveIntensity:1}),P=_d(16756810,{emissive:16756810,emissiveIntensity:1});{let e=u;e.add(Q(.8,.05,1.55,$.deskTop,2.6,.72,.6));for(let[t,n]of[[2.25,-.12],[2.95,-.12],[2.25,1.32],[2.95,1.32]])e.add(Q(.05,.72,.05,$.desk,t,0,n));e.add(Q(.7,.5,.03,$.desk,2.6,.2,1.3)),e.add(Q(.42,.03,.5,2054714,2.6,.77,.25));for(let t=0;t<4;t++)e.add(Q(.06,.03,.08,1710618,2.5+t%2*.18,.8,.1+Math.floor(t/2)*.25));e.add(Q(.16,.07,.24,14266940,2.75,.77,.95)),e.add(Q(.1,.005,.12,10473632,2.72,.845,.95));let t=new bn;t.position.set(2.82,.77,.55),t.rotation.y=-Math.PI/2,t.add(Q(.12,.02,.12,$.monitor,0,0,0)),t.add(Q(.04,.22,.04,$.monitor,0,.02,0)),t.add(Q(.56,.34,.04,$.monitor,0,.2,.02));let n=Cd(`СНИМОК 0.9.3
состояние: ОК
журнал: нет
память NPC: нет`,{width:.5,height:.29,bg:`#0d1a2a`,fg:`#9fd0ff`,font:`bold 64px monospace`,align:`left`,pad:36});n.position.set(0,.37,.043),t.add(n),e.add(t),e.add(Ad(.07,.08,.02,2761760,2.75,.77,1.15,8));let r=Ad(.012,.012,.4,2761760,2.75,.78,1.15,4);r.rotation.z=.25,e.add(r),e.add(jd(.07,0,2.66,1.17,1.15,6,gd($.lamp,{emissive:$.lamp,emissiveIntensity:1}))),e.add(Q(.44,.05,.44,$.chair,1.98,.45,.6)),e.add(Q(.05,.45,.42,$.chair,1.78,.5,.6)),e.add(Ad(.03,.03,.42,1710618,1.98,.03,.6,6)),e.add(Q(.4,.03,.06,1710618,1.98,0,.6)),e.add(Q(.06,.03,.4,1710618,1.98,0,.6)),e.add(Q(.7,1.9,.62,2830648,2.65,0,-2.15));for(let t=0;t<5;t++){let n=.25+t*.33;e.add(Q(.6,.22,.02,3949648,2.65,n,-1.835));for(let r=0;r<4;r++)e.add(Q(.03,.03,.01,0,2.42+r*.05,n+.15,-1.822,(t+r)%3==0?P:ee));let r=Cd(`СТЕНД ${t+1}`,{width:.22,height:.06,bg:`#e8dcc0`,fg:`#2a2418`,font:`bold 110px sans-serif`,pad:8});r.position.set(2.78,n+.11,-1.822),e.add(r)}e.add(Q(.52,1.1,1.08,$.shelf,-2.72,0,1.9)),e.add(Q(.01,.48,.5,Nd($.shelf,1.2),-2.455,.08,1.62)),e.add(Q(.01,.48,.5,Nd($.shelf,1.2),-2.455,.08,2.18)),e.add(Q(.01,.42,1,Nd($.shelf,.6),-2.455,.62,1.9)),[2902650,8007471,3824186,2902650,14266940,6967862].forEach((t,n)=>e.add(Q(.3,.34,.06,t,-2.72,.65,1.52+n*.075))),e.add(Q(.36,.24,.3,9077880,-2.7,1.1,2.15)),e.add(Q(1,.012,.6,3811882,0,0,1.9))}let te=_d($.glitchPink,{emissive:$.glitchPink,emissiveIntensity:.85}),F=[],ne=(e,t,n,r,i=d)=>{let a=Q(e,e,e,0,t,n-e/2,r,te);return a.rotation.set(t*1.3,r*.9+n,t*.7),a.userData.base=a.position.clone(),i.add(a),F.push(a),a};ne(.42,3.55,1.4,.4),ne(.3,2.7,3.25,.9),ne(.5,-2.7,.08,-2.2),ne(.28,2.9,2.05,-2.85),ne(.6,5.2,2.2,1.8),ne(.22,.9,2.05,-1.5,f),ne(.34,-2.95,.95,1.1,f),ne(.26,2.6,.13,2.15,f),ne(.45,-1.2,3.1,-1,f),ne(.7,-4.6,1.2,-4.2,f),ne(.4,6,.6,-1.5,f);let re=Cd(`Перенос тащит не только журнал.
Он тащит мой профиль и мои автотесты.
AT-07 был последним.
AT-08 запустится на релизе.
У всех игроков.
  н.о.`,{width:1.9,height:1.15,transparentBg:!0,fg:`#1c1418`,font:`bold 70px ${Jf}`,align:`left`,pad:40,lineHeight:1.3});re.material.depthWrite=!1,re.material.opacity=0,re.position.set(-1.75,1.55,-2.488),re.rotation.z=.025,re.visible=!1,r(re);let ie={x:0,z:1.7,yaw:0},ae={switcher:{x:E.x,z:E.z+.95,yaw:0},hiddenNote:{x:-1.75,z:-1.05,yaw:0}},oe={build:`0.9.7`,noteTarget:0,taken:!1};function se(e){let t=C[e]||{};for(let[e,n]of Object.entries(x)){let r=t[e]||{},i=n.userData.base;n.visible=!r.hide,n.position.set(i.pos.x+(r.dx||0),i.pos.y+(r.dy||0),i.pos.z+(r.dz||0)),n.rotation.set(i.rot.x+(r.rx||0),i.rot.y+(r.ry||0),i.rot.z+(r.rz||0))}}let I={setBuild(t){if(!Kf.includes(t))return;oe.build=t;let n=t===`0.9.3`;u.visible=n,d.visible=!n,f.visible=t===`0.9.7`;for(let[e,t,r]of i)e.color.setHex(n?t:r);se(t);for(let e of Kf)O[e].visible=e===t;n?(e.background.setHex(1709586),e.fog.color.setHex(1709586),e.fog.near=8,e.fog.far=24,p.color.setHex(16769728),p.groundColor.setHex(3813416),p.intensity=.7,m.color.setHex(16767400),m.intensity=.35,h.color.setHex(16764810),g.color.setHex(16764810),_.color.setHex(16760944),_.position.set(2.55,1.3,1.05),_.distance=4,v.emissive.setHex(16769192),y.emissive.setHex(16769192),b.visible=!0):(e.background.setHex(263432),e.fog.color.setHex(263432),e.fog.near=5,e.fog.far=17,p.color.setHex(9083060),p.groundColor.setHex(1974824),p.intensity=.85,m.color.setHex(10466047),m.intensity=.3,h.color.setHex(12111103),g.color.setHex(12111103),_.color.setHex($.glitchPink),_.position.set(2.9,1.5,.4),_.distance=5,v.emissive.setHex(10467552),y.emissive.setHex(10467552),b.visible=t===`0.9.5`),n?(oe.noteTarget=1,re.visible=!0):(oe.noteTarget=0,re.material.opacity=0,re.visible=!1),le(0,ce,null)},getBuild(){return oe.build},takeSwitcher(){oe.taken=!0,D.visible=!1},resetSwitcher(){oe.taken=!1,D.visible=!0}},L=[{id:`switcher`,object:D},{id:`note_wall`,object:A},{id:`at_terminal`,object:j},{id:`exit_door`,object:T},{id:`hidden_note`,object:re}],ce=0;function le(e,t,n){if(e=Math.min(e||0,.1),ce=t||0,oe.build===`0.9.3`)h.intensity=7*(.96+.03*qf(t*1.1)),g.intensity=6*(.96+.03*qf(t*1.3+3)),_.intensity=1.6,v.emissiveIntensity=y.emissiveIntensity=1,ee.emissiveIntensity=Math.sin(t*5.1)>0?1:.15,P.emissiveIntensity=Math.sin(t*2.3+1)>.3?1:.1;else{let n=.9+.1*qf(t*1.7);Math.sin(t*.9)*Math.sin(t*2.3)>.78&&(n*=Math.random()>.5?.15:1),h.intensity=4.2*n,v.emissiveIntensity=.55*n,g.intensity=oe.build===`0.9.5`?2.4*(.9+.1*qf(t*2.1+5)):0,y.emissiveIntensity=.45,_.intensity=1.8*(.75+.25*qf(t*3.1)),te.emissiveIntensity=.7+.3*qf(t*4.3);for(let n=0;n<F.length;n++){let r=F[n],i=r.userData.base,a=Math.sin(t*(1.3+n*.37)+n*2.1)>.97;r.position.set(i.x+(a?(Math.random()-.5)*.12:0),i.y+Math.sin(t*.8+n)*.03,i.z+(a?(Math.random()-.5)*.12:0)),r.rotation.y+=e*(.2+n%3*.15)}}if(k.emissiveIntensity=Math.sin(t*6)>0?1:.2,M.m){let e=.88+.12*qf(t*3.7);M.m.color.setRGB(e,e,e)}let r=re.material;if(r.opacity!==oe.noteTarget){let t=e/1.5;r.opacity=oe.noteTarget>r.opacity?Math.min(oe.noteTarget,r.opacity+t):Math.max(oe.noteTarget,r.opacity-t)}}return I.setBuild(`0.9.7`),{scene:e,colliders:t,slots:L,spawn:ie,points:ae,objects:{switcher:D,noteWall:A,atTerminal:j,exitDoor:T,hiddenNote:re},api:I,update:le}}var Xf=[{id:`coffee`,order:1,title:`Записка на кофемашине`,text:`«Не работает с 0.9.3». Почерк Никиты. Кофемашина тут ни при чём: так он отметил сборку, после которой всё началось.`,date:`20.10`},{id:`board`,order:2,title:`Схема на обороте доски`,text:`Стрелки: «профиль tester_02 → снимок 0.9.3 → перенос → журнал пропал».`,date:`22.10`},{id:`drawer`,order:3,title:`Блокнот с гипотезами`,text:`Три гипотезы. Сверху приписка: «Проверю схему с доски, по шагам».`,date:null,softDate:`23.10`},{id:`trash`,order:4,title:`Распечатка отчёта #0412`,text:`Скомкана. Штамп: «Закрыт: не воспроизводится».`,date:`24.10`},{id:`mail`,order:5,title:`Черновик письма`,text:`«Ухожу. Отчёт закрыли, мне не верят. Если кто-то найдёт комнату, не повторяй моих ошибок». Не отправлено.`,date:null,softDate:`25.10`}],Zf=[{id:`h1`,claim:`Лис учится: каждый раз отвечает по-новому.`,hint:`Перезагрузи сохранение (save.reload) и поговори с Лисом. Сделай так дважды.`,truth:`false`,proof:`Дважды перезагрузил сохранение: Лис оба раза сказал одно и то же. Он не учится, а читает профиль.`},{id:`h2`,claim:`Журнал пропадает, только если войти в архив с фонарём.`,hint:`Сбрось мир (world.reset), сходи в архив без фонаря и с фонарём (item.lantern, tp archive, tp hall).`,truth:`true`,proof:`Без фонаря журнал остался на стойке. С фонарём пропал.`},{id:`h3`,claim:`Служебный выход открыл автотест AT-07, а не игрок.`,hint:`Посмотри журнал автотестов (autotest.log).`,truth:`true`,proof:`В журнале автотестов: AT-07 «открыть изнутри» в 23:58:12. Дверь открылась в ту же секунду.`}],Qf=[{id:`help`,label:`help`,desc:`список команд`},{id:`save.reload`,label:`save.reload`,desc:`перезагрузить сохранение профиля`},{id:`world.reset`,label:`world.reset`,desc:`вернуть станцию в начальное состояние`},{id:`item.lantern`,label:`item.lantern`,desc:`взять или убрать фонарь`},{id:`tp.archive`,label:`tp archive`,desc:`переместиться в архив`},{id:`tp.hall`,label:`tp hall`,desc:`переместиться к стойке Лиса`},{id:`autotest.log`,label:`autotest.log`,desc:`журнал автотестов`},{id:`hypo`,label:`hypo`,desc:`открыть гипотезы Никиты`}],$f=[{id:`check`,label:`Проверить журнал`},{id:`load`,label:`Загрузить сохранение игрока`},{id:`archive`,label:`Открыть архив`},{id:`migrate`,label:`Перенос состояния`},{id:`update`,label:`Обновить игру до 1.0`},{id:`at08`,label:`Запустить AT-08`}],ep=[`load`,`update`,`migrate`,`at08`,`check`],tp=[`игрок_аня (прогресс 64%)`,`игрок_дима (прогресс 12%)`,`игрок_лера (прогресс 97%)`],np={start:[{who:`me`,text:`Семь сорок. До релиза три часа. Никиты нет, но его следы где-то здесь.`},{who:`me`,text:`Это был его стол. Начну с того, что он оставил.`}],irina:[{who:`irina`,text:`Ты рано. Я тоже не спала.`},{who:`irina`,text:`Ищешь, что осталось от Никиты? Ищи. Только всё, что найдёшь, проверяй сам. Он умел убеждать, но не всегда был прав.`}],irinaLater:[{who:`irina`,text:`Восстанови, что он делал и в каком порядке. Потом проверим его выводы.`}],timur:[{who:`timur`,text:`Не спрашивай. Я не уходил. Перенос… я почти понял, откуда снимок 0.9.3.`},{who:`timur`,text:`В консоли отладки есть всё, что нужно для проверки. Только ничего не удаляй, ладно?`}],timurLater:[{who:`timur`,text:`Консоль: клавиша с буквой Ё. На телефоне кнопка «Консоль».`}],coffee:[{who:`me`,text:`На кофемашине записка: «Не работает с 0.9.3». Почерк Никиты. Похоже, так он отметил сборку, после которой всё началось.`}],board:[{who:`me`,text:`На обороте доски схема: «профиль tester_02 → снимок 0.9.3 → перенос → журнал пропал». Дата: 22.10.`}],drawer:[{who:`me`,text:`В ящике блокнот. Три гипотезы Никиты.`},{who:`me`,text:`«Лис учится». «Журнал пропадает только с фонарём». «Дверь открыл AT-07». И приписка: «Проверю схему с доски, по шагам».`}],trash:[{who:`me`,text:`В урне скомканная распечатка: отчёт #0412. Штамп «Закрыт: не воспроизводится». Дата: 24.10.`}],mail:[{who:`me`,text:`В компьютере черновик письма. Не отправлен.`},{who:`me`,text:`«Ухожу. Отчёт закрыли, мне не верят. Если кто-то найдёт комнату, не повторяй моих ошибок».`}],timelineDone:[{who:`me`,text:`Сначала он заметил сборку, нарисовал схему, записал гипотезы. Отчёт закрыли. Он ушёл. Теперь проверю его гипотезы на сборке.`}],pcLaunch:{who:`system`,text:`Профиль: tester_02. Сборка 0.9.7. Режим отладки: включён.`},stationStart:[{who:`me`,text:`Станция. Консоль отладки открывается клавишей Ё или кнопкой «Консоль». Проверю гипотезы по одной.`}],lisSame:[{who:`lis`,text:`{name}. Ты уже проверял эту дверь. В прошлой сборке.`}],hyposDone:[{who:`me`,text:`Две гипотезы верны, одна нет: Лис не учится. Никита ошибался. Теперь главное: что будет на релизе. Терминал автотестов в его комнате.`}],autotestDone:[{who:`me`,text:`Журнал стёрт у всех трёх тестовых игроков. Это будет на релизе у всех.`},{who:`me`,text:`Это доказательство. Нужно показать его Ирине и Тимуру.`}],nikitaFinal:[{who:`me`,text:`В трекере новый комментарий. Под отчётом #0412. От n.orlov.`}]},rp={start:[`irina`,`Если ищешь вещи Никиты: его стол был твоим. Ящик, урна, компьютер. И доска.`],timeline:[`irina`,`Все следы есть. Разложи их по порядку на доске.`],console:[`timur`,`Консоль отладки работает только в сборке. Запусти игру со своего компьютера.`],hyposDone:[`irina`,`Хорошо проверено. Особенно про Лиса. Никита в это верил до последнего.`],autotest:[`timur`,`AT-08 правда стирает журнал? Я… посмотрю, кто его запускает на релизе.`],nikita:[`nikita`,`Привет, tester_02. Вижу, ты нашёл мою комнату. Я ошибался насчёт Лиса. Не ошибся насчёт AT-08.`]},ip=`Ты быстрее меня. Я ошибался насчёт Лиса. Не ошибся насчёт AT-08. До релиза три часа.`,ap={traces:`Следы Никиты: кофемашина, оборот доски, ящик твоего стола, урна рядом, твой компьютер.`,timeline:`Подойди к доске и разложи следы по датам: от самой ранней к самой поздней.`,launch:`Сядь за свой компьютер и запусти сборку.`,hypos:`Открой консоль (Ё или кнопка «Консоль»). Для каждой гипотезы в блокноте есть подсказка, как проверить. Вердикт выноси в «hypo».`,autotest:`Иди в комнату Никиты за служебным выходом. Старый терминал автотестов: собери AT-08 из блоков.`,final:`Открой планшет, вкладка «Трекер», отчёт #0412.`},op={gl_ch3_thorough:{title:`Точная реконструкция`,heroes:()=>[{name:`Ирина Белова`,text:`Прочитала твою проверку гипотез и впервые вслух сказала: «Никита был прав. Не во всём».`},{name:`Тимур Сафин`,text:`Нашёл, кто запускает AT-08 на релизе. Это его же скрипт переноса.`},{name:`Никита Орлов`,text:`Вышел на связь. Он следил за трекером всё это время.`},{name:`Лис`,text:`Не учится. Но помнит. И это почему-то не менее важно.`}]},gl_ch3_standard:{title:`След найден`,heroes:()=>[{name:`Ирина Белова`,text:`Попросила задержать релиз хотя бы на час. Ей пока не ответили.`},{name:`Тимур Сафин`,text:`Ищет в коде, кто запускает AT-08. Ещё не нашёл.`},{name:`Никита Орлов`,text:`Написал в чат. Коротко. Похоже, он ждал этого месяц.`},{name:`Лис`,text:`Ждёт у будки и говорит то же, что всегда.`}]}},sp=[[`start`,`ch3_office`,0],[`traces_3`,`ch3_traces`,15],[`traces_done`,`ch3_traces_done`,25],[`timeline_done`,`ch3_timeline`,35],[`on_station`,`ch3_station`,42],[`hypos_2`,`ch3_hypos_half`,55],[`hypos_done`,`ch3_hypos`,70],[`autotest_done`,`ch3_autotest`,88],[`chapter_done`,`ch3_end`,100]],cp=e=>new Promise(t=>setTimeout(t,e));new H;function lp(e,t){return!!e&&t.x>e.minX&&t.x<e.maxX&&t.z>e.minZ&&t.z<e.maxZ}function up(e){let{player:t,hud:n,dialogue:r,screens:i,camera:a,panels:o}=e,s=()=>K.state,c=()=>{let e=s();return e.ch3||(e.ch3=_u()),e.ch3},l=[],u=[],d=If(),f=!1,p=!1,m=!1,h=``,g=0,_=``,v=(e,t)=>{u.push(setTimeout(()=>{f||t()},e))},y=e=>Eu(...rp[e]),b=e=>{q(`chat_${e}`)||(J(`chat_${e}`),y(e))};async function x(e){if(p)return!1;p=!0;let t=!1;try{t=await r.play(e)}finally{p=!1}return de(),t}let S={drawer:null,trash:null,colliders:[]};function C(e){if(S.drawer)return;let t=new bn;t.add(Q(.46,.2,.06,7230528,0,0,0)),t.add(Q(.14,.03,.04,2764602,0,.09,.04)),t.position.set(.42,.42,-2.6),e.scene.add(t);let n=new bn;n.add(yd(.17,.14,.36,3818064,0,0,0,8)),n.add(bd(.08,15722710,.02,.36,.01,6,gd(15722710))),n.add(bd(.06,15722710,-.07,.34,-.04,6,gd(15722710))),n.position.set(-1.1,0,-2.4),e.scene.add(n),S.drawer=t,S.trash=n,n.updateMatrixWorld(!0);let r=Sd(n.children[0],.02);S.colliders=[r],e.colliders.push(r)}function w(){let t=e.world;S.drawer?.parent?.remove(S.drawer),S.trash?.parent?.remove(S.trash);for(let e of S.colliders){let n=t&&t.colliders||[],r=n.indexOf(e);r>=0&&n.splice(r,1)}S.drawer=S.trash=null,S.colliders=[]}let T=()=>Object.keys(c().traces).length;async function E(e,t){if(!await x(t)||c().traces[e])return;c().traces[e]=!0;let r=Xf.find(t=>t.id===e);wu(`trace`,{text:`След Никиты: ${r.title}`}),n.toast(`След Никиты: ${r.title} (${T()} из ${Xf.length})`,{kind:`evidence`}),X.pickup(),T()>=3&&J(`traces_3`),T()===Xf.length&&(J(`traces_done`),v(800,()=>b(`timeline`))),yu(),de()}let D=!1;function O(){c().cardOrder||(c().cardOrder=Xf.map(e=>e.id).sort(()=>Math.random()-.5));let e=c().cardOrder.map(e=>Xf.find(t=>t.id===e)).map(e=>({id:e.id,title:e.title,text:e.text,date:e.date||(vu().strict?null:e.softDate)}));o.timeline.open({cards:e,onSubmit:e=>{c().timelineTries+=1;let t=Xf.slice().sort((e,t)=>e.order-t.order).map(e=>e.id);if(e.join()!==t.join()){s().mistakes=(s().mistakes||0)+1;let n=e.findIndex((e,n)=>e!==t[n]);return X.fail(),yu(),{ok:!1,message:vu().strict?`Не сходится с ${n+1}-го места. Блокнот ссылается на схему с доски, письмо написано после закрытия отчёта.`:`Не сходится с ${n+1}-го места. Расставь карточки по датам: от ранней к поздней.`}}return X.success(),J(`timeline_done`),Su(`gl_ch3_timeline_first_try`,c().timelineTries===1),c().timelineTries===1&&Cu(`gl_detective`),yu(),D=!0,de(),{ok:!0,message:`Порядок верный. Последняя неделя Никиты восстановлена.`}}})}let k=null,A=!1;function j(t){k||(k=e.world.api.makeHandLantern(),a.add(k)),k.children.forEach(e=>{e.isLight||(e.visible=t)}),k.userData.baseIntensity=t?3.4:0,k.userData.light.intensity=t?3.4:0}function M(t){A=t,e.world.api.setLanternOnHook(!t),j(t)}function N(){k&&(a.remove(k),k=null),A=!1}let ee=!1,P=null,te=!1,F=!1;function ne(e){if(c().evidence[e])return;c().evidence[e]=!0;let t=Zf.find(t=>t.id===e);n.toast(`Доказательство для гипотезы: «${t.claim}»`,{kind:`evidence`}),o.hypo.refresh?.(oe()),yu(),de()}async function re(r){if(e.sceneName!==`station`)return[`Консоль работает только внутри сборки.`];let i=e.world;switch(q(`console_used`)||(J(`console_used`),Cu(`gl_console`)),wu(`console`,{text:`Консоль: ${Qf.find(e=>e.id===r)?.label||r}`}),r){case`help`:return Qf.map(e=>`${e.label.padEnd(13)} ${e.desc}`);case`save.reload`:return await ie(()=>{i.api.resetState(),i.api.openServiceDoor(),M(!1),te=!1,i.api.setJournalVisible(!0),t.place(i.points.lisTalk)}),c().reloads+=1,F=!0,yu(),[`Сохранение профиля tester_02 загружено заново (${c().reloads}).`,`Станция как при загрузке. Поговори с Лисом.`];case`world.reset`:return i.api.resetState(),i.api.openServiceDoor(),M(!1),te=!1,i.api.setJournalVisible(!0),n.glitch({sound:!1}),[`Станция сброшена: журнал на стойке, фонарь на крюке, архив закрыт.`];case`item.lantern`:return M(!A),X.pickup(),[A?`Фонарь у тебя в руке.`:`Фонарь убран на крюк.`];case`tp.archive`:{i.api.isArchiveOpen()||i.api.openArchiveDoor();let e=i.zones.archive;return t.place({x:(e.minX+e.maxX)/2,z:(e.minZ+e.maxZ)/2,yaw:-Math.PI/2}),[`Ты в архиве.`]}case`tp.hall`:return t.place(i.points.lisTalk),[`Ты у стойки Лиса.`,te?`Журнала на стойке нет.`:`Журнал на стойке.`];case`autotest.log`:return ne(`h3`),[`21.11 23:41:05  AT-03  часы: направление ............ OK`,`21.11 23:52:40  AT-05  скамейка: высота .............. СБОЙ`,`21.11 23:58:12  AT-07  служебный выход: открыть изнутри  OK`,`21.11 23:58:12  СОБЫТИЕ  дверь «Служебный выход» открыта`,`                AT-08  очистка сохранений после миграции  ОЖИДАЕТ РЕЛИЗ`];case`hypo`:return o.console.close(),v(50,I),[`Открываю гипотезы Никиты…`];default:return[`Неизвестная команда.`]}}async function ie(t){e.cutscene=!0,d.hide(),await i.fadeOut(),t(),e.cutscene=!1,await i.fadeIn()}function ae(){e.sceneName===`station`&&Fl.enabled&&!p&&o.console.open({commands:Qf,onRun:re})}function oe(){return Zf.map(e=>({id:e.id,claim:e.claim,hint:e.hint,evidence:c().evidence[e.id]?e.proof:null,verdict:c().verdicts[e.id]||null}))}let se=()=>Object.keys(c().verdicts).length;function I(){o.hypo.open({items:oe(),onVerdict:(e,t)=>t===Zf.find(t=>t.id===e).truth?(c().verdicts[e]=t,X.success(),e===`h1`&&(Su(`gl_ch3_lis_learns`,!1),Cu(`gl_nikita_wrong`)),se()>=2&&J(`hypos_2`),se()===Zf.length&&(J(`hypos_done`),c().hypoMistake||Cu(`gl_hypotheses`),v(400,()=>{o.hypo.close(),b(`hyposDone`),x(np.hyposDone)})),yu(),de(),{ok:!0,message:t===`true`?`Верно: гипотеза подтвердилась.`:`Верно: гипотеза опровергнута.`}):(s().mistakes=(s().mistakes||0)+1,c().hypoMistake=!0,X.fail(),yu(),{ok:!1,message:`Посмотри на доказательство ещё раз: оно говорит о другом.`})})}function L(){o.autotest.open({blocks:$f,onRun:async e=>{c().autotestRuns+=1,Su(`gl_ch3_autotest_runs`,c().autotestRuns);let t=[];if(e.join()===ep.join()){for(let e of tp)t.push({ok:!0,text:`${e}: загружено, обновлено до 1.0, перенос выполнен`}),t.push({ok:!1,text:`${e}: AT-08 «очистка после миграции»: журнал путешественников стёрт`});return J(`autotest_done`),c().autotestRuns===1&&Cu(`gl_autotest`),X.success(),yu(),v(2700,()=>ce()),{ok:!0,lines:t,message:`Итог: журнал стёрт у 3 из 3 тестовых игроков. Это доказательство.`}}s().mistakes=(s().mistakes||0)+1,X.fail(),yu();let n=e.findIndex((e,t)=>e!==ep[t]);n<0&&(n=e.length);let r=e.includes(`archive`)?`Шаг «Открыть архив» к релизу не относится: сохранения игроков меняются без входа в архив.`:n===0?`Сначала нужно загрузить сохранение игрока: без данных проверять нечего.`:e.length<ep.length?`Сценарий короткий: в конце нужно проверить результат (журнал).`:`Порядок нарушен: на релизе игра сначала обновляется, потом переносит состояние, и только после этого запускается AT-08.`;return t.push({ok:!1,text:`шаг ${n+1}: тест прерван`}),{ok:!1,lines:t,message:r}}})}async function ce(){if(q(`nikita_posted`))return;o.autotest.close();let e=s().reports.find(e=>e.id===`0412`);e&&!e.comments.some(e=>e.text===`Ты быстрее меня. Я ошибался насчёт Лиса. Не ошибся насчёт AT-08. До релиза три часа.`)&&e.comments.push({from:`n.orlov`,text:ip}),G.emit(`reports`),Su(`gl_ch3_nikita_contact`,!0),J(`nikita_posted`),yu(),b(`autotest`),await x(np.autotestDone),v(1500,()=>{b(`nikita`),x(np.nikitaFinal)})}let le=()=>Ml?`кнопка «Консоль»`:`клавиша Ё`;function ue(){let t=e.world?.objects||{},n=e.sceneName;if(q(`nikita_posted`))return{id:`final`,text:`Открой планшет: «Трекер», отчёт #0412`};if(q(`hypos_done`))return n===`diagnostic`?{id:`autotest`,text:`Собери автотест AT-08 на старом терминале`,target:t.atTerminal}:{id:`autotest`,text:`Иди в комнату Никиты за служебным выходом`,target:t.serviceDoor};if(q(`on_station`))return{id:`hypos`,text:`Проверь гипотезы Никиты в консоли (${le()}). Вердикты: ${se()} из 3`};if(q(`timeline_done`))return{id:`launch`,text:`Сядь за свой компьютер и запусти сборку`,target:e.world?.slots.find(e=>e.id===`pc`)?.object};if(q(`traces_done`))return{id:`timeline`,text:`Разложи следы Никиты по порядку на доске`,target:e.world?.slots.find(e=>e.id===`whiteboard`)?.object};let r=Xf.find(e=>!c().traces[e.id]),i={coffee:e.world?.slots.find(e=>e.id===`coffee`)?.object,board:e.world?.slots.find(e=>e.id===`whiteboard`)?.object,drawer:S.drawer,trash:S.trash,mail:e.world?.slots.find(e=>e.id===`pc`)?.object};return{id:`traces`,text:`Найди следы Никиты в офисе: ${T()} из ${Xf.length}`,target:r?i[r.id]:null}}function de(){if(f)return;let e=ue().text;e!==_&&(_=e,n.setObjective(e))}async function fe(t,n=``,r=``){Object.values(o).forEach(e=>e.close?.()),e.cutscene=!0,e.block(`cutscene`,!0),d.hide(),await i.fadeOut(n,r),t(),e.cutscene=!1,await i.fadeIn(),e.block(`cutscene`,!1)}function pe(n){N();let r=e.loadScene(`office`);C(r),e.interactor.setSlots([...r.slots,{id:`drawer`,object:S.drawer},{id:`trash`,object:S.trash}]),t.place(n||r.spawn),e.interactor.setHandlers(ge()),G.emit(`touch:ch3`,!1),d.reset(),de()}function me(n){w(),N();let r=e.loadScene(`station`);r.api.setBuild?.(`0.9.7`),r.api.resetState(),r.api.openServiceDoor(),te=!1,r.api.setJournalVisible(!0),t.place(n||r.spawn),ee=lp(r.zones.archive,t.pos),ee&&r.api.openArchiveDoor(),e.interactor.setHandlers(_e()),G.emit(`touch:ch3`,!0),q(`on_station`)||J(`on_station`),d.reset(),de()}function he(n){N();let r=e.loadScene(`diagnostic`);r.api.setBuild?.(`0.9.7`),r.api.takeSwitcher?.(),t.place(n||r.spawn),e.interactor.setHandlers(ve()),G.emit(`touch:ch3`,!1),d.reset(),de()}function ge(){return e.world,{irina:{label:`Поговорить с Ириной`,onUse:()=>x(q(`met_irina3`)?np.irinaLater:np.irina).then(e=>e&&J(`met_irina3`))},timur:{label:`Поговорить с Тимуром`,onUse:()=>x(q(`met_timur3`)?np.timurLater:np.timur).then(e=>e&&J(`met_timur3`))},coffee:{label:`Осмотреть кофемашину`,onUse:()=>E(`coffee`,np.coffee)},whiteboard:{label:()=>q(`traces_done`)&&!q(`timeline_done`)?`Разложить следы на доске`:`Осмотреть оборот доски`,onUse:()=>q(`traces_done`)&&!q(`timeline_done`)?O():E(`board`,np.board)},drawer:{label:`Открыть ящик стола`,onUse:()=>E(`drawer`,np.drawer)},trash:{label:`Заглянуть в урну`,onUse:()=>E(`trash`,np.trash)},pc:{label:()=>q(`timeline_done`)?`Запустить сборку`:`Открыть компьютер`,onUse:async()=>{if(!q(`timeline_done`))return E(`mail`,np.mail);await x([np.pcLaunch])&&(await fe(()=>me(null),`Станция Рассвет`,`Сборка 0.9.7 · режим отладки`),v(400,()=>x(np.stationStart)),v(1500,()=>b(`console`)))}}}}function _e(){return{lis:{label:`Поговорить с Лисом`,onUse:async()=>{await x(np.lisSame)&&F&&(F=!1,c().lisAfterReload+=1,c().lisAfterReload>=2?ne(`h1`):n.toast(`Запомни ответ Лиса. Перезагрузи сохранение и спроси ещё раз.`),yu())}},service_door:{label:`Войти в комнату Никиты`,onUse:()=>fe(()=>he(null))},bench:{label:`Осмотреть скамейку`,onUse:()=>x([{who:`me`,text:`Скамейка всё ещё летает. Тимур обещал починить после релиза.`}])},terminal:{label:`Терминал дежурного`,onUse:()=>x([{who:`me`,text:`Сегодня всё нужное в консоли отладки.`}])}}}function ve(){return{at_terminal:{label:`Терминал автотестов`,onUse:()=>{if(!q(`hypos_done`))return x([{who:`me`,text:`Сначала проверю гипотезы Никиты на станции.`}]);if(q(`autotest_done`)&&!q(`nikita_posted`))return ce();if(q(`autotest_done`))return x([{who:`me`,text:`Автотест уже собран. Результат у меня.`}]);L()}},exit_door:{label:`Выйти на станцию`,onUse:()=>fe(()=>me(e.loadScene(`station`).points.serviceReturn))},note_wall:{label:`Записки Никиты`,onUse:()=>x([{who:`me`,text:`Те же записки. Теперь я знаю, что за ними стояло.`}])}}}async function R(){m||(m=!0,e.cutscene=!0,e.block(`cutscene`,!0),await i.fadeOut(``,``),f||(J(`chapter_done`),e.cutscene=!1,e.finishChapter(),e.block(`cutscene`,!1),await i.fadeIn()))}function ye(){let e=sp[0];for(let t of sp)(t[0]===`start`||q(t[0]))&&(e=t);iu.progress(e[1],e[2])}l.push(G.on(`flag`,ye),G.on(`achievement`,e=>n.toast(`Достижение: ${of[e]||e}`,{kind:`evidence`})),G.on(`panel:close`,e=>{e===`timeline`&&D&&(D=!1,v(300,()=>x(np.timelineDone)))}),G.on(`input:console`,()=>{o.console.isOpen()?o.console.close():ae()}),G.on(`tablet:close`,()=>{q(`nikita_posted`)&&!m&&v(500,R)}));function be(r,i=0){if(f||e.cutscene||!e.world){d.hide();return}let a=e.world,o=t.pos,l=(vu().shiftSec3||vu().shiftSec)-(s().playTime||0);if(n.setTimer(l),e.sceneName===`station`){let e=lp(a.zones.archive,o);e!==ee&&(ee=e,e?P={lantern:A,journal:!te}:P&&(P.journal?(P.lantern&&A?(te=!0,a.api.setJournalVisible(!1,{glitch:!0}),n.glitch(),c().runs.with=!0,n.toast(`С фонарём: журнал пропал со стойки.`)):(c().runs.without=!0,n.toast(`Без фонаря: журнал на месте.`)),c().runs.with&&c().runs.without&&ne(`h2`),yu()):n.toast(`Журнала уже нет на стойке. Сначала верни мир командой world.reset.`),P=null))}let u=ue();u.id!==h&&(h=u.id,g=0),g+=r,vu().autoHints&&g>vu().autoHintDelay&&ap[u.id]&&!q(`auto_${u.id}`)&&(J(`auto_${u.id}`),Eu(`irina`,ap[u.id])),d.update(i,u.target,vu().markers,a.scene),de()}let xe={onReplay(){n.toast(`Сегодня проверяй через консоль отладки.`)},async onSubmitReport(){return{status:`rejected`,message:`В этой главе отчёт не нужен: проверь гипотезы Никиты.`}},onDocCheck(){},canHint(){let e=vu();return e.hints>0&&s().hintsUsed<e.hints},onHint(){if(!xe.canHint())return null;s().hintsUsed+=1;let e=ue(),t=ap[e.id]||e.text;return Eu(`irina`,t),t},onCompare(){},onPlayRecording(){n.toast(`Запись Никиты ты уже видел.`)},onSaveEvidence(){},getReplayResult(){return s().replay||null},isDocChecked(e){return e===`clock`&&!!s().prev?.[1]?.flags?.clock_checked}};return{tabletCallbacks:xe,async start(){let t=s();iu.resetProgress(),ye();let n=t.debugSpawn;if(delete t.debugSpawn,t.scene===`station`?me(n?e.loadScene(`station`).points[n]:t.pos):t.scene===`diagnostic`?he(n?e.loadScene(`diagnostic`).points[n]:t.pos):pe(t.pos),!q(`started`)){if(J(`started`),e.cutscene=!0,await i.fadeOut(`Глава 3. След предыдущего тестировщика`,`Утро релиза, 7:40`),await cp(1500),f)return;e.cutscene=!1,await i.fadeIn(),Eu(`system`,`Глава 3. Утро релиза`),v(300,()=>x(np.start)),v(2500,()=>y(`start`))}q(`autotest_done`)&&!q(`nikita_posted`)&&v(500,ce),de()},update:be,preferredTab(){return q(`nikita_posted`)?`tracker`:void 0},result(e){let t=s(),n=vu(),r=e||((t.mistakes||0)===0?`gl_ch3_thorough`:`gl_ch3_standard`),i=Math.round(t.playTime||0),a=n.shiftSec3||n.shiftSec,o=[{text:`Глава пройдена`,done:!0},{text:n.mistakesForStar===0?`Ни одной ошибки`:`Ошибок: не больше ${n.mistakesForStar}`,done:(t.mistakes||0)<=n.mistakesForStar},{text:`Уложился в смену: ${Math.round(a/60)} мин`,done:i<=a}],c=o.filter(e=>e.done).length,l=Math.round(Math.max(0,a-i)/a*300),u=Math.max(0,600+se()*60+(q(`autotest_done`)?150:0)-(t.mistakes||0)*75+l);t.decisions.gl_ch3_timeline_first_try===void 0&&Su(`gl_ch3_timeline_first_try`,!1),t.decisions.gl_ch3_nikita_contact===void 0&&Su(`gl_ch3_nikita_contact`,!1),Su(`gl_ch3_ending`,r),c===3&&Cu(`gl_three_stars`);let d=op[r];return{starRules:o,chapterNo:3,ending:r,endingTitle:d.title,characters:d.heroes(t.decisions),stars:c,score:u,durationSec:i,choices:Object.entries(t.decisions).map(([e,t])=>({key:e,value:t})),teaser:`Дальше: финал. Последняя сборка.`,skillsUsed:[{text:`Восстановил порядок событий по следам`,done:q(`timeline_done`)},{text:`Подготовил условия теста через консоль отладки`,done:!!q(`console_used`)},{text:`Проверил гипотезы и опроверг неверную`,done:q(`hypos_done`)},{text:`Собрал и запустил автотест`,done:q(`autotest_done`)}]}},dispose(){f=!0,u.forEach(clearTimeout),l.forEach(e=>e()),d.dispose(),w(),N(),Object.values(o).forEach(e=>e.close?.()),G.emit(`touch:ch3`,!1)}}}var dp=[[`ch3_start`,`Глава 3: офис`],[`ch3_traces`,`Глава 3: следы найдены`],[`ch3_station`,`Глава 3: станция, консоль`],[`ch3_hypos`,`Глава 3: гипотезы проверены`]],fp={ch3_start:()=>{},ch3_traces:e=>{e.ch3.traces=Object.fromEntries(Xf.map(e=>[e.id,!0])),Object.assign(e.flags,{started:!0,traces_3:!0,traces_done:!0})},ch3_station:e=>{Object.assign(e.flags,{timeline_done:!0,on_station:!0}),e.scene=`station`,e.debugSpawn=`lisTalk`},ch3_hypos:e=>{e.ch3.evidence={h1:!0,h2:!0,h3:!0},e.ch3.verdicts={h1:`false`,h2:`true`,h3:`true`},Object.assign(e.flags,{hypos_2:!0,hypos_done:!0,console_used:!0}),e.scene=`diagnostic`,e.debugSpawn=`switcher`}};function pp(e,t){for(let[n]of dp)if(fp[n](e),n===t)break;return e}var mp=[{id:`r0`,claim:`Скамейка в зале больше не летает.`,hint:`Осмотри скамейку в зале ожидания.`,truth:`true`,proof:`Скамейка стоит на полу. Это исправление Тимура сработало.`},{id:`r1`,claim:`AT-08 больше не запускается на релизе.`,hint:`Посмотри журнал автотестов (autotest.log).`,truth:`true`,proof:`В журнале автотестов: «AT-08 очистка сохранений: ОТКЛЮЧЁН в 0.9.8».`},{id:`r2`,claim:`Журнал больше не пропадает.`,hint:`Сбрось мир (world.reset), возьми фонарь (item.lantern), сходи в архив и обратно (tp archive, tp hall).`,truth:`false`,proof:`С фонарём журнал всё равно пропал. Перенос по-прежнему тащит снимок 0.9.3.`},{id:`r3`,claim:`Лис по-прежнему помнит игрока.`,hint:`Поговори с Лисом.`,truth:`false`,proof:`Лис поздоровался как с незнакомцем. Исправление стёрло ему память.`}],hp=[{id:`help`,label:`help`,desc:`список команд`},{id:`world.reset`,label:`world.reset`,desc:`вернуть станцию в начальное состояние`},{id:`item.lantern`,label:`item.lantern`,desc:`взять или убрать фонарь`},{id:`tp.archive`,label:`tp archive`,desc:`переместиться в архив`},{id:`tp.hall`,label:`tp hall`,desc:`переместиться к стойке Лиса`},{id:`autotest.log`,label:`autotest.log`,desc:`журнал автотестов`},{id:`retest`,label:`retest`,desc:`открыть чек-лист ретеста`}],gp={start:[{who:`me`,text:`Девять тридцать. Через полчаса демонстрация. Тимур что-то выпустил ночью.`}],timur:[{who:`timur`,text:`Готово! Сборка 0.9.8. AT-08 отключил, журнал больше не стирается. Можно выпускать.`},{who:`timur`,text:`Ну… я почти уверен. Проверишь?`}],timurLater:[{who:`timur`,text:`Сборка 0.9.8 на твоём компьютере. Проверь, пожалуйста. Быстро.`}],irina:[{who:`irina`,text:`Исправление не считается исправлением, пока его не проверили. Это и есть ретест.`},{who:`irina`,text:`Проверь, что ошибка ушла. И что рядом ничего не сломалось.`}],irinaLater:[{who:`irina`,text:`Запусти 0.9.8 и пройди чек-лист. У нас мало времени.`}],pcLaunch:{who:`system`,text:`Профиль: tester_02. Сборка 0.9.8 (исправление). Режим отладки: включён.`},stationStart:[{who:`me`,text:`Сборка 0.9.8. Консоль, клавиша Ё. Чек-лист ретеста: команда retest.`}],lisStranger:[{who:`lis`,text:`Добро пожаловать на станцию Рассвет, путешественник.`},{who:`me`,text:`Он меня не узнал. В 0.9.7 узнавал.`}],retestDone:[{who:`me`,text:`Скамейку и AT-08 починили. Но журнал всё равно пропадает, а Лис всё забыл.`},{who:`me`,text:`Исправление убрало симптом, но не причину. И сломало другое. Пора собрать итоговый отчёт.`}],reportIntro:{who:`system`,text:`ИТОГОВЫЙ ОТЧЁТ. Решение о релизе. Улики собраны автоматически.`},askTo:`Кому отправить отчёт?`,toOptions:[`Ирине и Тимуру вместе`,`Только Тимуру`,`Только Никите`],askRec:`Что рекомендовать?`,recOptions:[`Перенести релиз, пока не исправят причину`,`Выпускать сборку 0.9.8`],sent:[{who:`me`,text:`Отчёт отправлен. Осталось одно дело. Лис.`}],lisFinal:[{who:`lis`,text:`Путешественник… Странно. Ты мне кого-то напоминаешь.`},{who:`lis`,text:`Меня, кажется, уже стирали. Журнал тоже. Если можешь, сохрани его. Пока меня не стёрли снова.`}],askLis:`Сохранить журнал Лиса?`,lisOptions:[`Сохранить копию журнала`,`Не трогать: это не моя задача`],lisSaved:[{who:`lis`,text:`Спасибо. Я запишу тебя первым. Под настоящим именем.`}],lisNot:[{who:`lis`,text:`Понимаю. У каждого своя работа.`}]},_p={start:[`irina`,`Демонстрация в 10:00. Тимур выпустил 0.9.8. Проверь его исправление, прежде чем мы что-то решим.`],console:[`timur`,`Консоль та же: Ё. Чек-лист ретеста: команда retest.`],retestDone:[`irina`,`Чек-лист готов? Собери итоговый отчёт у терминала дежурного. Решение за нами, но факты за тобой.`],nikita:[`nikita`,`Видел 0.9.8. Симптом убрали, причину нет. Решать тебе, tester_02.`]},vp={meet:`Поговори с Тимуром и Ириной, потом запусти сборку 0.9.8 на своём компьютере.`,launch:`Сядь за свой компьютер и запусти сборку 0.9.8.`,retest:`Осмотри скамейку. В консоли (Ё): autotest.log для AT-08; world.reset, item.lantern, tp archive, tp hall для журнала. Поговори с Лисом. Вердикты в retest.`,report:`Подойди к терминалу дежурного и собери итоговый отчёт.`,lis:`Поговори с Лисом напоследок.`},yp={gl_ch4_reproduced:{title:`Воспроизводится`,note:`Отчёт ушёл Ирине и Тимуру вместе, ты рекомендовал перенести релиз.`,heroes:e=>[{name:`Ирина Белова`,text:`Перенесла релиз на день и вслух признала: отчёт #0412 закрыли зря. Никиту позвали обратно.`},{name:`Тимур Сафин`,text:`Переписал перенос состояния правильно: снимок берётся из сборки, а не из профиля.`},{name:`Никита Орлов`,text:`Вернулся в студию. Первым делом исправил записку на кофемашине.`},bp(e)]},gl_ch4_quiet_fix:{title:`Тихий фикс`,note:`Отчёт получил только Тимур.`,heroes:e=>[{name:`Ирина Белова`,text:`Узнала об ошибке из сводки после релиза. Процесс проверки так и не поменяли.`},{name:`Тимур Сафин`,text:`Починил всё за ночь и никому не сказал. Отчёт #0412 так и остался «не воспроизводится».`},{name:`Никита Орлов`,text:`Не дождался ответа и перестал заходить в трекер.`},bp(e)]},gl_ch4_alone:{title:`Один против всех`,note:`Отчёт получил только Никита.`,heroes:e=>[{name:`Ирина Белова`,text:`Узнала обо всём из поста Никиты. Было обидно, но ошибку признала.`},{name:`Тимур Сафин`,text:`Чинил перенос под давлением. Издатель отложил контракт.`},{name:`Никита Орлов`,text:`Опубликовал разбор. Часть выводов была неточной, но главное он доказал.`},bp(e)]},gl_ch4_not_reproduced:{title:`Не воспроизводится`,note:`Релиз вышел со сборкой 0.9.8 или улик не хватило.`,heroes:e=>[{name:`Ирина Белова`,text:`Демонстрация прошла хорошо. Через неделю пришли первые жалобы на пропавшие сохранения.`},{name:`Тимур Сафин`,text:`Ищет причину по отзывам игроков. Её уже находили, месяц назад.`},{name:`Никита Орлов`,text:`Написал одно слово в трекере: «Воспроизводится».`},bp(e)]}};function bp(e){return e.gl_ch4_saved_lis?{name:`Лис`,text:`В новой сборке открыл журнал и первым увидел твою запись. Узнал тебя.`}:{name:`Лис`,text:`Встречает путешественников как в первый раз. Журнал начат с чистого листа.`}}var xp=[[`start`,`ch4_office`,0],[`met_team`,`ch4_team`,12],[`on_station`,`ch4_station`,25],[`retest_2`,`ch4_retest_half`,45],[`retest_done`,`ch4_retest`,65],[`report_sent`,`ch4_report`,85],[`lis_done`,`ch4_lis`,95],[`chapter_done`,`ch4_end`,100]],Sp=e=>new Promise(t=>setTimeout(t,e));function Cp(e,t){return!!e&&t.x>e.minX&&t.x<e.maxX&&t.z>e.minZ&&t.z<e.maxZ}function wp(e){let{player:t,hud:n,dialogue:r,screens:i,camera:a,panels:o}=e,s=()=>K.state,c=()=>{let e=s();return e.ch4||(e.ch4=gu()),e.ch4},l=[],u=[],d=If(),f=!1,p=!1,m=!1,h=``,g=0,_=``,v=(e,t)=>{u.push(setTimeout(()=>{f||t()},e))},y=e=>Eu(..._p[e]),b=e=>{q(`chat_${e}`)||(J(`chat_${e}`),y(e))};async function x(e){if(p)return!1;p=!0;let t=!1;try{t=await r.play(e)}finally{p=!1}return oe(),t}async function S(e,t,n){let r=-1;return await x([{who:e,text:t,options:n.map((e,t)=>({text:e,onPick:()=>r=t}))}]),r}let C=null,w=!1,T=!1,E=null,D=!1;function O(t){C||(C=e.world.api.makeHandLantern(),a.add(C)),C.children.forEach(e=>{e.isLight||(e.visible=t)}),C.userData.baseIntensity=t?3.4:0,C.userData.light.intensity=t?3.4:0}function k(t){w=t,e.world.api.setLanternOnHook(!t),O(t)}function A(){C&&(a.remove(C),C=null),w=!1}let j=()=>Object.keys(c().verdicts).length;function M(e){if(c().evidence[e])return;c().evidence[e]=!0;let t=mp.find(t=>t.id===e);n.toast(`Ретест: есть результат для «${t.claim}»`,{kind:`evidence`}),o.hypo.refresh?.(N()),yu(),oe()}function N(){return mp.map(e=>({id:e.id,claim:e.claim,hint:e.hint,evidence:c().evidence[e.id]?e.proof:null,verdict:c().verdicts[e.id]||null}))}function ee(){o.hypo.open({items:N(),labels:{title:`Ретест сборки 0.9.8`,item:`Пункт`,lead:`Проверь исправление Тимура по чек-листу. Вердикт можно вынести, когда есть результат проверки.`},onVerdict:(e,t)=>t===mp.find(t=>t.id===e).truth?(c().verdicts[e]=t,X.success(),e===`r3`&&Cu(`gl_regression`),j()>=2&&J(`retest_2`),j()===mp.length&&(J(`retest_done`),c().retestMiss||Cu(`gl_retest`),v(400,()=>{o.hypo.close(),b(`retestDone`),v(1500,()=>b(`nikita`)),x(gp.retestDone)})),yu(),oe(),{ok:!0,message:t===`true`?`Верно: этот пункт исправлен.`:`Верно: этот пункт не исправлен.`}):(s().mistakes=(s().mistakes||0)+1,c().retestMiss=!0,X.fail(),yu(),{ok:!1,message:`Посмотри на результат проверки ещё раз: он говорит о другом.`})})}async function P(r){if(e.sceneName!==`station`)return[`Консоль работает только внутри сборки.`];let i=e.world;switch(wu(`console`,{text:`Консоль: ${hp.find(e=>e.id===r)?.label||r}`}),r){case`help`:return hp.map(e=>`${e.label.padEnd(13)} ${e.desc}`);case`world.reset`:return i.api.resetState(),i.api.openServiceDoor(),k(!1),D=!1,i.api.setJournalVisible(!0),n.glitch({sound:!1}),[`Станция сброшена: журнал на стойке, фонарь на крюке, архив закрыт.`];case`item.lantern`:return k(!w),X.pickup(),[w?`Фонарь у тебя в руке.`:`Фонарь убран на крюк.`];case`tp.archive`:{i.api.isArchiveOpen()||i.api.openArchiveDoor();let e=i.zones.archive;return t.place({x:(e.minX+e.maxX)/2,z:(e.minZ+e.maxZ)/2,yaw:-Math.PI/2}),[`Ты в архиве.`]}case`tp.hall`:return t.place(i.points.lisTalk),[`Ты у стойки Лиса.`,D?`Журнала на стойке нет.`:`Журнал на стойке.`];case`autotest.log`:return M(`r1`),[`22.11 09:12:40  СБОРКА  0.9.8 «исправление переноса» (т.сафин)`,`22.11 09:12:41  AT-08  очистка сохранений после миграции  ОТКЛЮЧЁН`,`22.11 09:12:41  ПЕРЕНОС  источник снимка: профиль tester_02 (0.9.3)`];case`retest`:return o.console.close(),v(50,ee),[`Открываю чек-лист ретеста…`];default:return[`Неизвестная команда.`]}}function te(){e.sceneName===`station`&&Fl.enabled&&!p&&o.console.open({commands:hp,onRun:P})}function F(){let e=s();return[{text:`Запись повтора: исчезновение журнала (глава 1)`,ok:!!e.evidence?.replay_journal},{text:`Отчёт #0412 Никиты (глава 1)`,ok:!!e.evidence?.report_0412},{text:`Таблица сравнения сборок (глава 2)`,ok:!!e.prev?.[2]?.flags?.rows_done},{text:`Автотест AT-08: журнал стёрт у 3 из 3 (глава 3)`,ok:!!e.prev?.[3]?.flags?.autotest_done},{text:`Ретест 0.9.8: причина не исправлена, память Лиса стёрта`,ok:!!q(`retest_done`)}]}async function ne(){let e=F(),t=e.filter(e=>e.ok).length;if(!await x([{who:`system`,text:`${gp.reportIntro.text} ${e.map(e=>`${e.ok?`✓`:`·`} ${e.text}`).join(`. `)}. Улик: ${t} из ${e.length}.`}]))return;let n=await S(`me`,gp.askTo,gp.toOptions);if(n<0)return;let r=await S(`me`,gp.askRec,gp.recOptions);r<0||(c().to=[`both`,`timur`,`nikita`][n],c().rec=r===0?`delay`:`ship`,c().evidenceCount=t,Su(`gl_ch4_to`,c().to),Su(`gl_ch4_rec`,c().rec),Su(`gl_ch4_evidence`,t),J(`report_sent`),X.message(),yu(),await x(gp.sent),oe())}async function re(){if(!await x(gp.lisFinal))return;let e=await S(`me`,gp.askLis,gp.lisOptions);if(e<0)return;let t=e===0;c().savedLis=t,Su(`gl_ch4_saved_lis`,t),t&&Cu(`gl_saved_lis`),await x(t?gp.lisSaved:gp.lisNot),J(`lis_done`),yu(),ue()}let ie=()=>Ml?`кнопка «Консоль»`:`клавиша Ё`;function ae(){let t=e.world?.objects||{};return q(`report_sent`)?{id:`lis`,text:`Поговори с Лисом напоследок`,target:t.lis}:q(`retest_done`)?{id:`report`,text:`Собери итоговый отчёт у терминала дежурного`,target:t.terminal}:q(`on_station`)?{id:`retest`,text:`Пройди чек-лист ретеста 0.9.8 в консоли (${ie()}). Пунктов: ${j()} из ${mp.length}`}:q(`met_team`)?{id:`launch`,text:`Сядь за свой компьютер и запусти сборку 0.9.8`,target:(t=>e.world?.slots.find(e=>e.id===t)?.object)(`pc`)}:{id:`meet`,text:`Поговори с Тимуром: он выпустил исправление`,target:t.timur}}function oe(){if(f)return;let e=ae().text;e!==_&&(_=e,n.setObjective(e))}async function se(t,n=``,r=``){Object.values(o).forEach(e=>e.close?.()),e.cutscene=!0,e.block(`cutscene`,!0),d.hide(),await i.fadeOut(n,r),t(),e.cutscene=!1,await i.fadeIn(),e.block(`cutscene`,!1)}function I(r){A();let i=e.loadScene(`office`);t.place(r||i.spawn),e.interactor.setHandlers(ce()),G.emit(`touch:ch3`,!1),n.setBuild(null),d.reset(),oe()}function L(r){A();let i=e.loadScene(`station`);i.api.setBuild?.(`0.9.5`),i.api.resetState(),i.api.openServiceDoor(),D=!1,i.api.setJournalVisible(!0),t.place(r||i.spawn),T=Cp(i.zones.archive,t.pos),T&&i.api.openArchiveDoor(),e.interactor.setHandlers(le()),G.emit(`touch:ch3`,!0),n.setBuild(`0.9.8`),q(`on_station`)||J(`on_station`),d.reset(),oe()}function ce(){return{timur:{label:`Поговорить с Тимуром`,onUse:async()=>{if(q(`met_team`))return x(gp.timurLater);await x(gp.timur)&&J(`met_team`)}},irina:{label:`Поговорить с Ириной`,onUse:()=>x(q(`met_irina4`)?gp.irinaLater:gp.irina).then(e=>e&&J(`met_irina4`))},pc:{label:`Запустить сборку 0.9.8`,onUse:async()=>{if(!q(`met_team`))return x([{who:`me`,text:`Сначала узнаю у Тимура, что он исправил.`}]);await x([gp.pcLaunch])&&(await se(()=>L(null),`Станция Рассвет`,`Сборка 0.9.8 · исправление`),v(400,()=>x(gp.stationStart)),v(1500,()=>b(`console`)))}},whiteboard:{label:`Доска`,onUse:()=>x([{who:`me`,text:`На доске свежая надпись Ирины: «Не верь на слово. Проверь».`}])},coffee:{label:`Кофемашина`,onUse:()=>x([{who:`me`,text:`Записку Никиты кто-то оставил на месте. И правильно.`}])}}}function le(){return{lis:{label:`Поговорить с Лисом`,onUse:async()=>{if(q(`report_sent`))return re();await x(gp.lisStranger)&&M(`r3`)}},bench:{label:`Осмотреть скамейку`,onUse:async()=>{await x([{who:`me`,text:`Скамейка стоит на полу. Тимур её всё-таки починил.`}])&&M(`r0`)}},terminal:{label:`Терминал дежурного`,onUse:()=>q(`retest_done`)&&!q(`report_sent`)?ne():q(`report_sent`)?x([{who:`me`,text:`Отчёт отправлен. Осталось поговорить с Лисом.`}]):x([{who:`me`,text:`Сначала проверю исправление по чек-листу.`}])},service_door:{label:`Комната Никиты`,onUse:()=>x([{who:`me`,text:`Сегодня всё нужное здесь, на станции.`}])}}}async function ue(){m||(m=!0,e.cutscene=!0,e.block(`cutscene`,!0),await Sp(600),f||(await i.fadeOut(``,``),f||(J(`chapter_done`),e.cutscene=!1,e.finishChapter(),e.block(`cutscene`,!1),await i.fadeIn())))}function de(){let e=xp[0];for(let t of xp)(t[0]===`start`||q(t[0]))&&(e=t);iu.progress(e[1],e[2])}l.push(G.on(`flag`,de),G.on(`achievement`,e=>n.toast(`Достижение: ${of[e]||e}`,{kind:`evidence`})),G.on(`input:console`,()=>{o.console.isOpen()?o.console.close():te()}));function fe(r,i=0){if(f||e.cutscene||!e.world){d.hide();return}let a=e.world,o=t.pos,c=(vu().shiftSec4||vu().shiftSec)-(s().playTime||0);if(n.setTimer(c),e.sceneName===`station`){let e=Cp(a.zones.archive,o);e!==T&&(T=e,e?E={lantern:w,journal:!D}:E&&(E.journal?E.lantern&&w?(D=!0,a.api.setJournalVisible(!1,{glitch:!0}),n.glitch(),n.toast(`С фонарём журнал всё равно пропал. Исправление не помогло.`),M(`r2`)):n.toast(`Без фонаря журнал на месте. Проверь с фонарём (item.lantern).`):n.toast(`Журнала уже нет на стойке. Сначала верни мир командой world.reset.`),E=null))}let l=ae();l.id!==h&&(h=l.id,g=0),g+=r,vu().autoHints&&g>vu().autoHintDelay&&vp[l.id]&&!q(`auto_${l.id}`)&&(J(`auto_${l.id}`),Eu(`irina`,vp[l.id])),d.update(i,l.target,vu().markers,a.scene),oe()}let pe={onReplay(){n.toast(`Сегодня проверяй исправление через консоль.`)},async onSubmitReport(){return{status:`rejected`,message:`Итоговый отчёт собирается у терминала дежурного.`}},onDocCheck(){},canHint(){let e=vu();return e.hints>0&&s().hintsUsed<e.hints},onHint(){if(!pe.canHint())return null;s().hintsUsed+=1;let e=ae(),t=vp[e.id]||e.text;return Eu(`irina`,t),t},onCompare(){},onPlayRecording(){},onSaveEvidence(){},getReplayResult(){return s().replay||null},isDocChecked(e){return e===`clock`&&!!s().prev?.[1]?.flags?.clock_checked}};return{tabletCallbacks:pe,async start(){let t=s();iu.resetProgress(),de();let n=t.debugSpawn;if(delete t.debugSpawn,t.scene===`station`?L(n?e.loadScene(`station`).points[n]:t.pos):I(t.pos),!q(`started`)){if(J(`started`),e.cutscene=!0,await i.fadeOut(`Глава 4. Последняя сборка`,`9:30. Демонстрация в 10:00`),await Sp(1500),f)return;e.cutscene=!1,await i.fadeIn(),Eu(`system`,`Глава 4. Последняя сборка`),v(300,()=>x(gp.start)),v(2500,()=>y(`start`))}oe()},update:fe,preferredTab(){},result(e){let t=s(),n=vu(),r=c(),i=r.evidenceCount??0,a=e||(r.rec===`ship`||i<3?`gl_ch4_not_reproduced`:r.to===`timur`?`gl_ch4_quiet_fix`:r.to===`nikita`?`gl_ch4_alone`:`gl_ch4_reproduced`);a===`gl_ch4_reproduced`&&Cu(`gl_best_ending`);let o=Math.round(t.playTime||0),l=n.shiftSec4||n.shiftSec,u=[{text:`Глава пройдена`,done:!0},{text:n.mistakesForStar===0?`Ни одной ошибки в ретесте`:`Ошибок в ретесте: не больше ${n.mistakesForStar}`,done:(t.mistakes||0)<=n.mistakesForStar},{text:`Уложился до демонстрации: ${Math.round(l/60)} мин`,done:o<=l}],d=u.filter(e=>e.done).length;d===3&&Cu(`gl_three_stars`);let f=Math.round(Math.max(0,l-o)/l*300),p=Math.max(0,600+i*80+(a===`gl_ch4_reproduced`?200:0)-(t.mistakes||0)*75+f);t.decisions.gl_ch4_saved_lis===void 0&&Su(`gl_ch4_saved_lis`,!1),Su(`gl_ch4_ending`,a);let m=yp[a];return{starRules:u,chapterNo:4,ending:a,endingTitle:m.title,characters:m.heroes(t.decisions),stars:d,score:p,durationSec:o,choices:Object.entries(t.decisions).map(([e,t])=>({key:e,value:t})),teaser:`Финал: «${m.title}». ${m.note} Спасибо, что прошёл смену до конца.`,skillsUsed:[{text:`Проверил исправление по чек-листу (ретест): что починили, а что нет`,done:q(`retest_done`)},{text:`Нашёл регрессию: исправление сломало память Лиса`,done:!!r.verdicts.r3},{text:`Собрал итоговый отчёт из улик всех глав`,done:q(`report_sent`)},{text:`Дал рекомендацию о релизе`,done:q(`report_sent`)}]}},dispose(){f=!0,u.forEach(clearTimeout),l.forEach(e=>e()),d.dispose(),A(),Object.values(o).forEach(e=>e.close?.()),n.setBuild(null),G.emit(`touch:ch3`,!1)}}}var Tp=[[`ch4_start`,`Глава 4: офис`],[`ch4_station`,`Глава 4: станция, ретест`],[`ch4_report`,`Глава 4: ретест пройден`],[`ch4_lis`,`Глава 4: отчёт отправлен`]],Ep={ch4_start:()=>{},ch4_station:e=>{Object.assign(e.flags,{started:!0,met_team:!0,on_station:!0}),e.scene=`station`,e.debugSpawn=`lisTalk`},ch4_report:e=>{e.ch4.evidence={r0:!0,r1:!0,r2:!0,r3:!0},e.ch4.verdicts={r0:`true`,r1:`true`,r2:`false`,r3:`false`},Object.assign(e.flags,{retest_2:!0,retest_done:!0}),e.debugSpawn=`terminalView`},ch4_lis:e=>{Object.assign(e.ch4,{to:`both`,rec:`delay`,evidenceCount:5}),e.flags.report_sent=!0,e.debugSpawn=`lisTalk`}};function Dp(e,t){for(let[n]of Tp)if(Ep[n](e),n===t)break;return e}var Op=`Что-то пошло не так`,kp=`Неизвестная команда. Нажми на команду из списка.`,Ap=400,jp=300;function Mp(e){return String(e??``).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`)}function Np(e){return Mp(e).replace(/`([^`]+)`/g,`<code class="c3-code">$1</code>`)}var Pp=e=>new Promise(t=>setTimeout(t,e)),Fp=e=>{try{X[e]?.()}catch{}};async function Ip(e,...t){if(typeof e!=`function`)return{error:!0,value:void 0};try{return{error:!1,value:await e(...t)}}catch{return{error:!0,value:void 0}}}var Lp=()=>Ml||window.innerWidth<700||window.innerHeight<500;function Rp(e,{name:t,title:n,size:r,closeKey:i}){let a=document.createElement(`div`);a.className=`c3-layer c3-layer-${t}`,a.hidden=!0,a.innerHTML=`
    <div class="c3-backdrop" data-c3="backdrop"></div>
    <section class="c3-panel c3-panel-${r}" role="dialog" aria-modal="true" aria-label="${Mp(n)}" tabindex="-1">
      <header class="c3-head">
        <div class="c3-head-main">
          <span class="c3-head-title">${Mp(n)}</span>
          <span class="c3-head-sub"></span>
        </div>
        <button class="c3-close" type="button" data-c3="close" aria-label="Закрыть">${i?`<span class="c3-kbd">${Mp(i)}</span>`:``}<span class="c3-x" aria-hidden="true">×</span></button>
      </header>
      <div class="c3-body"></div>
    </section>`,e.appendChild(a);let o=a.querySelector(`.c3-panel`),s=a.querySelector(`.c3-body`),c=a.querySelector(`.c3-head-sub`),l=!1,u=!1;function d(){a.classList.toggle(`c3-mobile`,Lp()),a.classList.toggle(`c3-touch`,!!Ml)}window.addEventListener(`resize`,()=>{l&&d()});let f={layer:a,panel:o,body:s,onShow:null,onHide:null,isOpen:()=>l,setSub(e){c.textContent=e||``},show(){d(),a.hidden=!1,l||(l=!0,u=!0,queueMicrotask(()=>u=!1),Ml||o.focus({preventScroll:!0}),f.onShow?.(),G.emit(`panel:open`,t))},hide(){l&&(l=!1,a.hidden=!0,document.activeElement&&a.contains(document.activeElement)&&document.activeElement.blur(),f.onHide?.(),G.emit(`panel:close`,t))}};return a.addEventListener(`click`,e=>{let t=e.target.closest(`[data-c3]`);t&&a.contains(t)&&(t.dataset.c3===`close`?(Fp(`ui`),f.hide()):t.dataset.c3===`backdrop`&&f.hide())}),G.on(`input:pause`,()=>{l&&!u&&queueMicrotask(()=>{l&&f.hide()})}),f}function zp(e,t){e.body.addEventListener(`click`,n=>{let r=n.target.closest(`[data-act]`);r&&e.body.contains(r)&&!r.disabled&&(Fp(`ui`),t(r.dataset.act,r))})}function Bp(e){return!e||!e.text?``:`<p class="c3-msg c3-msg-${e.ok?`ok`:`warn`}" role="status">${Mp(e.text)}</p>`}function Vp(e){let t=Rp(e,{name:`timeline`,title:`Доска хронологии`,size:`wide`}),n=[],r=null,i=[],a=null,o=null,s=!1,c=!1,l=e=>n.find(t=>t.id===e);function u(e){return e.date?`<span class="c3-date">${Mp(e.date)}</span>`:`<span class="c3-date c3-date-none">без даты</span>`}function d(){let e=new Set(i.filter(e=>e!=null)),r=n.filter(t=>!e.has(t.id)),a=e.size,d=n.length>0&&a===n.length,f=s||c;t.setSub(n.length?`На доске ${a} из ${n.length}`:``);let p=r.length?r.map(e=>`<li><button class="c3-card" type="button" data-act="place" data-id="${Mp(e.id)}"${f?` disabled`:``}>
              <span class="c3-card-top"><span class="c3-card-title">${Mp(e.title)}</span>${u(e)}</span>
              ${e.text?`<span class="c3-card-text">${Mp(e.text)}</span>`:``}
            </button></li>`).join(``):`<li class="c3-empty">${n.length?`Все карточки на доске`:`Следов пока нет`}</li>`,m=i.map((e,t)=>{let n=e==null?null:l(e);return n?`<li class="c3-slot"><button class="c3-slot-btn" type="button" data-act="unplace" data-i="${t}"${f?` disabled`:``} aria-label="Ячейка ${t+1}: ${Mp(n.title)}. Вернуть в следы">
          <span class="c3-slot-num">${t+1}</span>
          <span class="c3-slot-main"><span class="c3-card-title">${Mp(n.title)}</span>${u(n)}</span>
        </button></li>`:`<li class="c3-slot c3-slot-empty"><span class="c3-slot-num">${t+1}</span><span class="c3-slot-free">свободно</span></li>`}).join(``),h=c?`<button class="c3-btn c3-btn-primary" type="button" data-act="done">Готово</button>`:`<button class="c3-btn c3-btn-primary" type="button" data-act="submit"${!d||s?` disabled`:``}>${s?`Проверяю…`:`Проверить порядок`}</button>`,g=o?Bp(o):`<p class="c3-msg c3-muted">${d?`Все ячейки заполнены`:`Заполни все ячейки`}</p>`;t.body.innerHTML=`
      <div class="c3-scroll">
        <p class="c3-lead">Расставь следы Никиты по времени. Нажми на карточку, и она встанет в первую свободную ячейку. Нажми на карточку в ячейке, чтобы вернуть её.</p>
        <h3 class="c3-sec">Следы <span class="c3-count">${r.length}</span></h3>
        <ul class="c3-pool">${p}</ul>
        <div class="c3-sec c3-sec-row"><h3>Порядок событий</h3><span class="c3-axis">раньше <span aria-hidden="true">→</span> позже</span></div>
        <ol class="c3-slots">${m}</ol>
      </div>
      <footer class="c3-actions">${g}${h}</footer>`}async function f(){if(s||c||i.some(e=>e==null))return;s=!0,o=null,d();let e=await Ip(r,i.slice());if(s=!1,e.error||!e.value||typeof e.value!=`object`)o={ok:!1,text:Op};else{let t=!!e.value.ok;o={ok:t,text:e.value.message||(t?`Порядок верный`:`Порядок неверный`)},c=t}Fp(o.ok?`success`:`fail`),t.isOpen()&&d()}zp(t,(e,n)=>{if(e===`place`){let e=i.indexOf(null);if(e<0)return;i[e]=n.dataset.id,o=null,d()}else if(e===`unplace`){let e=Number(n.dataset.i);i[e]=null,o=null,d()}else e===`submit`?f():e===`done`&&t.hide()});function p(e={}){let s=Array.isArray(e.cards)?e.cards.filter(e=>e&&e.id!=null):[];r=e.onSubmit;let l=s.map(e=>String(e.id)).join(`|`);n=s,l!==a&&(a=l,i=Array(s.length).fill(null),o=null,c=!1),d(),t.show()}return{open:p,close:()=>t.hide(),isOpen:t.isOpen}}function Hp(e){let t=Rp(e,{name:`console`,title:`Отладочная консоль`,size:`console`,closeKey:"`"}),n=[],r=null,i=!1,a=!1,o=[],s=0;t.body.innerHTML=`
    <div class="c3-con">
      <div class="c3-con-screen">
        <div class="c3-con-out" role="log" aria-live="polite" aria-label="Вывод консоли"></div>
        <form class="c3-con-form" autocomplete="off">
          <label class="c3-con-line">
            <span class="c3-con-prompt" aria-hidden="true">&gt;</span>
            <input class="c3-con-input" type="text" spellcheck="false" autocomplete="off" autocapitalize="off" autocorrect="off" enterkeyhint="send" aria-label="Команда" placeholder="набери команду" />
          </label>
          <div class="c3-con-hint" aria-live="polite"></div>
        </form>
      </div>
      <aside class="c3-con-side">
        <h3 class="c3-sec">Команды</h3>
        <ul class="c3-con-cmds"></ul>
      </aside>
    </div>`;let c=t.body.querySelector(`.c3-con-out`),l=t.body.querySelector(`.c3-con-form`),u=t.body.querySelector(`.c3-con-input`),d=t.body.querySelector(`.c3-con-hint`),f=t.body.querySelector(`.c3-con-cmds`),p=e=>String(e??``).toLowerCase().replace(/\s+/g,``).replace(/^[>/$]+/,``),m=e=>{let t=p(e);return t&&n.find(e=>p(e.id)===t||p(e.label)===t)||null},h=e=>e.label||e.id;function g(){c.scrollTop=c.scrollHeight}function _(e,t){let n=document.createElement(`div`);for(n.className=`c3-con-row c3-ln-${t}`,n.textContent=String(e??``),c.appendChild(n);c.childElementCount>Ap;)c.firstElementChild.remove()}function v(e){let t=Array.isArray(e)?e:e==null?[]:[e];for(let e of t)e&&typeof e==`object`?_(e.text,[`ok`,`err`,`dim`,`cmd`].includes(e.kind)?e.kind:`out`):_(e,`out`);g()}function y(){let e=p(u.value);f.innerHTML=n.length?n.map(t=>`<li><button class="c3-cmd${e&&(p(t.id).startsWith(e)||p(t.label).startsWith(e))?` c3-match`:``}" type="button" data-act="cmd" data-id="${Mp(t.id)}"${i?` disabled`:``}>
              <span class="c3-cmd-name">${Mp(h(t))}</span>
              ${t.desc?`<span class="c3-cmd-desc">${Mp(t.desc)}</span>`:``}
            </button></li>`).join(``):`<li class="c3-empty">Команд пока нет</li>`}function b(e){let t=p(e);return t?n.filter(e=>p(e.id).startsWith(t)||p(e.label).startsWith(t)):[]}function x(){let e=u.value;if(!p(e))d.innerHTML=`<span class="c3-kbd">Enter</span> выполнить <span class="c3-kbd">Tab</span> дополнить <span class="c3-kbd">↑</span> прошлая команда`;else{let t=b(e);d.innerHTML=t.length?`Подходит: ${t.slice(0,4).map(e=>`<span class="c3-hint-cmd">${Mp(h(e))}</span>`).join(`, `)}${t.length>4?` и др.`:``}`:`Такой команды нет в списке`}f.querySelectorAll(`.c3-cmd`).forEach(t=>{let r=n.find(e=>String(e.id)===t.dataset.id),i=p(e);t.classList.toggle(`c3-match`,!!(r&&i&&(p(r.id).startsWith(i)||p(r.label).startsWith(i))))})}function S(e){i=e,t.layer.classList.toggle(`c3-busy`,e),f.querySelectorAll(`.c3-cmd`).forEach(t=>t.disabled=e)}function C(){!Ml&&t.isOpen()&&u.focus({preventScroll:!0})}async function w(e){if(i||!e)return;S(!0),_(`> ${h(e)}`,`cmd`),g();let t=await Ip(r,e.id);t.error?_(Op,`err`):v(t.value),g(),S(!1),C()}function T(){let e=u.value.trim();if(!e||i)return;o[o.length-1]!==e&&o.push(e),s=o.length,u.value=``,x();let t=m(e);Fp(`ui`),t?w(t):(_(`> ${e}`,`cmd`),_(kp,`err`),g())}function E(){setTimeout(()=>{t.isOpen()&&t.hide()},0)}u.addEventListener(`keydown`,e=>{if(e.code===`Backquote`)e.preventDefault(),E();else if(e.code===`Escape`||e.key===`Escape`)E();else if(e.stopPropagation(),e.key===`Enter`)e.preventDefault(),T();else if(e.key===`Tab`){e.preventDefault();let t=b(u.value);t.length&&(u.value=h(t[0]),x())}else if(e.key===`ArrowUp`){if(!o.length)return;e.preventDefault(),s=Math.max(0,s-1),u.value=o[s]||``,x()}else if(e.key===`ArrowDown`){if(!o.length)return;e.preventDefault(),s=Math.min(o.length,s+1),u.value=o[s]||``,x()}}),u.addEventListener(`keyup`,e=>{e.code!==`Backquote`&&e.code!==`Escape`&&e.stopPropagation()}),u.addEventListener(`input`,()=>{let e=u.value.replace(/[`ёЁ]/g,``);e!==u.value&&(u.value=e),x()}),l.addEventListener(`submit`,e=>{e.preventDefault(),T()}),zp(t,(e,t)=>{e===`cmd`&&w(n.find(e=>String(e.id)===t.dataset.id))}),t.onShow=()=>{Ml||setTimeout(C,0)};function D(e={}){n=Array.isArray(e.commands)?e.commands.filter(e=>e&&e.id!=null):[],r=e.onRun,y(),x(),a||(a=!0,_(`Отладочная консоль сборки. Вывод сохраняется.`,`dim`),_(Ml?`Нажми на команду в списке.`:`Набери команду или нажми на неё в списке.`,`dim`)),t.show(),g()}return{open:D,close:()=>t.hide(),isOpen:t.isOpen,print:v}}var Up={true:`верно`,false:`неверно`};function Wp(e){let t=Rp(e,{name:`hypo`,title:`Гипотезы Никиты`,size:`wide`}),n=[],r=null,i={title:`Гипотезы Никиты`,item:`Гипотеза`,lead:`Проверь гипотезы из блокнота в консоли. Кнопки вердикта откроются, когда для гипотезы будет доказательство.`},a=i,o={},s={},c=new Set,l=e=>e.verdict===`true`||e.verdict===`false`?e.verdict:o[e.id]||null;function u(){let e=n.length,r=n.filter(e=>l(e)).length;t.setSub(e?`Проверено ${r} из ${e}`:``);let i=n.map((e,t)=>{let n=l(e),r=e.evidence!=null&&String(e.evidence).trim()!==``,i=c.has(e.id),o=n?`<span class="c3-pill c3-pill-ok">Вердикт: ${Up[n]}</span>`:r?`<span class="c3-pill c3-pill-blue">Есть доказательство</span>`:`<span class="c3-pill">Не проверена</span>`,u=!r||n||i?` disabled`:``,d=n?``:`<div class="c3-hypo-actions">
              <button class="c3-btn" type="button" data-act="verdict" data-v="true" data-id="${Mp(e.id)}"${u}>Верно</button>
              <button class="c3-btn" type="button" data-act="verdict" data-v="false" data-id="${Mp(e.id)}"${u}>Неверно</button>
              ${r?``:`<span class="c3-muted c3-hypo-note">Сначала собери доказательство</span>`}
            </div>`;return`<li class="c3-hypo${n?` c3-hypo-done`:``}" data-hypo="${Mp(e.id)}">
          <div class="c3-hypo-head"><span class="c3-hypo-num">${Mp(a.item)} ${t+1}</span>${o}</div>
          <p class="c3-claim">${Mp(e.claim)}</p>
          <dl class="c3-hypo-meta">
            <dt>Как проверить</dt><dd>${e.hint?Np(e.hint):`<span class="c3-muted">нет подсказки</span>`}</dd>
            <dt>Доказательство</dt><dd>${r?Np(e.evidence):`<span class="c3-muted">пока нет</span>`}</dd>
          </dl>
          ${d}
          ${!n&&s[e.id]?Bp(s[e.id]):``}
        </li>`}).join(``),o=t.body.querySelector(`.c3-scroll`)?.scrollTop||0;t.body.innerHTML=`
      <div class="c3-scroll">
        <p class="c3-lead">${Mp(a.lead)}</p>
        ${e?`<ol class="c3-hypos">${i}</ol>`:`<p class="c3-empty">Гипотез пока нет</p>`}
      </div>`;let u=t.body.querySelector(`.c3-scroll`);u&&(u.scrollTop=o)}async function d(e,t){let i=n.find(t=>String(t.id)===e);if(!i||c.has(i.id)||l(i))return;c.add(i.id),delete s[i.id],u();let a=await Ip(r,i.id,t);c.delete(i.id),a.error||!a.value||typeof a.value!=`object`?(s[i.id]={ok:!1,text:Op},Fp(`fail`)):a.value.ok?(o[i.id]=t,Fp(`success`)):(s[i.id]={ok:!1,text:a.value.message||`Доказательство говорит другое`},Fp(`fail`)),u()}zp(t,(e,t)=>{e===`verdict`&&d(t.dataset.id,t.dataset.v===`true`?`true`:`false`)});function f(e){n=Array.isArray(e)?e.filter(e=>e&&e.id!=null):[]}function p(e={}){f(e.items),r=e.onVerdict,a={...i,...e.labels||{}};let n=t.layer.querySelector(`.c3-head-title`);n&&(n.textContent=a.title),o={},s={},u(),t.show()}function m(e){f(e),u()}return{open:p,close:()=>t.hide(),isOpen:t.isOpen,refresh:m}}var Gp=e=>e.replace(/^\s*[✓✔✗×✕]\s*/,``);function Kp(e){if(e&&typeof e==`object`){let t=e.ok===!1||e.kind===`bad`||e.kind===`err`;return{text:Gp(String(e.text??``)),kind:t?`bad`:`ok`}}let t=String(e??``),n=/^\s*(✗|×|✕|!|\[?fail)/i.test(t)||/ошибк|не пройден|провал/i.test(t);return{text:Gp(t),kind:n?`bad`:`ok`}}function qp(e){let t=Rp(e,{name:`autotest`,title:`Конструктор автотеста`,size:`wide`}),n=[],r=null,i=null,a=[],o=[],s=null,c=!1,l=!1,u=0,d=e=>n.find(t=>String(t.id)===String(e));function f(){let e=new Set(a.map(String)),r=c||l;t.setSub(`Шагов в сценарии: ${a.length}`);let i=n.length?n.map(t=>{let n=e.has(String(t.id));return`<li><button class="c3-block${n?` c3-used`:``}" type="button" data-act="add" data-id="${Mp(t.id)}"${n||r?` disabled`:``}>
              <span class="c3-block-plus" aria-hidden="true">${n?`✓`:`+`}</span><span>${Mp(t.label)}</span>
            </button></li>`}).join(``):`<li class="c3-empty">Блоков нет</li>`,u=a.length?a.map((e,t)=>{let n=d(e);return`<li><button class="c3-step" type="button" data-act="remove" data-i="${t}"${r?` disabled`:``} aria-label="Шаг ${t+1}: ${Mp(n?.label||e)}. Убрать">
              <span class="c3-step-num">${t+1}</span><span class="c3-step-label">${Mp(n?.label||e)}</span><span class="c3-step-x" aria-hidden="true">×</span>
            </button></li>`}).join(``):`<li class="c3-empty">Сценарий пуст. Нажми на блок слева.</li>`,f=o.length||c?`<h3 class="c3-sec">Лог запуска</h3>
          <div class="c3-at-log" role="log" aria-live="polite">${o.map(e=>`<div class="c3-log-row c3-log-${e.kind}">${Mp(e.text)}</div>`).join(``)}${c?`<div class="c3-log-row c3-log-dim c3-log-wait">выполняется…</div>`:``}</div>`:``,p=s?Bp(s):`<p class="c3-msg c3-muted">${c?`Сценарий выполняется`:a.length?`Готов к запуску`:`Добавь шаги`}</p>`,m=l?`<button class="c3-btn c3-btn-primary" type="button" data-act="done">Готово</button>`:`<button class="c3-btn" type="button" data-act="clear"${!a.length||c?` disabled`:``}>Очистить</button>
         <button class="c3-btn c3-btn-primary" type="button" data-act="run"${!a.length||c?` disabled`:``}>${c?`Запуск…`:`Запустить`}</button>`;t.body.innerHTML=`
      <div class="c3-scroll">
        <p class="c3-lead">Нажми на блок, чтобы добавить его в конец сценария. Нажми на шаг сценария, чтобы убрать его.</p>
        <div class="c3-at-cols">
          <section class="c3-at-col">
            <h3 class="c3-sec">Блоки</h3>
            <ul class="c3-at-blocks">${i}</ul>
          </section>
          <section class="c3-at-col">
            <h3 class="c3-sec">Сценарий <span class="c3-count">${a.length}</span></h3>
            <ol class="c3-at-scn">${u}</ol>
          </section>
        </div>
        ${f}
      </div>
      <footer class="c3-actions">${p}<span class="c3-actions-btns">${m}</span></footer>`}function p(){let e=t.body.querySelector(`.c3-scroll`);e&&(e.scrollTop=e.scrollHeight)}async function m(){if(c||l||!a.length)return;let e=++u;c=!0,o=[],s=null,f(),p();let t=await Ip(r,a.slice());if(e!==u)return;if(t.error||!t.value||typeof t.value!=`object`){c=!1,s={ok:!1,text:Op},Fp(`fail`),f(),p();return}let n=Array.isArray(t.value.lines)?t.value.lines:[];for(let t of n){if(await Pp(jp),e!==u)return;o.push(Kp(t)),f(),p()}if(await Pp(jp),e!==u)return;let i=!!t.value.ok;c=!1,l=i,s={ok:i,text:t.value.message||(i?`Сценарий выполнен`:`Сценарий не прошёл`)},Fp(i?`success`:`fail`),f(),p()}zp(t,(e,n)=>{if(e===`add`){let e=d(n.dataset.id)?.id;if(e==null||a.some(t=>String(t)===String(e)))return;a.push(e),s=null,f()}else e===`remove`?(a.splice(Number(n.dataset.i),1),s=null,f()):e===`clear`?(a=[],s=null,f()):e===`run`?m():e===`done`&&t.hide()});function h(e={}){let d=Array.isArray(e.blocks)?e.blocks.filter(e=>e&&e.id!=null):[];r=e.onRun;let p=d.map(e=>String(e.id)).join(`|`);n=d,p!==i&&(i=p,u++,a=[],o=[],s=null,c=!1,l=!1),f(),t.show()}return{open:h,close:()=>t.hide(),isOpen:t.isOpen}}var Jp=512,Yp=330;function Xp(){let e=new kn;e.background=new U(461071),e.fog=new On(461071,7,16),e.add(new Oa(9083592,2365972,.6));let t=new Ga(10466559,.35);t.position.set(-4,4,1),e.add(t);let n=t=>(e.add(t),t),r=3029072;n(Q(4.4,.1,3.8,3878697,0,-.1,0)),n(Q(4.4,2.7,.1,r,0,0,-1.85)),n(Q(.1,2.7,3.8,r,2.25,0,0)),n(Q(.1,.9,3.8,r,-2.25,0,0)),n(Q(.1,.5,3.8,r,-2.25,2.2,0)),n(Q(.1,1.3,1.1,r,-2.25,.9,-1.3)),n(Q(.1,1.3,1.3,r,-2.25,.9,1.25)),n(Q(4.4,.1,3.8,1843762,0,2.7,0)),n(Q(4.4,.12,.04,2304829,0,0,-1.79));let i=new qr(new Gi(1.2,1.3),new Fr({color:726579,toneMapped:!1}));i.position.set(-2.32,1.55,-.15),i.rotation.y=Math.PI/2,n(i),n(jd(.09,15921382,-2.3,1.95,.2,8,new Fr({color:15921382})));for(let e=0;e<14;e++){let e=new qr(new Gi(.018,.018),new Fr({color:16777215}));e.position.set(-2.3,1+Math.random()*1.1,-.7+Math.random()*1.1),e.rotation.y=Math.PI/2,n(e)}n(Q(.12,.05,1.3,4864558,-2.18,.88,-.15)),n(Q(.06,1.3,.05,4864558,-2.2,.9,-.15));let a=8017464;n(Q(1.7,.06,.72,10121034,0,.72,-1.42));for(let[e,t]of[[-.8,-1.72],[.8,-1.72],[-.8,-1.12],[.8,-1.12]])n(Q(.05,.72,.05,a,e,0,t));n(Q(.1,.16,.08,1382430,0,.78,-1.64)),n(Q(.66,.44,.06,1382430,0,.94,-1.64));let o=document.createElement(`canvas`);o.width=Jp,o.height=Yp;let s=o.getContext(`2d`),c=new Ni(o);c.colorSpace=We;let l=new qr(new Gi(.6,.387),new Fr({map:c,toneMapped:!1}));l.position.set(0,1.16,-1.606),n(l),n(Q(.46,.02,.15,2237998,0,.78,-1.3)),n(Q(.07,.025,.11,2237998,.36,.78,-1.3)),n(Q(.24,.012,.32,15722191,.58,.78,-1.3));let u=Cd(`1. Сохранился у босса
2. Открыл инвентарь
3. Прыгнул
4. Зависла!`,{width:.22,height:.3,bg:`#efe6cf`,fg:`#2a3a7a`,font:`bold 96px "Segoe Print", "Comic Sans MS", cursive`,align:`left`,pad:40,lineHeight:1.5});u.position.set(.58,.794,-1.3),u.rotation.x=-Math.PI/2,n(u),n(Q(.012,.012,.16,3166400,.72,.795,-1.32)),n(Ad(.07,.09,.03,2830648,-.62,.78,-1.5)),n(Ad(.012,.012,.32,2830648,-.62,.81,-1.5)),n(Ad(.05,.11,.1,14200906,-.62,1.11,-1.5,8));let d=new Ha(16760944,1.4,4,1.6);d.position.set(-.62,1.05,-1.4),n(d);let f=new Ha(7320575,1.2,3.2,1.6);f.position.set(0,1.15,-1.25),n(f);let p=2041392;n(Q(.5,.06,.5,p,0,.45,-.72)),n(Q(.5,.62,.06,p,0,.5,-.45)),n(Ad(.03,.03,.45,1119256,0,0,-.72)),n(Q(1,.42,2,5126744,1.68,0,.6)),n(Q(.7,.12,.35,15262420,1.68,.42,-.2)),n(Q(1,.04,.26,a,-1.3,1.85,-1.72));for(let e=0;e<6;e++)n(Q(.07,.24,.18,[11553338,3829680,14200906,4885082][e%4],-1.7+e*.12,1.89,-1.72));let m=Cd(`ПИКСЕЛЬ
КВЕСТ`,{width:.6,height:.8,bg:`#2a1f3e`,fg:`#ffcf7a`,font:`bold 150px sans-serif`});m.position.set(-1.3,1.25,-1.79),n(m);let h=[],g=[15914314,15902659,9425906,12051338];for(let e=0;e<42;e++){let t=e%7,r=Math.floor(e/7),i=g[e%4],a=Q(.13,.13,.006,i,.95+t*.17+(Math.random()-.5)*.04,.95+r*.2+(Math.random()-.5)*.04,-1.795,gd(i,{emissive:i,emissiveIntensity:.35}));a.rotation.z=(Math.random()-.5)*.25,a.visible=!1,n(a),h.push(a)}let _=Pd({name:`hero`,shirt:4020864,pants:2830136,hair:3811870,skin:$.skin});_.rotation.y=Math.PI,n(_);let v=`game`,y=``,b=0;function x(e=!1){let t=s.createLinearGradient(0,0,0,Yp);t.addColorStop(0,`#2b1d5a`),t.addColorStop(1,`#d0607a`),s.fillStyle=t,s.fillRect(0,0,Jp,Yp),s.fillStyle=`#2f6b4a`,s.beginPath(),s.moveTo(0,250);for(let e=0;e<=Jp;e+=32)s.lineTo(e,230+Math.sin(e/40)*18);if(s.lineTo(Jp,Yp),s.lineTo(0,Yp),s.fill(),s.fillStyle=`#ffd34a`,s.fillRect(110,200,22,32),s.fillStyle=`#8a1f2a`,s.fillRect(330,120,110,110),s.fillStyle=`#ffffff`,s.fillRect(360,150,14,14),s.fillRect(400,150,14,14),s.fillStyle=`#111`,s.fillRect(300,30,180,16),s.fillStyle=`#e23a3a`,s.fillRect(302,32,60,12),s.fillStyle=`#fff`,s.font=`bold 16px sans-serif`,s.fillText(`ФИНАЛЬНЫЙ БОСС`,300,24),e)for(let e=0;e<9;e++){let e=Math.random()*Yp,t=6+Math.random()*26;s.drawImage(o,0,e,Jp,t,(Math.random()-.5)*70,e,Jp,t),s.fillStyle=Math.random()>.5?`rgba(55,230,255,0.35)`:`rgba(255,61,138,0.35)`,s.fillRect(0,e,Jp,t*.4)}}function S(e,t,n,{size:r=26,top:i=60,align:a=`left`,x:o=36}={}){s.fillStyle=e,s.fillRect(0,0,Jp,Yp),s.fillStyle=t,s.textAlign=a,s.textBaseline=`alphabetic`,n.forEach((e,t)=>{let[n,c]=Array.isArray(e)?e:[e,null];s.font=c||`${r}px sans-serif`,s.fillText(n,a===`center`?Jp/2:o,i+t*r*1.45)}),s.textAlign=`left`}function C(){switch(v){case`game`:x(!1);break;case`glitch`:x(!0);break;case`crash`:S(`#10307a`,`#ffffff`,[[`Игра перестала работать`,`bold 30px sans-serif`],``,`Код ошибки: 0x0412`,`Несохранённый прогресс потерян.`],{top:110,size:24});break;case`sending`:S(`#f2f2f2`,`#22262e`,[[`Новое письмо`,`bold 24px sans-serif`],`Кому: студия «Пиксель»`,`Тема: игра зависает у босса`,``,`Шаги: 1. Сохраниться у босса`,`2. Открыть инвентарь  3. Прыгнуть`,``,[`Отправка…`,`bold 22px sans-serif`]],{top:44,size:20});break;case`mail`:S(`#f2f2f2`,`#22262e`,[[`Студия «Пиксель»`,`bold 24px sans-serif`],`Тема: Re: игра зависает у босса`,``,`Спасибо! Ошибка повторилась`,`по вашим шагам. Исправили`,`в версии 1.0.4.`,``,[`Вы в титрах :)`,`bold 22px sans-serif`]],{top:46,size:21});break;case`credits`:S(`#05060a`,`#c9cfdb`,[`Пиксель Квест`,``,`Программирование`,`Художники`,``,[`Особая благодарность`,`bold 24px sans-serif`],``,[y,`bold 34px sans-serif`]],{top:44,size:22,align:`center`});break;case`ad`:S(`#141a22`,`#e6e9ee`,[[`Студия «Ноль-Один»`,`bold 28px sans-serif`],[`ищет младшего тестировщика`,`bold 24px sans-serif`],``,`Нужно: внимательность`,`и любовь к сломанным вещам.`,``,[`[ Откликнуться ]`,`bold 24px sans-serif`]],{top:58,size:22}),s.fillStyle=`#f2c94c`,s.fillRect(0,0,10,Yp);break;default:s.fillStyle=`#000`,s.fillRect(0,0,Jp,Yp)}c.needsUpdate=!0}let w={game:10451672,glitch:16734880,crash:3824895,sending:14673650,mail:14673650,credits:10134706,ad:15911244},T={setScreen(e){v=e,f.color.setHex(w[e]||7320575),C()},setName(e){y=e,v===`credits`&&C()},setStickers(e){h.forEach((t,n)=>t.visible=n<e)},setHeroAge(e){let t=e===`kid`;_.scale.setScalar(t?.82:1),_.position.set(0,t?-.06:-.36,-.78)}};return T.setHeroAge(`kid`),T.setScreen(`game`),{scene:e,colliders:[],slots:[],objects:{hero:_,screen:l},api:T,cams:{roomFrom:[[.1,1.6,1.5],[0,1.15,-1.6]],roomTo:[[.28,1.38,.15],[0,1.15,-1.6]],notesFrom:[[1,1.35,-.55],[.58,.79,-1.3]],notesTo:[[.72,1.1,-.98],[.58,.79,-1.3]],monFrom:[[-.68,1.32,-.5],[0,1.14,-1.6]],monTo:[[-.52,1.24,-1.08],[0,1.15,-1.6]],screenFrom:[[-.28,1.18,-1.08],[0,1.16,-1.6]],screenTo:[[0,1.16,-1.2],[0,1.16,-1.6]],wallFrom:[[.35,1.5,.5],[1.35,1.35,-1.8]],wallTo:[[1,1.55,-.2],[1.5,1.45,-1.8]],adFrom:[[.15,1.35,.7],[0,1.16,-1.6]],adVia:[.9,1.3,-.8],adTo:[[0,1.17,-1.12],[0,1.16,-1.6]]},update(e,t){Fd(_,t),v===`glitch`&&(b+=e,b>.08&&(b=0,C()))}}}function Zp(e){let t=e.api,n=e.cams;return[{dur:5.2,sub:`Мне было двенадцать. Любимая игра зависла прямо на финальном боссе.`,from:n.roomFrom,to:n.roomTo,start:()=>{t.setHeroAge(`kid`),t.setStickers(0),t.setScreen(`game`)},events:[[2.6,()=>(t.setScreen(`glitch`),X.glitch())],[3.7,()=>(t.setScreen(`crash`),X.fail())]]},{dur:4.6,sub:`Другой бы выключил компьютер. А я открыл тетрадь и записал, что делал перед ошибкой.`,from:n.notesFrom,to:n.notesTo,events:[[.6,()=>X.click()]]},{dur:4.6,sub:`Через неделю я смог её повторить. Снова и снова. И написал разработчикам.`,from:n.monFrom,to:n.monTo,start:()=>t.setScreen(`game`),events:[[1,()=>(t.setScreen(`glitch`),X.glitch())],[1.7,()=>t.setScreen(`crash`)],[2.8,()=>(t.setScreen(`sending`),X.ui())]]},{dur:5,sub:`Они ответили: «Спасибо, исправили». А в титрах игры появилось моё имя.`,from:n.screenFrom,to:n.screenTo,start:()=>(t.setScreen(`mail`),X.message()),events:[[2.5,()=>(t.setScreen(`credits`),X.success())]]},{dur:4.6,sub:`Потом были сотни найденных багов. Колледж. И одно объявление.`,from:n.wallFrom,to:n.wallTo,start:()=>{t.setHeroAge(`adult`),t.setScreen(`credits`)},tick:e=>t.setStickers(Math.round(3+e*39))},{dur:4.6,sub:`«Студия „Ноль-Один“ ищет тестировщика». Сегодня мой первый рабочий день.`,from:n.adFrom,via:n.adVia,to:n.adTo,start:()=>(t.setScreen(`ad`),X.message())}]}var Qp=e=>e<.5?2*e*e:1-(-2*e+2)**2/2;function $p({intro:e,camera:t,root:n,name:r,fade:i}){e.api.setName(r);let a=Zp(e),o=document.createElement(`div`);o.className=`cutscene letterbox`,o.innerHTML=`<button class="cut-skip">Пропустить ›</button><div class="cut-sub"></div>`,n.appendChild(o);let s=o.querySelector(`.cut-sub`),c=o.querySelector(`.cut-skip`);Ml||(c.textContent=`Пропустить (Пробел) ›`);let l=zu(),u=!1,d,f=new Promise(e=>d=e),p=new H,m=new H,h=new H,g=new H,_=new H,v=-1,y=0,b=new Set,x=0;function S(e,t){v=e,y=t,b=new Set;let n=a[e];n.start?.(),s.classList.remove(`show`),s.offsetWidth,s.textContent=n.sub,s.classList.add(`show`)}function C(e){if(u)return;v<0&&S(0,e);let n=a[v],r=(e-y)/1e3;if(r>=n.dur){if(v+1>=a.length){w();return}S(v+1,e),n=a[v],r=0}let i=Math.min(1,r/n.dur),o=Qp(i);if(p.fromArray(n.from[0]),m.fromArray(n.to[0]),h.fromArray(n.from[1]),g.fromArray(n.to[1]),n.via){let e=1-o;t.position.set(e*e*p.x+2*e*o*n.via[0]+o*o*m.x,e*e*p.y+2*e*o*n.via[1]+o*o*m.y,e*e*p.z+2*e*o*n.via[2]+o*o*m.z)}else t.position.lerpVectors(p,m,o);_.lerpVectors(h,g,o),t.lookAt(_),n.tick?.(i),(n.events||[]).forEach(([e,t],n)=>{r>=e&&!b.has(n)&&(b.add(n),t())}),x=requestAnimationFrame(C)}async function w(){u||(u=!0,cancelAnimationFrame(x),window.removeEventListener(`keydown`,T),l(),await i?.(),o.remove(),d())}function T(e){(e.code===`Space`||e.code===`Enter`||e.code===`Escape`)&&(e.preventDefault(),w())}return c.addEventListener(`click`,()=>w()),window.addEventListener(`keydown`,T),x=requestAnimationFrame(C),{done:f,skip:w}}var em={profession:`Тестировщик игр (QA)`,what:[`Получает задание и готовит всё для проверки: ставит нужные программы и настраивает тестовую среду.`,`Проходит программу или игру по тестовым сценариям и сравнивает, что получилось, с тем, что должно было получиться.`,`Нашёл ошибку: записывает её в систему учёта ошибок (баг-трекер) и описывает, при каких условиях она возникла.`,`Когда разработчики всё исправили, снова запускает проверку, которая нашла ошибку, и убеждается, что теперь всё работает.`,`Пишет отчёт о тестировании и работает в одной команде с разработчиками.`],skills:[`Сравнивать фактический результат с ожидаемым.`,`Точно и понятно описывать ошибку.`,`Пользоваться системой учёта ошибок.`,`Придумывать тестовые случаи разными техниками тест-дизайна.`,`Знать основы программирования, чтобы писать автотесты.`,`Работать в команде с разработчиками.`],study:[{name:`Ростовский-на-Дону колледж связи и информатики (РКСИ)`,city:`Ростов-на-Дону`,level:`Колледж`,what:`09.02.11 «Разработка и управление программным обеспечением», после 9 класса. В программе: принципы тестирования и обеспечения качества.`,url:`https://www.rksi.ru/spec_rupo`},{name:`Авиационно-технологический колледж ДГТУ`,city:`Ростов-на-Дону`,level:`Колледж`,what:`09.02.11 «Разработка и управление программным обеспечением», 40 бюджетных мест на 2026/2027 год.`,url:`https://donstu.ru/upload/medialibrary/2b6/ldxebz0vdogfv22pgjsjwy2ojuv1eq3d.pdf`},{name:`Донской государственный технический университет (ДГТУ), кафедра ПОВТ и АС`,city:`Ростов-на-Дону`,level:`Вуз`,what:`Бакалавриат 09.03.04 «Программная инженерия»: разработка и проектирование программ.`,url:`https://donstu.ru/university/faculties/informatics/po-vychislitelnoy-tekhniki/`},{name:`Институт компьютерных технологий и информационной безопасности (ИКТИБ) ЮФУ`,city:`Таганрог`,level:`Вуз`,what:`Бакалавриат 09.03.04 «Программная инженерия», профиль «Методы и средства разработки программного обеспечения».`,url:`https://ictis.sfedu.ru/education/`},{name:`Детский технопарк «Кванториум» Ростовской области, IT-квантум`,city:`Ростов-на-Дону`,level:`Для школьников`,what:`Бесплатно, 7–17 лет: алгоритмы и программирование на C++, C#, Java, веб-программирование, Arduino.`,url:`https://www.kvantorium-don.ru/it-kvantum`},{name:`Центр цифрового образования детей «IT-куб» при Лицее № 24`,city:`Волгодонск`,level:`Для школьников`,what:`Для 1–11 классов: Python, Java, мобильные приложения, VR/AR-приложения, олимпиадная информатика.`,url:`https://it-cube.licey24vdonsk.edusite.ru/program.html`}],sources:[{title:`Профстандарт «Специалист по тестированию в области информационных технологий» (приказ Минтруда России от 02.08.2021 № 531н)`,url:`https://legalacts.ru/doc/prikaz-mintruda-rossii-ot-02082021-n-531n-ob-utverzhdenii/`},{title:`ФГОС СПО 09.02.11 «Разработка и управление программным обеспечением» (приказ Минпросвещения России от 24.02.2025 № 138)`,url:`https://legalacts.ru/doc/prikaz-minprosveshchenija-rossii-ot-24022025-n-138-ob-utverzhdenii/`},{title:`ФГОС СПО 09.02.07 «Информационные системы и программирование» (приказ Минобрнауки России от 09.12.2016 № 1547)`,url:`https://legalacts.ru/doc/prikaz-minobrnauki-rossii-ot-09122016-n-1547-ob-utverzhdenii/`},{title:`РКСИ: специальности для поступления`,url:`https://www.rksi.ru/admission`},{title:`ДГТУ: контрольные цифры приёма СПО на 2026/2027 учебный год`,url:`https://donstu.ru/upload/medialibrary/2b6/ldxebz0vdogfv22pgjsjwy2ojuv1eq3d.pdf`},{title:`Кванториум Ростовской области: о технопарке (бесплатно, 7–17 лет, адреса)`,url:`https://www.kvantorium-don.ru/about-kvantorium`}],checked:`2026-11-21`},tm=document.getElementById(`view`),nm=document.getElementById(`ui`),rm=new URLSearchParams(location.search).get(`debug`)===`1`,im=new El({canvas:tm,antialias:!Ml,powerPreference:`high-performance`});im.setPixelRatio(Math.min(window.devicePixelRatio,Ml?1.25:1.75)),im.outputColorSpace=We;var am=new Ba(72,1,.05,300);am.rotation.order=`YXZ`;function om(){let e=window.innerWidth,t=window.innerHeight;im.setSize(e,t,!1),am.aspect=e/t,am.fov=e<t?85:72,am.updateProjectionMatrix()}window.addEventListener(`resize`,om),om(),Ll(tm);var sm=new Ul(am),cm=new ql(am),lm=Vu(nm),um=Uu(nm),dm=Ku(nm),fm=Ff(nm),pm={timeline:Vp(nm),console:Hp(nm),hypo:Wp(nm),autotest:qp(nm)};lm.show(!1);var mm=new Set([`menu`]);function hm(e,t){t?mm.add(e):mm.delete(e);let n=mm.size===0;if(n!==Fl.enabled&&(Fl.setEnabled(n),n&&!Ml))try{tm.requestPointerLock?.()?.catch?.(()=>{})}catch{}}G.on(`dialogue:open`,()=>hm(`dialogue`,!0)),G.on(`dialogue:close`,()=>hm(`dialogue`,!1)),G.on(`tablet:open`,()=>hm(`tablet`,!0)),G.on(`tablet:close`,()=>hm(`tablet`,!1)),G.on(`compare:open`,()=>hm(`compare`,!0)),G.on(`panel:open`,e=>hm(`panel:${e}`,!0)),G.on(`panel:close`,e=>hm(`panel:${e}`,!1)),G.on(`compare:close`,()=>hm(`compare`,!1));var gm={},_m=null,vm=null;function ym(e){e&&e.scene.traverse(e=>{e.geometry?.dispose?.();let t=Array.isArray(e.material)?e.material:e.material?[e.material]:[];for(let e of t)e.map?.dispose?.(),e.dispose?.()})}function bm(){ym(gm.office),ym(gm.station),ym(gm.diagnostic),gm.office=Jd(),gm.station=af(),gm.diagnostic=Yf()}function xm(e){return _m=gm[e],vm=e,_m.scene.add(am),sm.colliders=_m.colliders,cm.setSlots(_m.slots),K.state.scene=e,Ru(e===`diagnostic`?`office`:e),_m}var Sm=null,Cm=null,wm=!1,Tm=Object.fromEntries([`onReplay`,`onSubmitReport`,`onDocCheck`,`onHint`,`canHint`,`onCompare`,`onPlayRecording`,`onSaveEvidence`,`getReplayResult`,`isDocChecked`].map(e=>[e,(...t)=>Sm?.tabletCallbacks?.[e]?.(...t)])),Em={camera:am,compare:fm,panels:pm,player:sm,interactor:cm,hud:lm,dialogue:um,screens:dm,block:hm,loadScene:xm,get world(){return _m},get sceneName(){return vm},get tablet(){return Cm},cutscene:!1,finishChapter:()=>Rm()},Dm={nickname:`Тест`,difficulty:`normal`,save:null};function Om(e){Dm.nickname=String(e?.nickname||``).trim().slice(0,16)||`Тест`,Dm.difficulty=[`easy`,`normal`,`hard`].includes(e?.difficulty)?e.difficulty:`normal`,K.platformFlags=e?.flags||{},Mu(!!e?.muted);let t=e?.save||null;!t&&iu.standalone&&(t=bu()),Dm.save=t&&t.v===1&&[1,2,3,4].includes(t.chapter)&&(!t.flags?.chapter_done||t.chapter<4)?t:null}iu.onCommand({pause:()=>{hm(`external`,!0),Pu(!0)},resume:()=>{hm(`external`,!1),Pu(!1)},mute:e=>Mu(e)});var km=!1;async function Am(){if(!wm||km||mm.has(`menu`)||mm.has(`cutscene`)||um.isOpen()||um.escRecently?.()||Cm?.isOpen()||fm.isOpen()||Object.values(pm).some(e=>e.isOpen()))return;km=!0,hm(`pause`,!0);let e=await dm.pause({muted:Nu(),onSound:()=>(Mu(!Nu()),Nu())});dm.close(),km=!1,e===`exit`?Lm():hm(`pause`,!1)}G.on(`input:pause`,Am),document.addEventListener(`pointerlockchange`,()=>{document.pointerLockElement&&!Fl.enabled?document.exitPointerLock():!document.pointerLockElement&&Fl.enabled&&!Ml&&Am()}),G.on(`input:tablet`,()=>{!Cm||Cm.isOpen()||mm.size>0||Cm.open(Sm?.preferredTab?.())});function jm(){wm=!1,Sm?.dispose?.(),Sm=null,Cm?.close?.(),Ru(null),lm.show(!1),lm.setTimer(null),dm.clearFade(),_m=null}var Mm=0,Nm=null;async function Pm(){let e=Mm,t=Xp();return _m=t,vm=`intro`,t.scene.add(am),cm.setSlots([]),Em.cutscene=!0,Ru(null),Nm=$p({intro:t,camera:am,root:nm,name:K.state.name,fade:()=>dm.fadeOut()}),await Nm.done,Nm=null,e===Mm&&(Em.cutscene=!1,_m=null,ym(t),!0)}async function Fm(){Mm+=1;let e=Mm;Nm?.skip(),jm(),mm.clear(),hm(`menu`,!0);let t=dm.loading();t.setProgress(1);let n=!1;for(;;){await t.askStart({canContinue:!!Dm.save,name:Dm.nickname})===`continue`?(fu(Dm.save,Dm.nickname,Dm.difficulty),K.state.flags.chapter_done&&(K.state.chapter===1?pu():K.state.chapter===2?mu():K.state.chapter===3&&hu())):(xu(),du(Dm.nickname,Dm.difficulty),n=!0);break}if(e===Mm){if(dm.close(),n&&!K.state.flags.intro_seen){if(ju(),!await Pm()||e!==Mm)return;K.state.flags.intro_seen=!0}await Im()}}async function Im(e=!1){ju(),e&&bm(),Em.cutscene=!1;let t=K.state.chapter;Sm=t===4?wp(Em):t===3?up(Em):t===2?Bf(Em):yf(Em),Cm||(Cm=md(nm,Tm)),Cm.refresh?.(),lm.show(!0),wm=!0,await Sm.start(),hm(`menu`,!1)}function Lm(){K.state&&_m&&!Em.cutscene&&(K.state.pos=sm.snapshot()),K.state&&(yu(!1),iu.saveNow(K.state),Dm.save=K.state.flags?.chapter_done?null:JSON.parse(JSON.stringify(K.state))),iu.exit(),jm(),bm(),Fm()}async function Rm(e){hm(`menu`,!0),wm=!1,lm.show(!1),lm.setTimer(null);let t=Sm.result(e),n=K.state.chapter;Cu(n===4?`gl_chapter4`:n===3?`gl_chapter3`:n===2?`gl_chapter2`:`gl_chapter1`),n===1&&(K.state.hintsUsed||0)===0&&Cu(`gl_no_hints`),K.state.flags.chapter_done=!0,K.state.ending=t.ending,yu(!1),iu.saveNow(K.state),iu.end({ending:t.ending,stars:t.stars,score:t.score,durationSec:t.durationSec,choices:t.choices});let r=await dm.chapterEnd({...t,career:em,hasNext:n<4});dm.close(),Dm.save=null,r===`next`?(jm(),n===1?pu():n===2?mu():hu(),iu.saveNow(K.state),await Im(!0)):r===`restart`?(jm(),n===4?Bm():n===3?Vm():n===2?zm():(xu(),du(Dm.nickname,Dm.difficulty)),await Im(!0)):(n<4&&(n===1?pu():n===2?mu():hu(),iu.saveNow(K.state),Dm.save=JSON.parse(JSON.stringify(K.state))),iu.exit(),jm(),bm(),Fm())}function zm(){for(let e of Object.keys(K.state.decisions||{}))e.startsWith(`gl_ch2_`)&&delete K.state.decisions[e];Object.assign(K.state,{flags:{},scene:`diagnostic`,pos:null,playTime:0,mistakes:0,hintsUsed:0,ending:null,ch2:{build:`0.9.7`,obs:{},hasSwitcher:!1}}),yu()}function Bm(){for(let e of Object.keys(K.state.decisions||{}))e.startsWith(`gl_ch4_`)&&delete K.state.decisions[e];Object.assign(K.state,{flags:{},scene:`office`,pos:null,playTime:0,mistakes:0,hintsUsed:0,ending:null,ch4:gu()}),yu()}function Vm(){for(let e of Object.keys(K.state.decisions||{}))e.startsWith(`gl_ch3_`)&&delete K.state.decisions[e];Object.assign(K.state,{flags:{},scene:`office`,pos:null,playTime:0,mistakes:0,hintsUsed:0,ending:null,ch3:_u()}),yu()}var Hm=new po,Um=0;function Wm(){let e=Math.min(Hm.getDelta(),.05),t=Hm.elapsedTime;Fl.update();let n=mm.has(`external`);_m&&!n&&(Em.cutscene||sm.update(e),_m.update(e,t,sm.pos),Sm?.update(e,t),cm.update(),wm&&!km&&K.state&&(K.state.playTime=(K.state.playTime||0)+e),Um+=e,Um>4&&K.state&&!Em.cutscene&&(Um=0,K.state.pos=sm.snapshot(),yu(!1))),_m?im.render(_m.scene,am):im.clear(),requestAnimationFrame(Wm)}function Gm(){K.state&&wm&&(_m&&!Em.cutscene&&(K.state.pos=sm.snapshot()),yu(!1),iu.saveNow(K.state))}window.addEventListener(`pagehide`,Gm),document.addEventListener(`visibilitychange`,()=>{document.visibilityState===`hidden`&&Gm()});var Km=()=>new Promise(e=>requestAnimationFrame(()=>e()));async function qm(){let e=dm.loading();e.setProgress(.15,`Загружаем движок…`),await Km(),gm.office=Jd(),e.setProgress(.45,`Строим офис студии…`),await Km(),gm.station=af(),e.setProgress(.75,`Строим станцию…`),await Km(),gm.diagnostic=Yf(),e.setProgress(.85,`Строим комнату, которой нет…`),await Km();for(let e of Object.values(gm))e.scene.add(am),im.compile(e.scene,am);e.setProgress(.95,`Подключаемся…`),requestAnimationFrame(Wm),Om(await iu.waitInit()),e.setProgress(1),rm&&Ym(),await Fm()}function Jm(e){Mm+=1,Nm?.skip(),jm(),dm.close(),mm.clear(),hm(`menu`,!0),bm(),xu(),du(Dm.nickname,Dm.difficulty);let t=/^ch(\d)/.exec(e)?.[1]|0;if(!t)Cf(K.state,e);else{if(Cf(K.state,`door`),K.state.flags.chapter_done=!0,pu(),t===2)return void Wf(K.state,e);if(Wf(K.state,`ch2_call`),K.state.flags.chapter_done=!0,mu(),t===3)return void pp(K.state,e);pp(K.state,`ch3_hypos`),Object.assign(K.state.flags,{autotest_done:!0,nikita_posted:!0,chapter_done:!0}),hu(),Dp(K.state,e)}}function Ym(){let e=document.createElement(`div`);e.className=`debug-menu`,e.innerHTML=`<button data-t>DEBUG (F2)</button><div class="debug-panel hidden">
    <b>Перейти к сцене</b>
    ${[...bf,...Vf,...dp,...Tp].map(([e,t])=>`<button data-p="${e}">${t}</button>`).join(``)}
    <b>Получить концовку</b>
    ${Object.entries({...cf,...Af,...op,...yp}).map(([e,t])=>`<button data-e="${e}">${t.title} (${e})</button>`).join(``)}
    <b>Сложность</b>
    ${[`easy`,`normal`,`hard`].map(e=>`<button data-d="${e}">${e}</button>`).join(``)}
  </div>`,nm.appendChild(e);let t=e.querySelector(`.debug-panel`),n=e=>{t.classList.toggle(`hidden`,!e),hm(`debug`,e)};window.addEventListener(`keydown`,e=>{e.code===`F2`&&(e.preventDefault(),n(t.classList.contains(`hidden`)))}),e.addEventListener(`click`,async e=>{let r=e.target.closest(`button`);r&&(r.dataset.t===void 0?(n(!1),r.dataset.d?(Dm.difficulty=r.dataset.d,K.state&&(K.state.difficulty=r.dataset.d),lm.toast(`Сложность: ${vu().label}`)):r.dataset.p?(Jm(r.dataset.p),await Im()):r.dataset.e&&(Jm(yp[r.dataset.e]?`ch4_lis`:op[r.dataset.e]?`ch3_hypos`:Af[r.dataset.e]?`ch2_call`:`door`),await Im(),r.dataset.e===`gl_ch1_thorough`&&(K.state.evidence.chalk_note=!0),Rm(r.dataset.e))):n(t.classList.contains(`hidden`)))})}rm&&(window.__glitch={ctx:Em,game:K,player:sm,get chapter(){return Sm},get tablet(){return Cm},cb:Tm,blockers:mm,interact(e){let t=cm.handlers[e];if(!t)throw Error(`нет обработчика ${e}`);return t.onUse()},teleport(e,t,n=sm.yaw){sm.place({x:e,z:t,yaw:n})}}),qm();