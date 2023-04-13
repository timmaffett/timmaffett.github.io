'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "207310cbf0ca8912d5b63c8fd692ff62",
"assets/AssetManifest.json": "a2c7a9f59b5ad3e5f7718f80d1c7f62a",
"assets/assets/cursors/1.5x/startrek_mousepointer.png": "07485656308a31635bc239232fc161bf",
"assets/assets/cursors/2.0x/startrek_mousepointer.png": "6192f3f50a21c636b0f8f68cb668a329",
"assets/assets/cursors/2.5x/startrek_mousepointer.png": "75ff0b8e21e6ad9b6e7081cf241b78a2",
"assets/assets/cursors/2.5x/startrek_mousepointer25Only.png": "75ff0b8e21e6ad9b6e7081cf241b78a2",
"assets/assets/cursors/3.0x/startrek_mousepointer.png": "84ea9a82470f5a7b8c5a1a8c84d5cc16",
"assets/assets/cursors/3.5x/startrek_mousepointer.png": "42ab8aa8298cb535e8e97b47bd640f35",
"assets/assets/cursors/4.0x/startrek_mousepointer.png": "6527734fa1ff61aa17a900eca2608844",
"assets/assets/cursors/8.0x/startrek_mousepointer.png": "208815f8187d47aa6cdd4054b132d26e",
"assets/assets/cursors/cat_cursor.png": "ca61bc3befd5072be58e06a9f80f25e0",
"assets/assets/cursors/cat_cursor2xWithBlueShadow.png": "7a04326f254b210e7603af3f7919043c",
"assets/assets/cursors/cat_cursor4xWithPinkShadow.png": "9f83334d2459c587954cfee0c88b6b80",
"assets/assets/cursors/example_game_cursor_64x64.png": "b9864e16a164fe2afa273b1441a5b33d",
"assets/assets/cursors/star-trek-mouse-pointer-cursor292x512.png": "af145fa7e61f9ae80899b5b8613902c3",
"assets/assets/cursors/startrek_mousepointer.png": "0ae42b5cc82773a9c5de51dc55af7f78",
"assets/assets/cursors/startrek_mousepointer25Only.png": "0ae42b5cc82773a9c5de51dc55af7f78",
"assets/FontManifest.json": "7c9b73b967957434d9db5d975c290b1c",
"assets/fonts/MaterialIcons-Regular.otf": "e7069dfd19b331be16bed984668fe080",
"assets/NOTICES": "8706936c583532076a5feab287d2b23a",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/packages/material_symbols_icons/lib/fonts/MaterialSymbolsOutlined%255BFILL,GRAD,opsz,wght%255D.ttf": "1e1e4937bcd2f211626192fd0b7fb6d7",
"assets/packages/material_symbols_icons/lib/fonts/MaterialSymbolsRounded%255BFILL,GRAD,opsz,wght%255D.ttf": "fb45000ac037781f6f67ba0ab0181dc9",
"assets/packages/material_symbols_icons/lib/fonts/MaterialSymbolsSharp%255BFILL,GRAD,opsz,wght%255D.ttf": "6bcbebc50830ce2df887370ac8cb15bc",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"canvaskit/canvaskit.js": "cad8c6cd715098dac99920fc21e43a71",
"canvaskit/canvaskit.wasm": "bdae75582f87e6f9822411d2638f3e60",
"canvaskit/chromium/canvaskit.js": "2b66fe7a1325a36af792da62fb2e1de2",
"canvaskit/chromium/canvaskit.wasm": "918100dfb6f4b6549aaf3b7b95091673",
"canvaskit/obj/third_party/freetype2/freetype2.ninja": "c573757c3efc437e130d6c07d4bbb34e",
"canvaskit/obj/third_party/freetype2/freetype2_canvaskit.vcxproj": "71c3d9cf66c82a30d7987a31aa687659",
"canvaskit/obj/third_party/freetype2/freetype2_canvaskit.vcxproj.filters": "bfc744db25bce018538ad99cf74c6515",
"canvaskit/obj/third_party/harfbuzz/harfbuzz.ninja": "f86547936d0108964c5f98149bb7bb36",
"canvaskit/obj/third_party/harfbuzz/harfbuzz_canvaskit.vcxproj": "0e9c3da9b6da37d2adeab9c96af65585",
"canvaskit/obj/third_party/harfbuzz/harfbuzz_canvaskit.vcxproj.filters": "e5a873508ad716132015d4a93c420a15",
"canvaskit/obj/third_party/harfbuzz/harfbuzz_sources.ninja": "5fff45ab9367fb63e977d949ca33dea5",
"canvaskit/obj/third_party/harfbuzz/harfbuzz_sources_canvaskit.vcxproj": "fe8277b5bbfdd7bc397d9d47ddba4abf",
"canvaskit/obj/third_party/harfbuzz/harfbuzz_sources_canvaskit.vcxproj.filters": "d821a876f5285528ef4937df1ecaddeb",
"canvaskit/obj/third_party/icu/icudata_canvaskit.vcxproj": "834378aa2bc857b91df33b34f44d1ee6",
"canvaskit/obj/third_party/icu/icudata_canvaskit.vcxproj.filters": "e5a873508ad716132015d4a93c420a15",
"canvaskit/obj/third_party/icu/icui18n.ninja": "de91495bb8f796d3683b48dd3face670",
"canvaskit/obj/third_party/icu/icui18n_canvaskit.vcxproj": "68a935d95262af68e5919951ba092a86",
"canvaskit/obj/third_party/icu/icui18n_canvaskit.vcxproj.filters": "63127419c7e291b6a4124f6651a6a10d",
"canvaskit/obj/third_party/icu/icuuc_canvaskit.vcxproj": "e2a4548c0b6dcc4bcedc9129b6c437cd",
"canvaskit/obj/third_party/icu/icuuc_canvaskit.vcxproj.filters": "e5a873508ad716132015d4a93c420a15",
"canvaskit/obj/third_party/icu/icuuc_private.ninja": "029da4723443e7628f7fbd8677447b09",
"canvaskit/obj/third_party/icu/icuuc_private_canvaskit.vcxproj": "068423736fbbeaf60e92b009006c1152",
"canvaskit/obj/third_party/icu/icuuc_private_canvaskit.vcxproj.filters": "59281c3e05befd1ed10cd5a13504ed0a",
"canvaskit/obj/third_party/icu/icuuc_public.ninja": "c0b3e6d31447feef5f2643de73d5cb76",
"canvaskit/obj/third_party/icu/icuuc_public_canvaskit.vcxproj": "1ae175b57fe69aa300a8e33aefbf114b",
"canvaskit/obj/third_party/icu/icuuc_public_canvaskit.vcxproj.filters": "be9392e2b662623e36b42e9eef760f7a",
"canvaskit/obj/third_party/icu/icu_canvaskit.vcxproj": "1db8811940efe1f9c870ac6528cfb06e",
"canvaskit/obj/third_party/icu/icu_canvaskit.vcxproj.filters": "e5a873508ad716132015d4a93c420a15",
"canvaskit/obj/third_party/libjpeg-turbo/libjpeg.ninja": "312a5fa3e0c0b03f36892782b630070c",
"canvaskit/obj/third_party/libjpeg-turbo/libjpeg_canvaskit.vcxproj": "98485d36c21cbeb0e87ed72720fb0994",
"canvaskit/obj/third_party/libjpeg-turbo/libjpeg_canvaskit.vcxproj.filters": "09b39861a53cbc047f86de9e4777c8bc",
"canvaskit/obj/third_party/libjpeg-turbo/simd.ninja": "7caf0c6867a9d88caf63ec976044e189",
"canvaskit/obj/third_party/libjpeg-turbo/simd_canvaskit.vcxproj": "9ff62e451a77850b3ec1f01fea95a256",
"canvaskit/obj/third_party/libjpeg-turbo/simd_canvaskit.vcxproj.filters": "c747e26fe0a06fcce34ffd40c09849cb",
"canvaskit/obj/third_party/libpng/libpng.ninja": "2b36387fb5a9c64e979348516cb3530f",
"canvaskit/obj/third_party/libpng/libpng_canvaskit.vcxproj": "d5bc65871729d62f62d59fff64932f58",
"canvaskit/obj/third_party/libpng/libpng_canvaskit.vcxproj.filters": "396c0687f80f495ff5b6b1bb5195e1e6",
"canvaskit/obj/third_party/libwebp/libwebp.ninja": "1b78273ed5e5c3643191064f23469a77",
"canvaskit/obj/third_party/libwebp/libwebp_canvaskit.vcxproj": "5fddbe74c6dcb7ac948b73d36dc83b44",
"canvaskit/obj/third_party/libwebp/libwebp_canvaskit.vcxproj.filters": "94e35582bf75e7cdc067b2233af1c5d6",
"canvaskit/obj/third_party/libwebp/libwebp_sse41.ninja": "6e2e1d419ff5c01c5e57127a45dd9ccb",
"canvaskit/obj/third_party/libwebp/libwebp_sse41_canvaskit.vcxproj": "c5e53962586af9595d735ba43ebaaf1a",
"canvaskit/obj/third_party/libwebp/libwebp_sse41_canvaskit.vcxproj.filters": "85a4dbf8330a8690d7b6511d89ea11d3",
"canvaskit/obj/third_party/skia/android_utils.ninja": "089c10868b27ac06395fb60ded16de34",
"canvaskit/obj/third_party/skia/android_utils_canvaskit.vcxproj": "70d64162ad03a6d9cfb2534deca692d6",
"canvaskit/obj/third_party/skia/android_utils_canvaskit.vcxproj.filters": "e5a873508ad716132015d4a93c420a15",
"canvaskit/obj/third_party/skia/avif.ninja": "8310baa127b1d849396015a4ee1d6620",
"canvaskit/obj/third_party/skia/avif_canvaskit.vcxproj": "e737300de7544a88345957d9df177101",
"canvaskit/obj/third_party/skia/avif_canvaskit.vcxproj.filters": "e5a873508ad716132015d4a93c420a15",
"canvaskit/obj/third_party/skia/avx.ninja": "788e42a99a80dbcfd292325b8ed292ac",
"canvaskit/obj/third_party/skia/avx_canvaskit.vcxproj": "3ef467a6bbee3a1f4671b0f8614cecbd",
"canvaskit/obj/third_party/skia/avx_canvaskit.vcxproj.filters": "e5a873508ad716132015d4a93c420a15",
"canvaskit/obj/third_party/skia/compile_sksl_glsl_nosettings_tests_canvaskit.vcxproj": "0e20b858e44927fe211f6de3fa4897ea",
"canvaskit/obj/third_party/skia/compile_sksl_glsl_nosettings_tests_canvaskit.vcxproj.filters": "e5a873508ad716132015d4a93c420a15",
"canvaskit/obj/third_party/skia/compile_sksl_glsl_tests_canvaskit.vcxproj": "2aae3078dcfae40234ada8913c9c5f23",
"canvaskit/obj/third_party/skia/compile_sksl_glsl_tests_canvaskit.vcxproj.filters": "e5a873508ad716132015d4a93c420a15",
"canvaskit/obj/third_party/skia/compile_sksl_metal_tests_canvaskit.vcxproj": "3b0593ac8ee53d3f319e50414e81abeb",
"canvaskit/obj/third_party/skia/compile_sksl_metal_tests_canvaskit.vcxproj.filters": "e5a873508ad716132015d4a93c420a15",
"canvaskit/obj/third_party/skia/compile_sksl_skrp_tests_canvaskit.vcxproj": "ad8ed5f07fc340140f083d480738b5dd",
"canvaskit/obj/third_party/skia/compile_sksl_skrp_tests_canvaskit.vcxproj.filters": "e5a873508ad716132015d4a93c420a15",
"canvaskit/obj/third_party/skia/compile_sksl_skvm_tests_canvaskit.vcxproj": "7db710d6754ff2135b04f825589ed479",
"canvaskit/obj/third_party/skia/compile_sksl_skvm_tests_canvaskit.vcxproj.filters": "e5a873508ad716132015d4a93c420a15",
"canvaskit/obj/third_party/skia/compile_sksl_spirv_tests_canvaskit.vcxproj": "9ccab803d740e6d3adf85cedbd6eaa04",
"canvaskit/obj/third_party/skia/compile_sksl_spirv_tests_canvaskit.vcxproj.filters": "e5a873508ad716132015d4a93c420a15",
"canvaskit/obj/third_party/skia/crc32.ninja": "686ebb3bdd034784930146643ed84a3f",
"canvaskit/obj/third_party/skia/crc32_canvaskit.vcxproj": "e19c5e857f0cb9750ca82f147160529f",
"canvaskit/obj/third_party/skia/crc32_canvaskit.vcxproj.filters": "e5a873508ad716132015d4a93c420a15",
"canvaskit/obj/third_party/skia/experimental/ffmpeg/video_decoder_canvaskit.vcxproj": "b28916bc5df92a8758ba9015c8c0e9a3",
"canvaskit/obj/third_party/skia/experimental/ffmpeg/video_decoder_canvaskit.vcxproj.filters": "e5a873508ad716132015d4a93c420a15",
"canvaskit/obj/third_party/skia/fontmgr_android.ninja": "f569916a5890e7dda1b6fc11fca9f268",
"canvaskit/obj/third_party/skia/fontmgr_android_canvaskit.vcxproj": "d74178fb57bc460bf1fa1e4c3105bfd0",
"canvaskit/obj/third_party/skia/fontmgr_android_canvaskit.vcxproj.filters": "e5a873508ad716132015d4a93c420a15",
"canvaskit/obj/third_party/skia/fontmgr_custom.ninja": "2b6c46da6a32d359f9cc87ee9dea6ff7",
"canvaskit/obj/third_party/skia/fontmgr_custom_canvaskit.vcxproj": "f3aa0ec0104b0e4cd11db39726f58bb8",
"canvaskit/obj/third_party/skia/fontmgr_custom_canvaskit.vcxproj.filters": "d92312ed37726bbec3083f469485ef0f",
"canvaskit/obj/third_party/skia/fontmgr_custom_directory.ninja": "42c22177bd09d51c7fcf974c70074490",
"canvaskit/obj/third_party/skia/fontmgr_custom_directory_canvaskit.vcxproj": "ab72cf947df312a119f8c40aae3c889a",
"canvaskit/obj/third_party/skia/fontmgr_custom_directory_canvaskit.vcxproj.filters": "e5a873508ad716132015d4a93c420a15",
"canvaskit/obj/third_party/skia/fontmgr_custom_embedded.ninja": "5d6a499384c83bef79f4bd5db1b37553",
"canvaskit/obj/third_party/skia/fontmgr_custom_embedded_canvaskit.vcxproj": "8a178662e901fdfec8d4d06aebe51e39",
"canvaskit/obj/third_party/skia/fontmgr_custom_embedded_canvaskit.vcxproj.filters": "309ef5eeac309966531202f7729b92f8",
"canvaskit/obj/third_party/skia/fontmgr_custom_embedded_factory.ninja": "c6869ef54f62eee3b4b224dfd7d4baac",
"canvaskit/obj/third_party/skia/fontmgr_custom_embedded_factory_canvaskit.vcxproj": "d80ec1f7cae1eebc8e31924703aa2dae",
"canvaskit/obj/third_party/skia/fontmgr_custom_embedded_factory_canvaskit.vcxproj.filters": "6a4fce06588e4e5c90ca731da8fb2ff5",
"canvaskit/obj/third_party/skia/fontmgr_custom_empty.ninja": "5c1aa62286e7b9aef7adb62209800dbd",
"canvaskit/obj/third_party/skia/fontmgr_custom_empty_canvaskit.vcxproj": "c3530c4d593488474db87e19589f3d8d",
"canvaskit/obj/third_party/skia/fontmgr_custom_empty_canvaskit.vcxproj.filters": "e5a873508ad716132015d4a93c420a15",
"canvaskit/obj/third_party/skia/fontmgr_factory_canvaskit.vcxproj": "622ea2e02812ac9306ceb2c04db0ff42",
"canvaskit/obj/third_party/skia/fontmgr_factory_canvaskit.vcxproj.filters": "e5a873508ad716132015d4a93c420a15",
"canvaskit/obj/third_party/skia/fontmgr_fontconfig.ninja": "dc069837bbed57ffb7889e79bca21f71",
"canvaskit/obj/third_party/skia/fontmgr_FontConfigInterface.ninja": "503b766d3e76c723dacd18799666537d",
"canvaskit/obj/third_party/skia/fontmgr_FontConfigInterface_canvaskit.vcxproj": "2c1dbe793175a9f2478cafcfdef0193e",
"canvaskit/obj/third_party/skia/fontmgr_FontConfigInterface_canvaskit.vcxproj.filters": "e5a873508ad716132015d4a93c420a15",
"canvaskit/obj/third_party/skia/fontmgr_fontconfig_canvaskit.vcxproj": "eae86257dcca2c18a50b35b96d07a3c4",
"canvaskit/obj/third_party/skia/fontmgr_fontconfig_canvaskit.vcxproj.filters": "e5a873508ad716132015d4a93c420a15",
"canvaskit/obj/third_party/skia/fontmgr_fuchsia.ninja": "3e03a5249406be0a1457d4950beeaa83",
"canvaskit/obj/third_party/skia/fontmgr_fuchsia_canvaskit.vcxproj": "b9bfb32d4c45d1fcda4d9862c67c8668",
"canvaskit/obj/third_party/skia/fontmgr_fuchsia_canvaskit.vcxproj.filters": "e5a873508ad716132015d4a93c420a15",
"canvaskit/obj/third_party/skia/fontmgr_mac_ct.ninja": "255b26dc1676536b00c9e3b2cdf8c4a1",
"canvaskit/obj/third_party/skia/fontmgr_mac_ct_canvaskit.vcxproj": "fac163dab25b39c21111a24e80a4c09e",
"canvaskit/obj/third_party/skia/fontmgr_mac_ct_canvaskit.vcxproj.filters": "e5a873508ad716132015d4a93c420a15",
"canvaskit/obj/third_party/skia/fontmgr_win.ninja": "bd5a6f8d28f78cf7888dc61984f093bb",
"canvaskit/obj/third_party/skia/fontmgr_win_canvaskit.vcxproj": "1739151bb9a86559761b6e7181660c12",
"canvaskit/obj/third_party/skia/fontmgr_win_canvaskit.vcxproj.filters": "e5a873508ad716132015d4a93c420a15",
"canvaskit/obj/third_party/skia/fontmgr_win_gdi.ninja": "434d3529b50860cfbdc7342310247b4e",
"canvaskit/obj/third_party/skia/fontmgr_win_gdi_canvaskit.vcxproj": "164d659a1796252e12b6dea941486c11",
"canvaskit/obj/third_party/skia/fontmgr_win_gdi_canvaskit.vcxproj.filters": "e5a873508ad716132015d4a93c420a15",
"canvaskit/obj/third_party/skia/gpu.ninja": "a8758c5de0363b05f42bc424d5bf1fa6",
"canvaskit/obj/third_party/skia/gpu_canvaskit.vcxproj": "4e91c6e9260500bf57386dafda130162",
"canvaskit/obj/third_party/skia/gpu_canvaskit.vcxproj.filters": "65af5ab49cb0bf55d6df4ba29f7878ee",
"canvaskit/obj/third_party/skia/gpu_shared.ninja": "cf0d620ffe0c70396edffdcb222be9f2",
"canvaskit/obj/third_party/skia/gpu_shared_canvaskit.vcxproj": "91755a6d57e671d4c3222a12d31a8bc3",
"canvaskit/obj/third_party/skia/gpu_shared_canvaskit.vcxproj.filters": "377fcd5570dbc21f7886ad5a87e49683",
"canvaskit/obj/third_party/skia/graphite.ninja": "c409ebdaacbfeeae2af87c368dbcb7fc",
"canvaskit/obj/third_party/skia/graphite_canvaskit.vcxproj": "a970f5a8cf3b1015ae47212382c7625d",
"canvaskit/obj/third_party/skia/graphite_canvaskit.vcxproj.filters": "e5a873508ad716132015d4a93c420a15",
"canvaskit/obj/third_party/skia/heif.ninja": "27d8817e0f7471ba86e3e8f0e3ca8d1d",
"canvaskit/obj/third_party/skia/heif_canvaskit.vcxproj": "6aa7780660eafe53c99f70f608de92ca",
"canvaskit/obj/third_party/skia/heif_canvaskit.vcxproj.filters": "e5a873508ad716132015d4a93c420a15",
"canvaskit/obj/third_party/skia/hsw.ninja": "b0a1e877a39298b11b2e84bc33d1293b",
"canvaskit/obj/third_party/skia/hsw_canvaskit.vcxproj": "7433744ff8fd58fcacc4fa4899b3913f",
"canvaskit/obj/third_party/skia/hsw_canvaskit.vcxproj.filters": "e5a873508ad716132015d4a93c420a15",
"canvaskit/obj/third_party/skia/jpegxl_decode.ninja": "337828b3b1f7c828a7a4ac0a1086e1b6",
"canvaskit/obj/third_party/skia/jpegxl_decode_canvaskit.vcxproj": "18c2d9b9485a8b3fe64992efea81c91f",
"canvaskit/obj/third_party/skia/jpegxl_decode_canvaskit.vcxproj.filters": "e5a873508ad716132015d4a93c420a15",
"canvaskit/obj/third_party/skia/jpeg_decode.ninja": "0679befe37d30b6ac1c5c029bc9e3a36",
"canvaskit/obj/third_party/skia/jpeg_decode_canvaskit.vcxproj": "84b21a33597034439f0edd584f407fc1",
"canvaskit/obj/third_party/skia/jpeg_decode_canvaskit.vcxproj.filters": "abbbb404331f6410192d71da9d7f9337",
"canvaskit/obj/third_party/skia/jpeg_encode.ninja": "2d96506a00ba920c5d7c64c1595488c9",
"canvaskit/obj/third_party/skia/jpeg_encode_canvaskit.vcxproj": "bf603227bd8dd23ff3c435ba6e03ea86",
"canvaskit/obj/third_party/skia/jpeg_encode_canvaskit.vcxproj.filters": "4348ae456ac13d932e5d0c14fdd0d12d",
"canvaskit/obj/third_party/skia/minify_sksl_canvaskit.vcxproj": "f33284f5e6a44e2228e80a639b0c943b",
"canvaskit/obj/third_party/skia/minify_sksl_canvaskit.vcxproj.filters": "e5a873508ad716132015d4a93c420a15",
"canvaskit/obj/third_party/skia/modules/canvaskit/canvaskit_canvaskit.vcxproj": "602fc2e7b16c0640cc2b0fe0622f2c12",
"canvaskit/obj/third_party/skia/modules/canvaskit/canvaskit_canvaskit.vcxproj.filters": "e5a873508ad716132015d4a93c420a15",
"canvaskit/obj/third_party/skia/modules/canvaskit/canvaskit_js.ninja": "f029b6a686425d261c26264500e9e277",
"canvaskit/obj/third_party/skia/modules/canvaskit/canvaskit_js_canvaskit.vcxproj": "4bef4cfcb750a2b4f99b4815742b7463",
"canvaskit/obj/third_party/skia/modules/canvaskit/canvaskit_js_canvaskit.vcxproj.filters": "02ebbe45dfe5b8ca278c27249aebeda7",
"canvaskit/obj/third_party/skia/modules/skcms/skcms.ninja": "735af1e7c685245d6a7ac5393dae17cd",
"canvaskit/obj/third_party/skia/modules/skcms/skcms_canvaskit.vcxproj": "b23328c368b377fb4ecd4d27a4451498",
"canvaskit/obj/third_party/skia/modules/skcms/skcms_canvaskit.vcxproj.filters": "126e86b7da2ab6a15a219209d40ef691",
"canvaskit/obj/third_party/skia/modules/skottie/skottie.ninja": "92b952e29773b50da020a330ba54e200",
"canvaskit/obj/third_party/skia/modules/skottie/skottie_canvaskit.vcxproj": "bc528769bda5d5999dc91cbfa1fc521f",
"canvaskit/obj/third_party/skia/modules/skottie/skottie_canvaskit.vcxproj.filters": "b1f11f93a9d8bcfecffa0fb9264cce71",
"canvaskit/obj/third_party/skia/modules/skparagraph/skparagraph.ninja": "0d0342ea3a9c62847cd123cc4c5a624a",
"canvaskit/obj/third_party/skia/modules/skparagraph/skparagraph_canvaskit.vcxproj": "2ef412e1b5f93efd72b7bbaf2e55bbf8",
"canvaskit/obj/third_party/skia/modules/skparagraph/skparagraph_canvaskit.vcxproj.filters": "78abd4297c24f862192f402bf1b8263f",
"canvaskit/obj/third_party/skia/modules/skresources/skresources.ninja": "d9b9efe05718cca1f43b312a457ff96c",
"canvaskit/obj/third_party/skia/modules/skresources/skresources_canvaskit.vcxproj": "2342c955a97e227a824573f2ccdb706e",
"canvaskit/obj/third_party/skia/modules/skresources/skresources_canvaskit.vcxproj.filters": "06e8451f11a9356169dea195f1ab5ac9",
"canvaskit/obj/third_party/skia/modules/sksg/sksg.ninja": "696187838cdead017b247841d3e93bef",
"canvaskit/obj/third_party/skia/modules/sksg/sksg_canvaskit.vcxproj": "44a4fc164909bbb87fb5836cf2d4aaa0",
"canvaskit/obj/third_party/skia/modules/sksg/sksg_canvaskit.vcxproj.filters": "4ebe6d3a3dea3bd41a8b423f7910221f",
"canvaskit/obj/third_party/skia/modules/skshaper/skshaper.ninja": "2c64868fc824273cd5bc3e9b2d0c83f4",
"canvaskit/obj/third_party/skia/modules/skshaper/skshaper_canvaskit.vcxproj": "afb2af87f55c2da2917d1b45b8fdb08c",
"canvaskit/obj/third_party/skia/modules/skshaper/skshaper_canvaskit.vcxproj.filters": "c62e56a39cbabcf4b0546dc1c7ee4d85",
"canvaskit/obj/third_party/skia/modules/skunicode/skunicode.ninja": "d07205b4b071bdd33f31bf681d2a06c9",
"canvaskit/obj/third_party/skia/modules/skunicode/skunicode_canvaskit.vcxproj": "0588d015d6ac8d8487981c6f077b79e7",
"canvaskit/obj/third_party/skia/modules/skunicode/skunicode_canvaskit.vcxproj.filters": "3545edce9492c4b65d6d6b4dff59b2d2",
"canvaskit/obj/third_party/skia/ndk_images.ninja": "7c29a698d1ae52b1f250a46f70b54c33",
"canvaskit/obj/third_party/skia/ndk_images_canvaskit.vcxproj": "4234150b3eae67f327842ebcfddee33c",
"canvaskit/obj/third_party/skia/ndk_images_canvaskit.vcxproj.filters": "e5a873508ad716132015d4a93c420a15",
"canvaskit/obj/third_party/skia/pdf.ninja": "a6c939a761f14c0263b5d6dff3ecef02",
"canvaskit/obj/third_party/skia/pdf_canvaskit.vcxproj": "1e92a535b5b39716185fdbde40113924",
"canvaskit/obj/third_party/skia/pdf_canvaskit.vcxproj.filters": "bd033ae4fd300c924bbf87aa582f2c7d",
"canvaskit/obj/third_party/skia/piet.ninja": "acf19bda28fa05dc73c0531e736415a1",
"canvaskit/obj/third_party/skia/piet_canvaskit.vcxproj": "7d35fd330e0f7e45c3df5bac0f9d36c0",
"canvaskit/obj/third_party/skia/piet_canvaskit.vcxproj.filters": "e5a873508ad716132015d4a93c420a15",
"canvaskit/obj/third_party/skia/png_decode.ninja": "a8f413029d02257bd4fa6f87d0792b4b",
"canvaskit/obj/third_party/skia/png_decode_canvaskit.vcxproj": "fd4950fb717740a531cd8dad3863eb0b",
"canvaskit/obj/third_party/skia/png_decode_canvaskit.vcxproj.filters": "6a7ecbfb21d3210d90873c6971a7e41c",
"canvaskit/obj/third_party/skia/png_encode.ninja": "91f357e80dba41f7477e159e84a3ce70",
"canvaskit/obj/third_party/skia/png_encode_canvaskit.vcxproj": "b609b694db778279e57438503dd6a149",
"canvaskit/obj/third_party/skia/png_encode_canvaskit.vcxproj.filters": "c56897e2b88e0d9bde3b9e1b388a9dab",
"canvaskit/obj/third_party/skia/raw.ninja": "c0b48768e6e477d2581da5a8f9a48365",
"canvaskit/obj/third_party/skia/raw_canvaskit.vcxproj": "833907796250f44ec0f9d0388c381419",
"canvaskit/obj/third_party/skia/raw_canvaskit.vcxproj.filters": "e5a873508ad716132015d4a93c420a15",
"canvaskit/obj/third_party/skia/run_sksllex_canvaskit.vcxproj": "cc0069d66c69b756a6e40de6aca92dcc",
"canvaskit/obj/third_party/skia/run_sksllex_canvaskit.vcxproj.filters": "e5a873508ad716132015d4a93c420a15",
"canvaskit/obj/third_party/skia/skia.ninja": "53b791e66b86aab78355892e20a536ed",
"canvaskit/obj/third_party/skia/skia_canvaskit.vcxproj": "7ebf310b446f2a68a4756327fc5b304b",
"canvaskit/obj/third_party/skia/skia_canvaskit.vcxproj.filters": "f2c70b12e239befacd67a53947656032",
"canvaskit/obj/third_party/skia/skvm_jit.ninja": "8dbace648453dde65f62084352689164",
"canvaskit/obj/third_party/skia/skvm_jit_canvaskit.vcxproj": "39125cc78db397f0b0a29fd95fccef5e",
"canvaskit/obj/third_party/skia/skvm_jit_canvaskit.vcxproj.filters": "e5a873508ad716132015d4a93c420a15",
"canvaskit/obj/third_party/skia/skx.ninja": "30b73c54ee479a8b7bd01b194a187efa",
"canvaskit/obj/third_party/skia/skx_canvaskit.vcxproj": "1d743218535a19c83e67d51f912d256e",
"canvaskit/obj/third_party/skia/skx_canvaskit.vcxproj.filters": "e5a873508ad716132015d4a93c420a15",
"canvaskit/obj/third_party/skia/sse42.ninja": "81773e7705ebb9b92b8126202314a9ab",
"canvaskit/obj/third_party/skia/sse42_canvaskit.vcxproj": "7edc8b16dffdc7f3db15fdd059bd4d62",
"canvaskit/obj/third_party/skia/sse42_canvaskit.vcxproj.filters": "e5a873508ad716132015d4a93c420a15",
"canvaskit/obj/third_party/skia/ssse3.ninja": "3f516bb28bfcede07c0ba419d32d5a44",
"canvaskit/obj/third_party/skia/ssse3_canvaskit.vcxproj": "cad0f3aa9b60b40eadaec8a058a8cb51",
"canvaskit/obj/third_party/skia/ssse3_canvaskit.vcxproj.filters": "e5a873508ad716132015d4a93c420a15",
"canvaskit/obj/third_party/skia/typeface_freetype.ninja": "d238fededf5fbb81a469b8c4efc1608a",
"canvaskit/obj/third_party/skia/typeface_freetype_canvaskit.vcxproj": "e4b8e216b4e567d917df853f42f9fef1",
"canvaskit/obj/third_party/skia/typeface_freetype_canvaskit.vcxproj.filters": "5015b57168e240c8983a681ebe247350",
"canvaskit/obj/third_party/skia/webp_decode.ninja": "dbaac859129cc434fe7c941f3bca841b",
"canvaskit/obj/third_party/skia/webp_decode_canvaskit.vcxproj": "fd629481175889b8326aff7d0f9764f7",
"canvaskit/obj/third_party/skia/webp_decode_canvaskit.vcxproj.filters": "52ef091dc0178bd1dd490c3a19436339",
"canvaskit/obj/third_party/skia/webp_encode.ninja": "c4ea4e6be540b2965997e07ea0d5c4bf",
"canvaskit/obj/third_party/skia/webp_encode_canvaskit.vcxproj": "1d6ba78157050e66c65986f3f336034d",
"canvaskit/obj/third_party/skia/webp_encode_canvaskit.vcxproj.filters": "e5a873508ad716132015d4a93c420a15",
"canvaskit/obj/third_party/skia/wuffs.ninja": "e2e4b394b736a436a459822d62be6a4f",
"canvaskit/obj/third_party/skia/wuffs_canvaskit.vcxproj": "ad46f039e5d01c362e5acc3ea0e0fd91",
"canvaskit/obj/third_party/skia/wuffs_canvaskit.vcxproj.filters": "b1c4752559428c0db2bb46647ceec8cf",
"canvaskit/obj/third_party/skia/xml.ninja": "ebacb242df74f09430305fbcad28a4ac",
"canvaskit/obj/third_party/skia/xml_canvaskit.vcxproj": "4244bffb906a3b670df2994c9c045301",
"canvaskit/obj/third_party/skia/xml_canvaskit.vcxproj.filters": "e5a873508ad716132015d4a93c420a15",
"canvaskit/obj/third_party/skia/xps.ninja": "6a440886f127cdc9ade5b5009cd82f8f",
"canvaskit/obj/third_party/skia/xps_canvaskit.vcxproj": "095d6f78382a11d3bd8c38db7baf11ef",
"canvaskit/obj/third_party/skia/xps_canvaskit.vcxproj.filters": "e5a873508ad716132015d4a93c420a15",
"canvaskit/obj/third_party/wuffs/wuffs.ninja": "518d1d5e3fe5167326eb9c05ea534ac7",
"canvaskit/obj/third_party/wuffs/wuffs_canvaskit.vcxproj": "f88055a6eaeef85960befd5e4cbb3cf7",
"canvaskit/obj/third_party/wuffs/wuffs_canvaskit.vcxproj.filters": "2a64e3c78eae1f809512a29597c58d16",
"canvaskit/obj/third_party/zlib/zlib.ninja": "63a7cb224914b1284987c3181373ea60",
"canvaskit/obj/third_party/zlib/zlib_canvaskit.vcxproj": "ace2c12a41b5bb81b5a53f94551c06cb",
"canvaskit/obj/third_party/zlib/zlib_canvaskit.vcxproj.filters": "a0a3182a86b8ad1a3fa3e587334ed694",
"canvaskit/skwasm.js": "68b5af98918067bc5997fde5c8b428ba",
"canvaskit/skwasm.wasm": "cb61a57fe23c24b6cc8644a0158c54aa",
"canvaskit/skwasm.worker.js": "19659053a277272607529ef87acf9d8a",
"canvaskit/toolchain.ninja": "30e4ff481f8a7dcd23dbf8afde2d42f0",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "6b515e434cea20006b3ef1726d2c8894",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "a8d4310153a95b0578314c257edc82ae",
"/": "a8d4310153a95b0578314c257edc82ae",
"main.dart.js": "7ab392d9ba6548d1fe97794251bb235f",
"manifest.json": "9a0de1ff26661cd281cb9deb3db33b02",
"version.json": "87566a2baf6bccb66deaa054654e642d"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
