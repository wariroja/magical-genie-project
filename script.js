function generateHiddenHTML(inputString, index = 0) {
    if (index >= inputString.length) return '';
    return `
      <code data-class="23*">
        <div data-tag="*93">
          <span data-id="*21*">
            <i class="char" value="${inputString[index]}"></i>
          </span>
        </div>
      </code>` + generateHiddenHTML(inputString, index + 1);
  }
  
  function expectedFindURL() {
    let codes = document.querySelectorAll('code[data-class^="23"]');
    let url = '';
  
    codes.forEach(code => {
      let div = code.querySelector('div[data-tag$="93"]');
      if (div) {
        let span = div.querySelector('span[data-id*="21"]');
        if (span) {
          let iElement = span.querySelector('i.char');
          if (iElement) {
            url += iElement.getAttribute('value');
          }
        }
      }
    });
  
    return url;
  }
  
  
  document.getElementById("execute-code").addEventListener("click", function() {
    var codeInput = document.getElementById("code-input").value.trim();
  
    // User's function to find the URL
    var userFindURL = new Function('function findURL() {' + codeInput + '}; return findURL();');
    
    try {
      var userResult = userFindURL();
      var expectedResult = expectedFindURL();
      
      if (userResult === expectedResult) {
        document.getElementById("result").innerText = "Huzzah! By the power of your magical code, you have unlocked the secret! The hidden URL is: ";
        var urlElement = document.createElement("span");
        urlElement.innerText = userResult;
        urlElement.className = "sparkling-result";
        document.getElementById("result").appendChild(urlElement);
        document.getElementById("result").innerHTML += " A thousand wishes be upon you!";
      } else {
        document.getElementById("result").innerText = "Alas, young sorcerer, your incantation seems to have fizzled. The magical weave of the code is incorrect. Consult your ancient scrolls and try again!";

      }
    } catch (error) {
      document.getElementById("result").innerText = "Oh no! A mystical error has occurred in the depths of your spellwork. The arcane forces are confused. Check the syntax of your magical formula and cast the spell once more!";
    }
  });
  
  // Use the generateHiddenHTML function with the hidden string you want to embed
  const hiddenString = "You have unvealed a Genie, now make a wish!";
  const hiddenHTML = generateHiddenHTML(hiddenString);
  document.getElementById("hidden-container").innerHTML = hiddenHTML;
  