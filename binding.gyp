{ "targets": [ { 
    "target_name": "MeCab",
    "sources": [ "MeCab_wrap.cxx" ] , 

    "cflags": ["-fexceptions" ] , 
    "cflags!": ["-fno-exceptions" ] , 
    "cflags_cc": ["-fexceptions" ] ,
    "cflags_cc!": ["-fno-exceptions" ] ,

    "include_dirs": [ "<!(mecab-config --inc-dir)" ],

    "libraries": ["<!(mecab-config --libs)", "-L/usr/lib64", "-lmecab" ]     


} ] }
