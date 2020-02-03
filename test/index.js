'use strict';

var chai = require('chai');
var assert = chai.assert;
var MeCab = require('../index');

describe('node-mecab-swig', () => {

    var tagger = new MeCab.Tagger("");
    var sentence = '花が咲いた。';
    var result1  = tagger.parse(sentence) + "" ;     // force dereference(ptr -> string)  
    var expected1 =` 
花      名詞,一般,*,*,*,*,花,ハナ,ハナ
が      助詞,格助詞,一般,*,*,*,が,ガ,ガ
咲い    動詞,自立,*,*,五段・カ行イ音便,連用タ接続,咲く,サイ,サイ
た      助動詞,*,*,*,特殊・タ,基本形,た,タ,タ
。      記号,句点,*,*,*,*,。,。,。
EOS
`;

    // 空白改行を無視して比較する。
    result1   = result1.replace( /\s+/g, '');
    expected1 = expected1.replace( /\s+/g, '');


    it('should parse text', function(){  assert.strictEqual(result1, expected1 ) } );


    var result2 = "";
    sentence = "東京都庁舎前";
    tagger.parseNBest(3, sentence);
    tagger.parseNBestInit(sentence);
    for (var i = 0; i<3; i++){
        var node = tagger.nextNode();
        while( node ) {
            var node_surface = node.surface + "";
            if( node_surface.length  > 0){
                result2 += `${node_surface} ${node.feature} ${node.cost}\n`;
                result2 += "------------------\n";
            }
            node = node.next;

        }
        result2 += "*****************************************************\n"; 

    }


    var expected2 = `
東京 名詞,固有名詞,地域,一般,*,*,東京,トウキョウ,トーキョー 2693
------------------
都 名詞,接尾,地域,*,*,*,都,ト,ト 2504
------------------
庁舎 名詞,一般,*,*,*,*,庁舎,チョウシャ,チョーシャ 9149
------------------
前 名詞,副詞可能,*,*,*,*,前,マエ,マエ 12899
------------------
*****************************************************
東京 名詞,固有名詞,地域,一般,*,*,東京,トウキョウ,トーキョー 2693
------------------
都庁 名詞,一般,*,*,*,*,都庁,トチョウ,トチョー 7010
------------------
舎 名詞,接尾,一般,*,*,*,舎,シャ,シャ 10911
------------------
前 名詞,副詞可能,*,*,*,*,前,マエ,マエ 12899
------------------
*****************************************************
東 名詞,一般,*,*,*,*,東,ヒガシ,ヒガシ 5962
------------------
京都 名詞,固有名詞,地域,一般,*,*,京都,キョウト,キョート 7729
------------------
庁舎 名詞,一般,*,*,*,*,庁舎,チョウシャ,チョーシャ 9149
------------------
前 名詞,副詞可能,*,*,*,*,前,マエ,マエ 12899
------------------
*****************************************************
`;

    // 空白改行を無視して比較する。
    result2   = result1.replace( /\s+/g, '');
    expected2 = expected1.replace( /\s+/g, '');


    it('should parseNBest ', function(){  assert.strictEqual(result2, expected2 ) } );

    var result3 = tagger.dictionary_info().filename ;
    var expected3 = "ipadic/sys.dic";
    it('dictionary_info contain ipadic ', function(){  assert.include(result3, expected3 ) } );



});
