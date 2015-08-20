/*
 * Basic spec for the most simple things. Then again, the plugin is pretty
 * simple in itself ;).
 *
 * Inspired by: https://github.com/tomtomau/jquery-big-youtube
 */
describe("Basic plugin bootstrapping", function(){
  it("creates jQuery plugin named 'freud'", function(){
    expect(typeof $.fn.freud).toBe("function");
  });

  it("creates jQuery root level function called 'freud'", function(){
    expect(typeof $.freud).toBe('function');
  });
});

/**
 * Testing top function responses
 */
describe("top.#register", function(){
  it('calling register does not throw an error', function(){
    function runRegister() {
      $.freud('register');
    }

    expect(runRegister).not.toThrow()
  });

  it('calling a function that does not exist throws an error', function(){
    function runNone() {
      $.freud('none');
    }

    expect(runNone).toThrow()
  });
});

describe("Applying behaviours to elements", function(){
  it('First element only has the first behaviour applied', function(){
    expect($one_behaviour.text()).toEqual('TestBehaviour was applied');
    expect($one_behaviour.attr('applied')).not.toBeDefined();
    expect($one_behaviour.data('loaded_bahaviour_TestBehaviour')).toBe(true);
    expect($one_behaviour.data('loaded_bahaviour_TestBehaviour2')).not.toBeDefined();
    expect($one_behaviour.data('loaded_bahaviour_TestBehaviour3')).not.toBeDefined();
  });

  it('Second element only has both behaviours applied', function(){
    expect($two_behaviours.text()).toEqual('TestBehaviour was applied');
    expect($two_behaviours.attr('applied')).toEqual('Sigmund was here');
    expect($two_behaviours.data('loaded_bahaviour_TestBehaviour')).toBe(true);
    expect($two_behaviours.data('loaded_bahaviour_TestBehaviour2')).toBe(true);
  });

  it('Third element only has the third behaviour applied', function(){
    expect($third_behaviour_only.text()).toEqual("Third Time's a Charm");
    expect($third_behaviour_only.data('loaded_bahaviour_TestBehaviour')).not.toBeDefined();
    expect($third_behaviour_only.data('loaded_bahaviour_TestBehaviour2')).not.toBeDefined();
    expect($third_behaviour_only.data('loaded_bahaviour_TestBehaviour3')).toBe(true);
  });

  it('Uses a custom name when given', function(){
    expect($different_name.text()).toEqual("My enemies know me as 'Bond'. 'James Bond'");
    expect($different_name.data('loaded_bahaviour_James')).toBe(true);
  });

  it('Applies behaviours using a custom key', function(){
    expect($other_key.text()).toEqual('TestBehaviour was applied');
    expect($other_key.attr('applied')).toEqual('Sigmund was here');
    expect($other_key.data('loaded_bahaviour_TestBehaviour')).toBe(true);
    expect($other_key.data('loaded_bahaviour_TestBehaviour2')).toBe(true);
    expect($other_key.data('loaded_bahaviour_TestBehaviour3')).not.toBeDefined();
  });
});

/**
  * Test Behaviour to apply
  */
var TestBehaviour;

TestBehaviour = (function() {
  function TestBehaviour(element) {
    this.element = element;
    this.element.text('TestBehaviour was applied');
  }

  return TestBehaviour;
})();

var TestBehaviour2;

TestBehaviour2 = (function() {
  function TestBehaviour2(element) {
    this.element = element;
    this.element.attr('applied', 'Sigmund was here')
  }

  return TestBehaviour2;
})();

var TestBehaviour3;

TestBehaviour3 = (function() {
  function TestBehaviour3(element) {
    this.element = element;
    this.element.text("Third Time's a Charm");
  }

  return TestBehaviour3;
})();

var TestBehaviour4;

TestBehaviour4 = (function() {
  function TestBehaviour4(element) {
    this.element = element;
    this.element.text("My enemies know me as 'Bond'. 'James Bond'");
  }

  return TestBehaviour4;
})();

$.freud('register', 'TestBehaviour', TestBehaviour);
$.freud('register', 'TestBehaviour2', TestBehaviour2);
$.freud('register', TestBehaviour3);
$.freud('register', 'James', TestBehaviour4);

$one_behaviour = $('<div id="first_element" data-behaviours="TestBehaviour">Not applied</div>');
$('body').append($one_behaviour);

$two_behaviours = $('<div id="second_element" data-behaviours=\'["TestBehaviour", "TestBehaviour2"]\'>Also not applied</div>')
$('body').append($two_behaviours);

$third_behaviour_only = $('<div id="third_element" data-behaviours=\'["TestBehaviour3"]\'>The third</div>')
$('body').append($third_behaviour_only);

$different_name = $('<div id="different_name" data-behaviours=\'["James"]\'>Ian Fleming</div>')
$('body').append($different_name);


$other_key = $('<div id="other_key" data-custom-key=\'["TestBehaviour", "TestBehaviour2"]\'>Skeleton key</div>')
$('body').append($other_key);

$('[data-behaviours]').freud()
$('[data-custom-key]').freud({ behaviourKey: 'custom-key' })