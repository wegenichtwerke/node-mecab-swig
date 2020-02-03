{ "targets": [ { 
    "target_name": "MeCab_wrap",
    "sources": [ "MeCab_wrap.cpp" ] , 

    "cflags": ["-fexceptions" ] , 
    "cflags!": ["-fno-exceptions" ] , 
    "cflags_cc": ["-fexceptions" ] ,
    "cflags_cc!": ["-fno-exceptions" ] ,

    "libraries":[ "-L/usr/lib64", "-lmecab" ]     


} ] }
