class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }
  updateQuality() {
    this.items.forEach((item) => {
      if (item.name === 'Sulfuras, Hand of Ragnaros') {
        item = updateQualitySulfuras(item);
        return;
      }

      item.sellIn --;

      if (item.name === 'Aged Brie') {
        item = updateQualityAgedBrie(item);
        return;
      }

      if (item.name === 'Conjuring') {
        item = updateQualityConjuring(item);
        return;
      }

      if (item.name === 'Backstage passes to a TAFKAL80ETC concert') {
        item = updateQualityTickets(item);
        return;
      }

      item = updateQualityDefault(item);
    })
    

    return this.items;
  }
}

// sulfuras never changes in sell date or quality, so just return
function updateQualitySulfuras(item) {
  return item;
}

// update normal item
function updateQualityDefault(item) {
   if (item.sellIn < 0) {
    item.quality = getQualityWithinBounds(item.quality - 2);
   } else {
    item.quality = getQualityWithinBounds(item.quality - 1);
   }
}

function updateQualityTickets(item) {
  if (item.sellIn > 10) {
    item.quality = getQualityWithinBounds(item.quality + 1);
  } else if (item.sellIn > 5) {
    item.quality = getQualityWithinBounds(item.quality + 2);
  } else if (item.sellIn > 0 ) {
    item.quality = getQualityWithinBounds(item.quality + 3);
  } else {
    item.quality = 0
  }
}

// update aged brie
function updateQualityAgedBrie(item) {
  item.quality = getQualityWithinBounds(item.quality + 1);
}

// update conjuring item
function updateQualityConjuring(item) {
     if (item.sellIn < 0) {
    item.quality = getQualityWithinBounds(item.quality - 4);
   } else {
    item.quality = getQualityWithinBounds(item.quality - 2);
   }
}

const getQualityWithinBounds = (quality) => {
  return Math.min(Math.max(0, quality), 50);
}


module.exports = {
  Item,
  Shop,
}
