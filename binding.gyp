{ "targets": [ { 
    "target_name": "MeCab",
    "sources": [ "MeCab_wrap.cxx" ] , 

    "cflags": ["-fexceptions" ] , 
    "cflags!": ["-fno-exceptions" ] , 
    "cflags_cc": ["-fexceptions" ] ,
    "cflags_cc!": ["-fno-exceptions" ] ,

    "libraries":[ "-L/usr/lib64", "-lmecab" ]     


} ] }
