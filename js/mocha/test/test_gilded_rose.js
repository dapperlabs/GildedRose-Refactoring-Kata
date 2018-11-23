var {expect} = require('chai');
var {Shop, Item} = require('../src/gilded_rose.js');

// Items
// Aged Brie
// SU

const items = [
new Item("Aged Brie", 0,0),
new Item("Sulfuras, Hand of Ragnaros",0 ,99),
new Item("Backstage passes to a TAFKAL80ETC concert",0 ,100),
new Item("normal", 0, 10),
new Item("normal", 1, 10),
]


describe("Gilded Rose", function() {

   it("should update aged brie properly", () => {
    const item = items[0];
    const shop = new Shop([item]);
    const updatedItems = shop.updateQuality();
    expect(updatedItems.length).to.equal(1);
    const updatedItem = updatedItems[0];
    expect(updatedItem.name).to.equal(item.name);
    // magic number for quality per day
    expect(updatedItem.quality).to.equal(item.quality++);
    expect(updatedItem.sellIn).to.equal(-1);
  })


  it("should update sulfuras properly", () => {
    const item = items[1];
    const shop = new Shop([item]);
    const updatedItems = shop.updateQuality();
    expect(updatedItems.length).to.equal(1);
    const updatedItem = updatedItems[0];
    expect(updatedItem.name).to.equal(item.name);
    // magic number for quality per day
    expect(updatedItem.quality).to.equal(item.quality);
    expect(updatedItem.sellIn).to.equal(item.sellIn);
  })


  it("should update backstage properly when sell in is in 0 days", () => {
    const item = items[2];
    const shop = new Shop([item]);
    const updatedItems = shop.updateQuality();
    expect(updatedItems.length).to.equal(1);
    const updatedItem = updatedItems[0];
    expect(updatedItem.name).to.equal(item.name);
    // magic number for quality per day
    expect(updatedItem.quality).to.equal(0);
    expect(updatedItem.sellIn).to.equal(-1);
  })

  it("should update backstage properly when sell in is within 10 days", () => {
    const item = new Item("Backstage passes to a TAFKAL80ETC concert", 10, 5);
    const shop = new Shop([item]);
    const updatedItems = shop.updateQuality();
    expect(updatedItems.length).to.equal(1);
    const updatedItem = updatedItems[0];
    expect(updatedItem.name).to.equal(item.name);
    expect(updatedItem.quality).to.equal(7);
    expect(updatedItem.sellIn).to.equal(9);
  })

  it("should update backstage properly when sell is in 5 days", () => {
    const item = new Item("Backstage passes to a TAFKAL80ETC concert", 5, 5);
    const shop = new Shop([item]);
    const updatedItems = shop.updateQuality();
    expect(updatedItems.length).to.equal(1);
    const updatedItem = updatedItems[0];
    expect(updatedItem.name).to.equal(item.name);
    expect(updatedItem.quality).to.equal(8);
    expect(updatedItem.sellIn).to.equal(4); 
  })


  it("should update normal expired item twice as fast", () => {
    const item = items[3];
    const shop = new Shop([item]);
    const updatedItems = shop.updateQuality();
    expect(updatedItems.length).to.equal(1);
    const updatedItem = updatedItems[0];
    expect(updatedItem.name).to.equal(item.name);
    // magic number for quality per day
    expect(updatedItem.quality).to.equal(8);
    expect(updatedItem.sellIn).to.equal(-1);
  })


  it("should update normal item properly", () => {
    const item = items[4];
    const shop = new Shop([item]);
    const updatedItems = shop.updateQuality();
    expect(updatedItems.length).to.equal(1);
    const updatedItem = updatedItems[0];
    expect(updatedItem.name).to.equal(item.name);
    // magic number for quality per day
    expect(updatedItem.quality).to.equal(9);
    expect(updatedItem.sellIn).to.equal(0);
  })

  it("should not decrease item quality to less than 0", () => {
    const item = new Item("normal", 0, 0);
    const shop = new Shop([item]);
    const updatedItems = shop.updateQuality();
    expect(updatedItems.length).to.equal(1);
    const updatedItem = updatedItems[0];
    expect(updatedItem.name).to.equal(item.name);
    expect(updatedItem.quality).to.equal(0);
    expect(updatedItem.sellIn).to.equal(-1);
  })


  it("should update conjured item properly", () => {
    const item = new Item("Conjuring", 3, 10);
    const shop = new Shop([item]);
    const updatedItems = shop.updateQuality();
    expect(updatedItems.length).to.equal(1);
    const updatedItem = updatedItems[0];
    expect(updatedItem.name).to.equal(item.name);
    expect(updatedItem.quality).to.equal(8);
    expect(updatedItem.sellIn).to.equal(2);
  })


  it("should update expired conjured item properly", () => {
    const item = new Item("Conjuring", 0, 10);
    const shop = new Shop([item]);
    const updatedItems = shop.updateQuality();
    expect(updatedItems.length).to.equal(1);
    const updatedItem = updatedItems[0];
    expect(updatedItem.name).to.equal(item.name);
    expect(updatedItem.quality).to.equal(6);
    expect(updatedItem.sellIn).to.equal(-1);
  })
});
