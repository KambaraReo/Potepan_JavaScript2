display = document.getElementsByClassName("display")[0];

var is_calc = false; // "="が押された状態かを判別するフラグ
var flag = 0; // "0"=0，"00"=1，小数点=2，"1~9"=3，演算子=4
var currentValue = ""; // 現在の数値（数字のかたまり）

function num_click(val) {
    // "="押下後に数字が入力される場合の初期化
    if(is_calc) {
        is_calc = false;
        display.value = "0";
        currentValue = "";
    }

    // 初期状態（ディスプレイ表示が0のとき）での挙動
    if(display.value=="0" && val=="0") {
        display.value = "0";
        flag = 0;
    }else if(display.value=="0" && val=="00") {
        display.value = "0";
        flag = 0;
    }else if(display.value=="0" && val==".") {
        display.value = "0.";
        currentValue += "0.";
        flag = 2;
    }else if(display.value=="0") {
        display.value = val;
        currentValue += val;
        flag = 3;
    // 初期状態以外での挙動
    }else {
        // 直前の入力値が演算子以外の時
        if(flag!=4) {
            if(val=="0") {
                if(currentValue=="0") {
                    ; // 何もしない
                }else {
                    display.value += val;
                    currentValue += val;
                    flag = 0;
                }
            }else if(val=="00") {
                if(currentValue=="0") {
                    ;
                }else {
                    display.value += val;
                    currentValue += val;
                    flag = 1;
                }         
            }else if(val==".") {
                if(!currentValue.includes(".")) {
                    display.value += val;
                    currentValue += val;
                    flag = 2;
                }else {
                    ;
                }
            }else {
                if(currentValue=="0") {
                    display.value = display.value.slice(0, -1) + val;
                    currentValue = val;
                    flag = 3;
                }else {
                    display.value += val;
                    currentValue += val;
                    flag = 3;
                }
            }
        // 直前の入力値が演算子かつ小数点が入力される時
        }else if(flag==4 && val==".") {
            display.value += "0.";
            currentValue += "0.";
            flag = 2;
        // 直前の入力値が演算子かつ小数点以外（"0", "00", "1~9"）が入力される時
        }else {
            if(val!="0" && val!="00") {
                display.value += val;
                currentValue += val;
                flag = 3;
            }else {
                display.value += "0";
                currentValue += "0";
                flag = 0;
            }
        }
    }
}

function ope_click(val) {
    // "="押下後に演算子が入力される場合，"is_calc"のみ初期化
    if(is_calc) is_calc = false;
    // "."押下後に演算子が入力される場合，"0"を補間して表示
    if(flag==2) display.value += "0";
    // "currentValue"を初期化
    currentValue = ""
    
    // 演算子が二重入力される場合，演算子を直前のものに上書き
    if(flag==4) {
        display.value = display.value.slice(0, -1) + val;
    // 直前が演算子でない場合，演算子を追加
    }else {
        display.value += val;
        flag = 4;
    }
}

function equal_click() {
    // 直前が演算子の場合，その演算子を削除
    if(flag==4) display.value = display.value.slice(0, -1);
  
    // "new Function"より，文字列を関数化して実行（計算処理）
    var calc = new Function("return " + display.value.replaceAll("×", "*").replaceAll("÷", "/"))(); 
    
    // エラー処理 
    if(calc == Infinity || Number.isNaN(calc)) {
        display.value = "Error";
        currentValue = ""
    }else {
        display.value = calc;
        currentValue = calc;
        is_calc = true;
    }
}

function ac_click() {
    display.value = "0";
    currentValue = ""
    is_calc = false;
}