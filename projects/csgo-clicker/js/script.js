// CSGOClicker - Case CSGOClicker
//money, inventory, jackpot
(function() {
var itemCounter = 0;
var fps = 15;

var money = 7.50;
var currentCase = "case2";
var acceptMoneyPerClick = 0.1;




/*=========================Inventory============================*/
//In inventory: weap skins
//Hidden: money


//sorting: by money, rarity
var popup = true;

var inventory = {};
var jackpotInventory = {};

var inventoryMax = 50;
var inventoryCurrent = 0;

var keyPrice = 2.50;

var caseDiscount = 0;
var keyDiscount = 0;

var operationCases = {
  case1: {name: "Weapon Case 1", price: 5.00, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQNqhpOSV-fRPasw8rsRVx4MwFo5_T3eAQ3i6DMIW0X7ojiwoHax6egMOKGxj4G68Nz3-jCp4itjFWx-ktqfSmtcwqVx6sT"},
  case2: {name: "Operation Phoenix Case", price: 0.06, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQNqhpOSV-fRPasw8rsUFJ5KBFZv668FFUuh6qZJmlD7tiyl4OIlaGhYuLTzjhVupJ12urH89ii3lHlqEdoMDr2I5jVLFFSv_J2Rg"},
  case3: {name: "Winter Offensive Case", price: 1.32, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQNqhpOSV-fRPasw8rsUFJ5KBFZv668FFYu0aKfJz8a793gxNLfzvOkMunUwWgH7JIjj-qW8d7x2VXt_UBuMT3zIpjVLFEGDSGUSQ"},
  case4: {name: "Operation Vanguard Case", price: 0.16, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQNqhpOSV-fRPasw8rsUFJ5KBFZv668FFIuh6rJImVGvtjllYaNka6la7rUxWkE65BzibvD9N7z0Q22-0Fka2GlJ5jVLFHqavWW2g"},
  case5: {name: "Chroma Case", price: 0.07, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQNqhpOSV-fRPasw8rsUFJ5KBFZv668FFEuh_KQJTtEuI63xIXbxqOtauyClTMEsJV1jruS89T3iQKx_BBqa2j3JpjVLFH1xpp0EQ"},
  case6: {name: "Falchion Case", price: 0.03, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQNqhpOSV-fRPasw8rsUFJ5KBFZv668FF8ugPDMIWpAuIq1w4KIlaChZOyFwzgJuZNy3-2T89T0jlC2rhZla2vwIJjVLFHz75yKpg"}
}

var knives = {
  regular: {
    knife1: {name: "★ Bayonet", price: 141.56, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQh5hlcX0nvUOGsx8DdQBJjIAVHubSaKQZ53P3NZXMXvYmykdLSxqWkZ7-HkjMIvpIj3u2Y84733gzh_RU_MG_zIYLEdQ45fxiOrdJh0ExF"},
    knife2: {name: "★ Bayonet | Blue Steel", price: 128.62, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotLu8JAllx8zJYAJA4MmzkL-GkvP9JrbummpD78A_37vEp4rz3w21_hBrNWD7dteSeg8_M1jSrFK5wrrr18Xpu5TAwHNmsj5iuyhFiVGqLA"},
    knife3: {name: "★ Bayonet | Boreal Forest", price: 89.78, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotLu8JAllx8zAaAJE486zh5S0lfjmNrrdqWdY781lteXA54vwxgCxqBE6Nzv0IIbBdQU6ZAuC-Vm6wu68hMe46MzIzCE26SQk7S3YzECpwUYbTEk7wBI"},
    knife4: {name: "★ Bayonet | Case Hardened", price: 134.99, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotLu8JAllx8zJYAJN5dCzkL-GkvP9JrbummpD78A_j7DEoo2njFHl_kM5Zz_1I9OUI1dtYw3U_1nskOvuhMS7vM_AnXdr7z5iuyiOIPCcdg"},
    knife5: {name: "★ Bayonet | Crimson Web", price: 194.21, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotLu8JAllx8zAaAJV6d6lq4yCkP_gDLfQhGxUppwj3r-Rpd3zjAy38xFsMGn0I9LGcA49Zw2B_VO5wL_r1Ja-vJrMySB9-n51NRRkGyg"},
    knife6: {name: "★ Bayonet | Fade", price: 316.54, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotLu8JAllx8zJcAJE7dizq4yCkP_gDLfQhGxUppBwib3Hod6n2ADnqUdkMW30cYKRdwVtMlrV-gK5yLi71JXpu5XBzHd9-n51Ga5qFJk"},
    knife7: {name: "★ Bayonet | Forest DDPAT", price: 87.77, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotLu8JAllx8zAaAJG6My3gL-HnvD8J4Tdl3lW7Yt337rC99iijASxrUs-Z2ryJYeTcgY2NAvT8li4l-a80MLuu5zLnyBmpGB8ss5wKTWe"},
    knife8: {name: "★ Bayonet | Night", price: 145.72, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotLu8JAllx8zbfgJM5du-gL-HnvD8J4Tdl3lW7Ysg2-uTpN2iiVLmrkM6YW3zJYeUcQY7aV3XqwO3wrvvhZ-96Z7Nzic3pGB8sk5ZbSKb"},
    knife9: {name: "★ Bayonet | Safari Mesh", price: 64.71, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotLu8JAllx8zbYQJP6c--q5SKmcj4OrzZglRd6dd2j6fHpY-kigPlrRduYmmhI4LHdgRqMw7X8lO7wuvqg8O77szAmHtq7iEn-z-DyIB9jWZF"},
    knife10: {name: "★ Bayonet | Scorched", price: 77.54, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotLu8JAllx8zbYQJG7cymmIW0m_7zO6_ummpD78A_3-qXrNqnjAPtqUVpNjvxJIOWdQE-MFDY_Qfvkr-6jZ7uv5vInyE17z5iuyhdvxrhyA"},
    knife11: {name: "★ Bayonet | Slaughter", price: 276.21, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotLu8JAllx8zJfAJY6d6klb-HnvD8J4Tdl3lW7Ysj2LqVpdqh2wLm-UNoNmH0cdeQIVM9N1HZ_QXtx-fu0Z64uMnAyHRrpGB8stNTCQHv"},
    knife12: {name: "★ Bayonet | Stained", price: 104.88, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotLu8JAllx8zJYAJE4861kYS0m_7zO6_ummpD78A_3r-RrNWti1Dl8kc6ammlIoPEJ1U_YQuDqwTvyejrgcS4vpnKySQwuj5iuyhwZ4qAMQ"},
    knife13: {name: "★ Bayonet | Urban Masked", price: 94.19, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotLu8JAllx8zbYQJW7cyzq5WZlfb6DLfYkWNF18lwmO7Eu9SkiwCw-RJsZTrxcI7GcAE_MFqC_AXrxby8gZHqvM6bySZg7CMgtyrD30vgFNz3E8k"},
    knife14: {name: "★ Flip Knife", price: 69.08, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQh5hlcX0nvUOGsx8DdQBJjIAVHubSaIAlp1fb3dzFL_JKzloaIx6ejYO6GzzlTucAj072W99-liQfm-hJsZGvyIdLEJw5tNA2E5BHgluDLhNCe"},
    knife15: {name: "★ Flip Knife | Blue Steel", price: 80.65, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1f_BYQJD_eO0mJWOk8j4OrzZglRd6dd2j6eVrNnwjlfi8kE6Nzr2IYeWcQdrZVjX_Fi5wOvt0Z-075TAyXBkuHMh-z-DyBuzAXuO"},
    knife16: {name: "★ Flip Knife | Boreal Forest", price: 62.77, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1f_BYQJK9eOwm5KOhOPLMbTDk2pd18l4jeHVyoD0mlOx5Rdoa277LIOUdwY5MF7U81O7krzuhJa8vM-fnSMxvyVxtCqPnEC3hktSLrs4hATUWUc"},
    knife17: {name: "★ Flip Knife | Case Hardened", price: 92.51, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1f_BYQJD_eO5nYyOk8j4OrzZglRd6dd2j6eQodmt0VDgrUBqZWrwJIKccg48ZQ7T_AS5l-nqh5e1uJrBnHAw63J2-z-DyM8HtRGF"},
    knife18: {name: "★ Flip Knife | Crimson Web", price: 152.21, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1f_BYQJK9eOhkYKYqPv9NLPFqWdQ-sJ0xOyR94_20VHlr0NsZzulcobEJAY5MAqD-VXvx-7m1pC6uZnByncw7yY8pSGKow-GEME"},
    knife19: {name: "★ Flip Knife | Fade", price: 198.77, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1f_BYQJD7eOwlYSOqPv9NLPFqWdQ-sJ0xLGQpIqtjQy1rUE5Y2n1I4PGcgI5MFGD-wS3l-7r18TpucyanHpg6CE8pSGKbZ02GvY"},
    knife20: {name: "★ Flip Knife | Forest DDPAT", price: 60.79, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1f_BYQJK9eOykJCKg8j4OrzZglRd6dd2j6eZrd7x2QXm-xZrNmz2LI-Tewc8YFHQ-AW4wOa71J687pXByHJm6SNz-z-DyNsSWDE9"},
    knife21: {name: "★ Flip Knife | Safari Mesh", price: 43.42, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1f_BYQJR_OO7kZODqOP1PYTck29Y_chOhujT8om72VXkr0E4Z2r3J9CRIQ9tNArWq1S_lOrug8Xv7sjJwXVruyUl5XqOmQv330_24dUqqg"},
    knife22: {name: "★ Flip Knife | Scorched", price: 59.27, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1f_BYQJR_OOylZCbm_LLP7LWnn9u5MRjjeyP84jzjVHl-hdtYm37co6Udw48N1zT8gLowLi705e7uZrIziFku3EisGGdwUJi_yOknw"},
    knife23: {name: "★ Flip Knife | Slaughter", price: 162.55, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1f_BYQJD4eOskYKZlsj4OrzZglRd6dd2j6eUoNij31K2_UZoZGynLITGdgM8MwvZ_FC2wbruhZfq6snOnHVluykg-z-DyJrKkz-J"},
    knife24: {name: "★ Flip Knife | Stained", price: 65.38, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1f_BYQJD_eOwm5KIkvPLP7LWnn9u5MRjjeyP8NX03gHj_RJlYWGiJYfDIQU5ZlmC-VG8l-y9g5C5v5Sdm3Bq6CUi5mGdwUJLmy-O2g"},
    knife25: {name: "★ Flip Knife | Urban Masked", price: 50.91, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1f_BYQJR_OOilZCOqOLmMbrfqWZU7Mxkh9bN9J7yjRrh_hduZT_ydYGccgRqM13Xq1Xolbrt1sC6vp_JzCBh7ygj53vfnR3kn1gSOdeWAw8q"},
    knife26: {name: "★ Gut Knife", price: 55.75, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQh5hlcX0nvUOGsx8DdQBJjIAVHubSaIAlp1fb3dihWoo2ywdPbx6Cna--IwTtUsMBwjLuZodit2wXm_ERrZWHwctKTcQVvZlHOug_pU950d94"},
    knife27: {name: "★ Gut Knife | Blue Steel", price: 64.09, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1ObcTjxT0966gYWPqPv9NLPFqWdQ-sJ0xLnEodz3igSx-BY-Zj2mJ9LAc1Q3Y13Y_1Lrwrvr0MW7uZifwCBlv3E8pSGKHolYdI0"},
    knife28: {name: "★ Gut Knife | Boreal Forest", price: 49.63, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1ObcTjVb09q5hoWYg8j2PKnUl2du5Mx2gv3--Y3nj1H6qUFkMm2gctSUcQJtNVCCr1TqkO3m056-6M_JnSRnuicn4njZmB3iiQYMMLJLcEs9NA"},
    knife29: {name: "★ Gut Knife | Case Hardened", price: 72.55, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1ObcTjxT09O_mIWPqPv9NLPFqWdQ-sJ0xO-Qod2i2wOy_EdpYW_7LIDBclI6aVHV-Fm_lOe-gJG5vpvKyHYwv3M8pSGKIGsDSZw"},
    knife30: {name: "★ Gut Knife | Crimson Web", price: 99.91, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1ObcTjVb08uzlpO0m_7zO6_ummpD78A_2LiW9Nuj0VGw-0JvYj2hJdKWI1NoZAnU-gPtyOzo0ZK4u52bm3Bh7j5iuyiVfFD71A"},
    knife31: {name: "★ Gut Knife | Fade", price: 111.98, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1ObcTjxD09q3kIW0m_7zO6_ummpD78A_3OyZrI-n2wPk_RY9NTrwINOSdQc9MlrW_gfqlbu9jJK4uJmYwCBlvT5iuyhGHAgcYg"},
    knife32: {name: "★ Gut Knife | Forest DDPAT", price: 49.82, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1ObcTjVb09iyhIGfqPv9NLPFqWdQ-sJ0xLGUoIqji1Xi-UVkZTr7coWTd1M7YVuE-Va3k-7o15LvuJyYwXRmsnE8pSGKxxB-nH8"},
    knife33: {name: "★ Gut Knife | Night", price: 71.38, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1ObcTi5N09K_k4ifqPv9NLPFqWdQ-sJ0xOzE9t73igDk_xJoYG-hItKSdlA_aAvX-AO2ybjohZW0vMybynM273U8pSGKrp7Yw2U"},
    knife34: {name: "★ Gut Knife | Safari Mesh", price: 41.23, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1ObcTi5S09Gzh4i0g_b6DLfYkWNF18lwmO7Eu9nz3Qyw_ERrN271JYKdIFc-YlmC_1m5l7i5hMS87p7Nz3c3uHMm4X7D30vgVFLgw28"},
    knife35: {name: "★ Gut Knife | Scorched", price: 48.25, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1ObcTi5S09i3hJCHksj4OrzZglRd6dd2j6eXoNv0jgLg_RVpZ2_zJIadclQ7Ml2F_Vi_wu3rhJbp7pnOyntk7HQk-z-DyOfOL3QM"},
    knife36: {name: "★ Gut Knife | Slaughter", price: 87.38, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1ObcTjxP08azlpKKqPv9NLPFqWdQ-sJ0xOqSotjz0FHj-hVvY2mmIIWQc1Q4aViC_FO6x7q-g5K56J6dnCNju3Q8pSGKFg_49QU"},
    knife37: {name: "★ Gut Knife | Stained", price: 58.29, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1ObcTjxT09q5hoOOk8j4OrzZglRd6dd2j6eS89n32AHjqERtYz-gIIKVcVA7ZQzT81a3l-rnh8C5vZycm3Rq7ihw-z-DyB1e9elV"},
    knife38: {name: "★ Gut Knife | Urban Masked", price: 82.99, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1ObcTi5S08i3hIW0guX2MrXummJW4NFOhujT8om73wWy_0ttYmH7LICVcFI9M1zYrFK7lO7shcTov5ScmiAw63Mls33fygv330-gpCcFhQ"},
    knife39: {name: "★ Karambit", price: 235.14, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQh5hlcX0nvUOGsx8DdQBJjIAVHubSaIAlp1fb3ejxQ7dG0nZTFz_WgaurTwzMA6ZFz0-qW99mn0Qzk_EJoYWylJtSXe1c9aAnSq1C8l_Cv28F7-X3KYA"},
    knife40: {name: "★ Karambit | Blue Steel", price: 242.57, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJlZG0lfvhNr_um25V4dB8teXA54vwxgLmqhFtYT-nIYecJgI3Z1DZ_FfqyLvqhpK-tJSbnSY2vSBx43eLn0epwUYbMQqd_ig"},
    knife41: {name: "★ Karambit | Boreal Forest", price: 169.55, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJnJm0kfjmNqjFqWle-sBwhtbN_Iv9nGu4qgE7Nnf7dtOce1Q3M13T-Fa7xejs0MXt753AnXJruiMn7C6LnBC1h0tIO-1um7XAHtmw6SCz"},
    knife42: {name: "★ Karambit | Case Hardened", price: 262.32, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJlZG0mP74Nr_ummJW4NFOhujT8om73Qay8kFuaj3xLYCVJAM7ZF-B8li9kOfm1sW6u5SfyHNru3Im7SvUlwv330-EAAozoQ"},
    knife43: {name: "★ Karambit | Crimson Web", price: 290.66, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJnJm0gPL2IITck29Y_chOhujT8om7iwLn_Ec4NWrwdoDDIFNtZlHT-QW6xOzmgZ_t6pTNznUyvnQg7Crclwv330__CL9_dg"},
    knife44: {name: "★ Karambit | Fade", price: 423.98, img: "https://steamcommunity-a.akamaihd.net/economy/image/fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz5wOuqzNQhscxbDDKJXSMo79TfqCCM318tqU9-iyLcHO1u6qtHPMrYkMIxLGsOBDqWEMFqu7x5sgvRZKsHY9iLu2HvvbmpbCRbrqGwa2LjQGA46XOw"},
    knife45: {name: "★ Karambit | Forest DDPAT", price: 156.76, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJnJm0k_PkMq_ummJW4NFOhujT8om73Fex-BdsN2z6I9eUdg4_Nw7UqQXtyLu81p7vvZrIznZr7iQr53fenQv3309FzuO8KA"},
    knife46: {name: "★ Karambit | Night", price: 202.01, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJh4-0mf7zO6_um25V4dB8teXA54vwxgbtrRVqNm_xJdKXcQVqMg7W_lDtl7vq1pe4753KynJqsnZ25n_alxapwUYbStGwX0o"},
    knife47: {name: "★ Karambit | Safari Mesh", price: 130.10, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJh5C0mvLnO4TFl2Vu5Mx2gv3--Y3nj1H6qkE4Zzqgco-cdwJsaF3XqVm_yL-70JG-7ZyamycyvXNz5SndzkG21wYMMLI7nV07EA"},
    knife48: {name: "★ Karambit | Scorched", price: 123.80, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJh5C0k_bkI7fUqWZU7Mxkh9bN9J7yjRrm_UdrNW77cdKWdAY7Z1DRrlG9yey80JO7ucudyXY3uXIlt3uMzRe1n1gSOZd2wXJa"},
    knife49: {name: "★ Karambit | Slaughter", price: 392.98, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJlY20jfL2IbrummJW4NFOhujT8om70Azg_kQ6MTygdYKXJw9qMlnX_Fa3ye28gpC-vZSdynYxviZztyncmwv330_7Rx0jNA"},
    knife50: {name: "★ Karambit | Stained", price: 219.07, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJlZG0kfjmML7VqWdY781lteXA54vwxgHg8xVtYj_7LNXBIw9qZgyE-Fi_xLy7gJXovZqcynNq7iIqtHndykGpwUYbOEO3hhM"},
    knife51: {name: "★ Karambit | Urban Masked", price: 152.99, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJh5C0g_bkNoTEhGlQ5vp9g-7J4bP5iUazrl04YG-nJdXDegc2Y1uBrlG6x-2-gZTq6p6YwSZq6CFzsynZlhS30B9PcKUx0vKbTggh"},
    knife52: {name: "★ M9 Bayonet", price: 159.66, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQh5hlcX0nvUOGsx8DdQBJjIAVHubSaIAlp1fb3fGR97t2vm46Og7mlMu6ExzsI7ZVy0rGWrN7w3VDh_RY9Y22nd4fDdAE4NFzUrFjqlL3tm9bi6x2aUKuH"},
    knife53: {name: "★ M9 Bayonet | Blue Steel", price: 180.07, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf3qr3czxb49KzgL-Khsj2P67UklRd4cJ5ntbN9J7yjRq3rUI5Mjz2dobBdgRtYQvS_FTrlOno1MLo78nIy3Jk73Jz4i7VzhHln1gSOQ4y0ztq"},
    knife54: {name: "★ M9 Bayonet | Boreal Forest", price: 95.33, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf3qr3czxb49KzgL-DjsjyPKnUhX9u6spjj-jNyoD8j1yglB89IT6mOoaSdlc5MFHWq1m5xL_qgsO67cnIzydr6yYl7X3ZmkO1gk1LOuFp16eACQLJZSfpy04"},
    knife55: {name: "★ M9 Bayonet | Case Hardened", price: 168.24, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf3qr3czxb49KzgL-Khsj7OrfUklRd4cJ5ntbN9J7yjRrj_hE6NjqlLNOccgE9MljVqAC8wOzqhJ60tc_BnXZqsigrs3bdmRO-n1gSObDaDdZj"},
    knife56: {name: "★ M9 Bayonet | Crimson Web", price: 187.66, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf3qr3czxb49KzgL-DjsjjNrnCqWZU7Mxkh9bN9J7yjRqwrxVvMGDyI9KSdgQ-Z1HV_VfsyLu-hZe1tMzJnHFgv3IitHmLzhO0n1gSOc4nk3bB"},
    knife57: {name: "★ M9 Bayonet | Fade", price: 361.49, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf3qr3czxb49KzgL-KlsjyMr_UqWdY781lteXA54vwxgLi-0FrNWqiI4CWIw5sYQnY81m3xLjs18LouZjNwXc3uCF27SuOy0SpwUYbghNKfR8"},
    knife58: {name: "★ M9 Bayonet | Forest DDPAT", price: 79.83, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf3qr3czxb49KzgL-DjsjwN6vQglRc7cF4n-T--Y3nj1H6_0RtYD32IY_BIwY4aA3R-VLrxue90Ja_tZ6fmHpn7CNwtCuPzBzhiQYMMLJQizr10Q"},
    knife59: {name: "★ M9 Bayonet | Night", price: 182.58, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf3qr3czxb49KzgL-YmMj6OrzZglRd4cJ5ntbN9J7yjRrhqhA-MTygIILEcwRvYgzVr1S9yefv1pHtvsjMwSMy7CghtCrflxK2n1gSORdzljmC"},
    knife60: {name: "★ M9 Bayonet | Safari Mesh", price: 87.65, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf3qr3czxb49KzgL-Yh8j5NqjZqX9Q5vp9g-7J4bP5iUazrl1tY2H6ItWSIQU-Y1DX_Vjsx-jnjZ657Z_LwCdm6HEl4nzbnBLlhxEfcKUx0rp-zgq-"},
    knife61: {name: "★ M9 Bayonet | Scorched", price: 97.36, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf3qr3czxb49KzgL-Yh8jwMqvBmm5u5Mx2gv3--Y3nj1H6qUttYz-mcoKTdg83Z1HX_FG4l7jt1pG8vZ7AwXJm6HVw4nfZzBDm1AYMMLItqjyW3w"},
    knife62: {name: "★ M9 Bayonet | Slaughter", price: 342.88, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf3qr3czxb49KzgL-KmsjuNrnDl1Rd4cJ5ntbN9J7yjRrh-BVlZW3ydoTHdABsZ13Y_Qe5xue6gMC-vp-amntr6yQq4XfUzhTin1gSOZHog2Kf"},
    knife63: {name: "★ M9 Bayonet | Stained", price: 122.12, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf3qr3czxb49KzgL-KhsjyPKnSk29u5Mx2gv3--Y3nj1H6rkdsajvyLIKQcAY9YQ7Trwfvxe_ugp7uuJ7AzHdl7iZ05XnayUSygwYMMLKw8Vd9_Q"},
    knife64: {name: "★ M9 Bayonet | Urban Masked", price: 80.60, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf3qr3czxb49KzgL-Yh8jgMqvUqX5D6sR_teTE8YXghWu4qgE7Nnf7cYCXcA9tZ1DZ_QO3x-7sjZS7ucidwSM26XZ07HbczRO_hxoZPeA8m7XAHsJxu2aY"}
  },
  chroma: {
    knife1: {name: "★ Bayonet | Damascus Steel", price: 144.29, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotLu8JAllx8zJYAJG7dG3h4OehMj4OrzZglRd6dd2j6fD8d7321bnrRA4ZGmlcNPGdQU4MF_Y-AfvxO_vjcPttZ_BzyZrvHEq-z-DyDvfktEk"},
    knife2: {name: "★ Bayonet | Doppler", price: 281.27, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotLu8JAllx8zJfAJG48ymmIWZqOf8MqjUx1Rd4cJ5ntbN9J7yjRrmrxZrZGH6JoaSdgZrZwvU-lPvk-i-1pW66svMnHtnuyAj7HmLzUC_n1gSOSy4kjfm"},
    knife3: {name: "★ Bayonet | Marble Fade", price: 399.68, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotLu8JAllx8zJfAJP7c60mIW0kfbwNoTdn2xZ_Pp9i_vG8ML0jFfm80U6YGCgLY7EewA9YV7S-gC3xubshMXtvsjMyXdjuCIrsSmLgVXp1iqhnkny"},
    knife4: {name: "★ Bayonet | Tiger Tooth", price: 356.29, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotLu8JAllx8zJfwJW5duzhr-Ehfb6NL7ummJW4NFOhujT8om73wzkrRVvMmz7cIaUIwE9NVyE_QW5xOu-0cTo78zNz3ZruXQj5imMyQv330-wFnub9Q"},
    knife5: {name: "★ Bayonet | Rust Coat", price: 110.90, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotLu8JAllx8zJYAJR-NmzmL-Amf7yNoTck29Y_chOhujT8om72ASy-URsa2r1cdSWcwdtN1yD_Ae3wbrthcPttMnByXtk6XIh5S2PnAv330-jInGVzA"},
    knife6: {name: "★ Bayonet | Ultraviolet", price: 81.60, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotLu8JAllx8zbfgJS-c6mmIW0m_7zO6_ummpD78A_ib7HpdT2igXsrUY_MG76JteXdVM_aV6Fr1e9wejugcS1v87KzHBjuj5iuyiOIho-lQ"},
    knife7: {name: "★ Flip Knife | Damascus Steel", price: 75.81, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1f_BYQJD_eOylY2KhPThIITck29Y_chOhujT8om73Q3nqBVsZzumIdPAcgZsaQuGr1LtlL_v1sO07cvNzXsyvyFw7H2Mmwv330_GcRb7_w"},
    knife8: {name: "★ Flip Knife | Doppler", price: 157.38, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1f_BYQJD4eOym5Cbm_LmDKvZl3hUufp9g-7J4cKj3FK2qEpvYmH7ddSRdVVvMFDTqVfsk7q6h8C_tZnJzHRh7CFw53zagVXp1vI5Ejry"},
    knife9: {name: "★ Flip Knife | Marble Fade", price: 241.55, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1f_BYQJD4eO7lZKJm_LLNbrVk1Rd4cJ5ntbN9J7yjRrh_BJlamqidoCTcQRsMArX_lPqkufp0J7p7sidn3trvichsy7YzRG_n1gSORYEYb_6"},
    knife10: {name: "★ Flip Knife | Tiger Tooth", price: 184.57, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1f_BYQJD4uOinYeOhcj7IbrfkW5u5Mx2gv3--Y3nj1H6_0dtMGmnJtXDdgQ5NVHQrAO-xue6jZTt6p2dyXVn6SFwsy6JnhbihQYMMLJJD10GFg"},
    knife11: {name: "★ Flip Knife | Rust Coat", price: 62.26, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1f_BYQJD_eOlgIWOm8j_PbLXk1RZ7cRnk9bN9J7yjRrkqEM5ZWHzJtKSdlVtY1-EqwDskrzogpK0vsicnHY373Ik5i7cmUeyn1gSOUyfWtyC"},
    knife12: {name: "★ Flip Knife | Ultraviolet", price: 78.61, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1f_BYQJR4-OmgZKbm_LLP7LWnn9u5MRjjeyPo42i3la2_kM4N2qmdtCUd1RqaFyDqVTrwbrsjMLt6p7Nm3JhuCcis2GdwULzMpUqFw"},
    knife13: {name: "★ Gut Knife | Damascus Steel", price: 73.31, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1ObcTjxT09i3mYGYlOLnDLfYkWNF18lwmO7Eu9XwiVLtqENpYzrwcoPBJFM7Ml7U_QW9x-_qhp7tvciYznJju3Yq5nrD30vgL77o414"},
    knife14: {name: "★ Gut Knife | Doppler", price: 85.30, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1ObcTjxP09i5hJCHkuXLI7PQhW4A18l4jeHVu9703Azs-hA_MTuncNWWIVU-aF7Z_1a7k-bo0cW_v8_OyXVqvyAqsy3D30vgdDGy9vw"},
    knife15: {name: "★ Gut Knife | Marble Fade", price: 108.88, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1ObcTjxP09G3hoKHksjyMr_UqWdY781lteXA54vwxgzhrUI_Mj3xJtTEdlM4ZlnW-lW7levs0J_pvM6fzHZmsyck5SvcmhepwUYbBOFy9O0"},
    knife16: {name: "★ Gut Knife | Tiger Tooth", price: 104.97, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1ObcTjxM08i_k4WZqPjmMrXWk1Rd4cJ5ntbN9J7yjRrg_kpsN2qiLYCTdAdtZA3V_gDowuzngMXuvp7OyXVk7HMk5ivZlxPln1gSOddL0hWc"},
    knife17: {name: "★ Gut Knife | Rust Coat", price: 51.88, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1ObcTjxT08-ikYWHqPz6Or3UqWNU6dNoteXA54vwxgDlrxdtZjr3J4GXdQI4aA6DrgO_kLzvhp6-vczAyyA36ykk5XeLn0epwUYbYI3sIZ8"},
    knife18: {name: "★ Gut Knife | Ultraviolet", price: 52.68, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1ObcTi5N08yjhpCHksj4OrzZglRd6dd2j6fF94mj0Qzt_0JqZmnyJYCTIQI9MwzRqQfswOa60J6_ucmbnyNj63Ml-z-DyDA-JgFz"},
    knife19: {name: "★ Karambit | Damascus Steel", price: 248.55, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJlZG0k_b5MqjSg3hu5cB1g_zMyoD0mlOx5UJrYGGldtTGdVQ2N13QqQTrw-65hJ-7uJibyCY3vSgq5ynVmRa2gEpSLrs4H0e_wQA"},
    knife20: {name: "★ Karambit | Doppler", price: 452.87, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJlY20k_jkI7fUhFRB4MRij7j--YXygECLpxIuNDztJYDGcg4_aFjS8gDoxOfn15G7vpXLzyFh6HMk4nranhfmgExJP7NsguveFwu10KRx-Q"},
    knife21: {name: "★ Karambit | Marble Fade", price: 510.57, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJlY20mvbmMbfUqW1Q7MBOhuDG_ZjKhFWmrBZyNmynJNCRdQdtMlyBqwW2lbq7g8Po6ZnLwCM17yhxsX2JlxXkgEsabPsv26LDJQinCA"},
    knife22: {name: "★ Karambit | Tiger Tooth", price: 447.73, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJlY60g_7zNqnumXlQ5sJ0teXI8oTht1i1uRQ5fTqnIdecJgFqMFmG-1TsxO3phcO0vpibziZruCYj537dzECwgB9KauZxxavJ_ct1ylw"},
    knife23: {name: "★ Karambit | Rust Coat", price: 169.88, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJlZG0hOPxNrfunWVY7sBOguzA45XKhFWmrBZyYGj0IdOTcANvYgzZ-QXrkOrphJS1v8jBzXVlvSEr4yrfmUfm1RhFZ_sv26IC487sHw"},
    knife24: {name: "★ Karambit | Ultraviolet", price: 210.56, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJh4-0h-LmI7fUqWdY781lteXA54vwxlfn-xdqMG_ycY_AIQRraVjYqFm6xLrqjJLtupzMnHZluCN24HmIyhCpwUYbxnUlics"},
    knife25: {name: "★ M9 Bayonet | Damascus Steel", price: 157.68, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf3qr3czxb49KzgL-KhsjwMrbQhWhE-_oo2tbN_Iv9nGu4qgE7NnegLIOUclU4NFjT-wK4wLrm1pfvvpnLyCY1uXIr5H3cnRCyhR8YPe1sm7XAHqKK2qu-"},
    knife26: {name: "★ M9 Bayonet | Doppler", price: 329.65, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf3qr3czxb49KzgL-KmsjwPKvBmm5D19V5i_rEpLP5gVO8v11tMmD6IobEdFRsMFmB8lPvlL-9hZbuvJ_JziBn7HYltnvfnES21xhKcKUx0sfosVEP"},
    knife27: {name: "★ M9 Bayonet | Marble Fade", price: 472.99, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf3qr3czxb49KzgL-Kmsj5MqnTmm5u7sR1j9bN_Iv9nGu4qgE7Nnf0J4THcFU-NFuD-Fi5yOjn1sXvvM7OnCE37yAm5neMzRy-hE5Faedvm7XAHpMyLagJ"},
    knife28: {name: "★ M9 Bayonet | Tiger Tooth", price: 429.33, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf3qr3czxb49KzgL-KmcjgOrzUhFRe-sR_jez--YXygECLpxIuNDztII_Bd1doM16E_Qe_xr29hcS_tJmbnHNnuyZz7HrenB2zgBlLarQ8gOveFwvcAFHlzA"},
    knife29: {name: "★ M9 Bayonet | Rust Coat", price: 111.21, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf3qr3czxb49KzgL-KhsjnJ77UmlRa5sx3j9bJ8I3jkWu4qgE7Nnf7IoCdJA85NAvXrgO3xLu9gZLotZvImHY1s3V04nqJzBTmhEpPZ-Q6m7XAHhi2BnJN"},
    knife30: {name: "★ M9 Bayonet | Ultraviolet", price: 118.02, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf3qr3czxb49KzgL-YmMjkJqnBmm5u5Mx2gv3--Y3nj1H6_hA9a2rwddSQc1Q5MFHX-AW3k-u915G7tZ-awXpqvydz43aOm0ez0gYMMLJr8B7KPw"}
  },
  huntsman: {},
  butterfly: {},
  shadow: {},
  falchion: {
    knife1: {name: "★ Falchion Knife", price: 62.48, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQh5hlcX0nvUOGsx8DdQBJjIAVHubSaIAlp1fb3dzxO79S_m47FlvP3MO-ClzsAsMN13u_Ept2gjFawqRBram_zd9DGdwRtZAzW-QS9lPCv28EYYhhURQ"},
    knife2: {name: "★ Falchion Knife | Blue Steel", price: 64.99, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1fLEcjVL49KJlZG0lfvhNr_ummJW4NFOhujT8om7jVWw-0o9Y2_2doeUd1M5YV-B_1jvkOrmg5617cvJnCZg7nQqsX6LnAv33096JBYroA"},
    knife3: {name: "★ Falchion Knife | Boreal Forest", price: 49.41, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1fLEcjVL49KJnJm0kfjmNqjFqWle-sBwhtbN_Iv9nGu4qgE7Nnf6dtCRI1RqZluErwTrwb-6jZTv6Z2YwXRkunUj5XrbyxbmhBxKb-Vom7XAHn20Kdwb"},
    knife4: {name: "★ Falchion Knife | Case Hardened", price: 72.25, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1fLEcjVL49KJlZG0mP74Nr_ummJW4NFOhujT8om7jFC3r0s6Zzj7I9OVeldsZFiGr1K8xe-6g5G1vZXAz3Nhv3Mm7SrdnAv330_UfpIpHA"},
    knife5: {name: "★ Falchion Knife | Crimson Web", price: 80.88, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1fLEcjVL49KJnJm0gPL2IITdn2xZ_Pp9i_vG8MKsiwfh_hBra2j6do7DJg83YgrV_lLskru61p-7usjOwHo2vHUq43zegVXp1quG0xFU"},
    knife6: {name: "★ Falchion Knife | Fade", price: 134.99, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1fLEcjVL49KJlYG0kfbwNoTdn2xZ_Pp9i_vG8MKkjFbiqRBtYT_3doKcdAE5M1vT-lK2w73s0JPt6p_In3Zl7iBx5H3ZgVXp1vKw8o78"},
    knife7: {name: "★ Falchion Knife | Forest DDPAT", price: 46.53, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1fLEcjVL49KJnJm0k_PkMq_ummJW4NFOhujT8om721bm80ZrMWD6dtSXI1c_M1nT-Va8xea7jce97cjLzSMy7yFws3vYnwv330-CGV7xUA"},
    knife8: {name: "★ Falchion Knife | Night", price: 32.57, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1fLEcjVL49KJh4-0mf7zO6_ummJW4NFOhujT8om73QfhrkpvamHxLIaQcQA-NAmDqVS3x-e6hMS-tMucz3Y1uyUg5HmLygv330_-hpfX1A"},
    knife9: {name: "★ Falchion Knife | Safari Mesh", price: 40.73, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1fLEcjVL49KJh5C0mvLnO4TFl2Vu5cB1g_zMyoD0mlOx5RY5ZDz1cdCQcAc7ZVjY8lK8xefqgZG-6MvAzHVlvyV3sy3Ym0ezghpSLrs4qtg7Y4A"},
    knife10: {name: "★ Falchion Knife | Scorched", price: 46.17, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1fLEcjVL49KJh5C0k_bkI7fUqWdY781lteXA54vwxgTj-RE4Z2j3J9eVIQE4aA7Srla2ye3q0Mfp6ZXBnSdns3Mq4XaPyxapwUYb8i5yVXs"},
    knife11: {name: "★ Falchion Knife | Slaughter", price: 116.08, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1fLEcjVL49KJlY20jfL2IbrummJW4NFOhujT8om721e2qBZuYmDycITEcAZsaVCF_FC-lebujZbvvsvNmHs27yAi43mOzgv3308URyVBpw"},
    knife12: {name: "★ Falchion Knife | Stained", price: 54.27, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1fLEcjVL49KJlZG0kfjmML7VqWdY781lteXA54vwxge28ktqNz-gJ4-QJwA4YV-E-we-xLi80Zfqv8jPm3owuHMgtn6LmhypwUYb5tWmOP0"},
    knife13: {name: "★ Falchion Knife | Urban Masked", price: 43.33, img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1fLEcjVL49KJh5C0g_bkNoTEhGlQ5vp9g-7J4bP5iUazrl0_YGDzINOdcwBsNwvT-gLqwO3v1JHtvZXPzCc1uSdz5n2IyxW0hRtIcKUx0k4sDK_g"}
  },
}

// cases
var cases = {
  case1: {
    milspec: {
      weap1: {
        name: "MP7 | Skulls",
        price: 0.78,
        img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou6ryFA957ODDZDFO_-O6nYeDg8j4MqnWkyUC7ZYp07iT94j3jVXsqkE-Y2qhJYKcJwA_aA7ZrFC6wLvqgcDt78ud1zI97Xw9NqWl"
      },
      weap2: {
        name: "AUG | Wings",
        price: 0.62,
        img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot6-iFA957PXNcClK6c6lq4GekMj4OrzZglRd6dd2j6fEpNik0Vbh-RJvNz2nINTAJgM9Y1CG_lK2lL_q0cPtvJqbySAyuCQq-z-DyC4dac1H"
      },
      weap3: {
        name: "SG 553 | Ultraviolet",
        price: 0.78,
        img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopb3wflFfwPz3YShQ_NCzq4yCkP_gDLfQhGxUppEl3rGSptmjigfn_0dqZTigdoDAdQ4_YV3XrlnoyOi-gpXv7p7OzyR9-n51Wu8Hu6Y"
      }
    },
    restricted: {
      weap1: {
        name: "Glock-18 | Dragon Tattoo",
        price: 4.95,
        img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposbaqKAxf0v73dS9D69O4q4eHmPT_DLfYkWNF18lwmO7Eu4mh2lXj-RJtajjxJoWcIQ83Y13X-QO2ye_ojJ61u8yfynUwvXYq4XbD30vgIiQpgfY"
      },
      weap2: {
        name: "USP-S | Dark Water",
        price: 4.77,
        img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo6m1FBRp3_bGcjhQ0927q5qOleX1DL_QhGBu5Mx2gv3--Y3nj1H6qhc4ZGn6doTAIAA2YlDV-Qe3xO7n0cLqtc7Ly3djuXQlsCmPlhy1hAYMMLLPDZXOFA"
      },
      weap3: {
        name: "M4A1-S | Dark Water",
        price: 5.28,
        img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO3mb-RkvXmMoTVl3la18l4jeHVyoD0mlOx5RVoa23wIo7EdgE2N12F-lPqwLzm0ZPpvpXIz3FmvnZ34n_YmhW01xtSLrs4m_P9LyY"
      }
    },
    classified: {
      weap1: {
        name: "AK-47 | Case Hardened",
        price: 28.21,
        img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhhwszHeDFH6OO6nYeDg8j4MqnWkyUIusYpjriToImhjQHg_EZkN2r0cY-RdAI3Z1jT-gS3kO_njZW_7pjB1zI97T2FIK3X"
      },
      weap2: {
        name: "Desert Eagle | Hypnotic",
        price: 11.78,
        img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposr-kLAtl7PLJTitH_si_k4-0m_7zO6_ummpD78A_0rzApNrw3FayqUs-YjqgIoWccVVvZAzQqVfqwr_u0JDpup3LynFhuT5iuyj9I0M0JQ"
      }
    },
    covert: {
      weap1: {
        name: "AWP | Lightning Strike",
        price: 48.69,
        img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAZt7P_BdjVW4tW4k7-KgOfLP7LWnn9u5MRjjeyPptuj2Qzt_0JsYDymJNDAIQ8-MA7U_1i3w-bphpO1v56bmHBk7yMksWGdwUJq4NI0lg"
      }
    }
  },
  case2: {
    milspec: {
      weap1: {
        name: "UMP-45 | Corporal",
        price: 0.09,
        img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo7e1f1Jf0Ob3ZDBS09-5hpCEhfb4DLbUkmJE5fp9i_vG8MKn3Qbj-UJrZWD6dYOVewQ5YVnR8lDtyO29jJLqvMvMyicxuyRz7HmIgVXp1kQqOE8Q"
      },
      weap2: {
        name: "Negev | Terrain",
        price: 0.10,
        img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpouL-iLhFfwOP3fzhF6cqJgJWZhsjgNqnDl2Jf18l4jeHVyoD0mlOx5Uo_ZTr1I47HclM4MwvZ_ljtwejnjcC_6Zyan3Fq6XEl5irdzhGz0E1SLrs4EJsmc8Q"
      },
      weap3: {
        name: "Tec-9 | Sandstorm",
        price: 0.78,
        img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoor-mcjhjxszcdD4b08-3moSYg_jmPoTck29Y_chOhujT8om7jgaw_0RuNm7yJYeTIA4_MwqE81S7l-rtgJW_6p_MyHI27HQg7HmLlgv330__9v-fTw"
      },
      weap4: {
        name: "MAG-7 | Heaven Guard",
        price: 0.12,
        img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou7uifDhjxszFcDoV09SzlZaOmcj4OrzZglRd6dd2j6fE9Nyl2lG1qkI6amH3cYSSelA7aAnZ-VXtkOfvhJDqvJ7BnXJluyIi-z-DyFkJt659"
      }
    },
    restricted: {
      weap1: {
        name: "MAC-10 | Heat",
        price: 0.62,
        img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou7umeldf0Ob3fDxBvYyJhoWPn_jgDLfYkWNF18lwmO7Eu9n031W2-RJuamvxcNSUcQY7aVyD-ALslO_qgcO_75XJzSM36XF35CvD30vgHA390Fw"
      },
      weap2: {
        name: "SG 553 | Pulse",
        price: 0.36,
        img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopb3wflFf0Ob3YjoXuY-JhJWHhPLLPr7Vn35c18lwmO7Eu9Sh0Fbk_xE9Ym37LI7EJgY7Ml_ZqQK6lLi-18W76JybwXZluykqtnvD30vgXWzJUu8"
      },
      weap3: {
        name: "FAMAS | Sergeant",
        price: 0.42,
        img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopb3wflFf0Ob3YjoXuY-JhJWHhPLLPr7Vn35c18lwmO7Eu9Sh0Fbk_xE9Ym37LI7EJgY7Ml_ZqQK6lLi-18W76JybwXZluykqtnvD30vgXWzJUu8"
      },
      weap3: {
        name: "USP-S | Guardian",
        price: 0.64,
        img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo6m1FBRp3_bGcjhQ09-jq5WYh8jxP77Wl2VF18l4jeHVyoD0mlOx5UdtZT_1JIHGIQNoMA2C_1PslO65h5Tpvc_AwXZmuiMr5CnZmhfm0hpSLrs4U9WKdHc"
      }
    },
    classified: {
      weap1: {
        name: "AK-47 | Redline",
        price: 4.62,
        img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV09-5lpKKqPrxN7LEm1Rd6dd2j6eQ9N2t2wK3-ENsZ23wcIKRdQE2NwyD_FK_kLq9gJDu7p_KyyRr7nNw-z-DyIFJbNUz"
      },
      weap2: {
        name: "P90 | Trigon",
        price: 2.50,
        img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopuP1FAR17OORIQJW_tWxm460mvLwOq7cqWdQ-sJ0xOvD8Iim21ftqhE-a2qlItCQcwY5aV6C-VS-lb_nh5C5us_LmnRis3Y8pSGK3Ot8Ex8"
      },
      weap3: {
        name: "Nova | Antique",
        price: 2.71,
        img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpouLWzKjhjxszGfitD0924gImagvLLP7LWnn9u5MRjjeyPpt-s2VHm-xE6ZWCnJdeTcQZvM1jV_1Dole68h8DtvZTPnXJhsnUm4WGdwUK2icMtfw"
      },
    },
    covert: {
      weap1: {
        name: "AWP | Asiimov",
        price: 31.42,
        img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17PLfYQJD_9W7m5a0mvLwOq7cqWdQ-sJ0xOzAot-jiQa3-hBqYzvzLdSVJlQ3NQvR-FfsxL3qh5e7vM6bzSA26Sg8pSGKJUPeNtY"
      },
      weap2: {
        name: "AUG | Chameleon",
        price: 2.24,
        img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot6-iFAR17PLddgJB5N27kYyOmPn1OqnUqWdY781lteXA54vwxlWw-hduNW_xcIeRegc3YlmE8gS8wrvv1MS86s-dzSdk6yYj5HzYyRKpwUYb8NvXBjQ"
      }
    }
  },
  case3: {
    milspec: {
      weap1: {
        name: "PP-Bizon | Cobalt Halftone",
        price: 0.17,
        img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotLO_JAlf0v73ZShQ_dO_h4W0n_b4Na_emG5u5Mx2gv3--Y3nj1H6rkBoNzr3dtfHcFA_NQnW_AO-xby7h8K_78ydm3diuSMrtirVnkOz1QYMMLJJTXlsBg"
      },
      weap2: {
        name: "M249 | Magma",
        price: 0.16,
        img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-jxcjhhwszHcy5L6NW3mr-HnvD8J4Tdl3lW7Yty0uiSrY-s2wHgqEE6Z2zwJdCVegY8NAmB_ljtkL_mjZG07s-fwCc3pGB8stBeF8Zo"
      },
      weap3: {
        name: "Five-SeveN | Kami",
        price: 0.35,
        img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposLOzLhRlxfbGTjVb09e3mYm0m_7zO6_ummpD78A_ieyVrN-sjlHg-hFvYzr1JYKWJAI2ZlDX8wC7xrvr05Pqvp_OnHpiuz5iuyjNWRRyUA"
      },
      weap4: {
        name: "Galil AR | Sandstorm",
        price: 0.21,
        img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposbupIgthwczLZAJR7dKyh5SEhfrLPr7Vn35c18lwmO7Eu9qs0AXtrkI9ZWv3JdOVIVdvaQzV-1PvwbvvgMO_uMnLmiMwvnInt33D30vgH7ufOHU"
      },
    },
    restricted: {
      weap1: {
        name: "Nova | Rising Skull",
        price: 0.98,
        img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpouLWzKjhjxszbeihO4OO4m5aKqPrxN7LEm1Rd6dd2j6eWo9zw2lC38kA9Z2z1ItKSIQVsaAvY-1C9ye25jcC7uMiby3dhuSkk-z-DyJ3pID1f"
      },
      weap2: {
        name: "MP9 | Rose Iron",
        price: 1.29,
        img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou6r8FAZt7OfAfi9M9eOkm5OOqPrkaoTdn2xZ_Pp9i_vG8ML02QzjrUJvZ2n3cdTEewBqNF7S-Ae6kufr0J65vJrBnyBisnQqsXiOgVXp1uZ7p0lz"
      },
      weap3: {
        name: "Dual Berettas | Marina",
        price: 1.17,
        img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpos7asPwJf2-r3fDxQ5dK3q5OemeX9IL7ummJW4NFOhujT8om7ilewrUBtNWyicoLEd1Q3Mw2G-APswbrqhpW6u5zMmHEyuiQi4i3UnQv330-xiJ-Mhw"
      },
      weap3: {
        name: "FAMAS | Pulse",
        price: 1.24,
        img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposLuoKhRf0Ob3dzxP7c-JhJWHhPLLP7LWnn9u5MRjjeyP843x3VCyqBdrMWmgd9DAdAM7Ml-D-Vi-wrrvjJe9uJ3AyXZqvyl3tmGdwUKbfF5qgg"
      }
    },
    classified: {
      weap1: {
        name: "AWP | Redline",
        price: 9.82,
        img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17PLfYQJB496klb-GkvP9JrbummpD78A_3LGXrI-i31fm_Uc5MW_3I4LDelc2YQmF-FPtl7_uh8PtupTMn3pnvD5iuyj-_v0pRA"
      },
      weap2: {
        name: "P250 | Mehndi",
        price: 4.05,
        img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopujwezhjxszYI2gS086zkomFkvPLP7LWnn9u5MRjjeyPrIj02wy2qEZqYjv1IYGTdwM7M1nX-lHryLvuhcLo7s7My3tqvnMk4mGdwUL_7jJtRA"
      },
      weap3: {
        name: "M4A1-S | Guardian",
        price: 5.77,
        img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO1gb-Gw_alfqjuk2dU78R_ntbN_Iv9nGu4qgE7NnfyddXHIAY-Z1jW_lm-yO--1pO_vsmcz3ow7HQl53-PmETjiBBMa-Nrm7XAHnr9YjkW"
      },
    },
    covert: {
      weap1: {
        name: "Sawed-Off | The Kraken",
        price: 3.79,
        img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopbuyLgNv1fX3cih9_92hkYSEkfHLPLjFmXtE5dVOhuDG_ZjKhFWmrBZyZG_ycNCQewc_NA6D_AC3x-7phMW77p7NnHZi6yJ0s3mIzBO21B1EPPsv26Kzq1aSUw"
      },
      weap2: {
        name: "M4A4 | Asiimov",
        price: 31.22,
        img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhjxszFJQJD_9W7m5a0mvLwOq7cqWdQ-sJ0xOvEpIj0jAbkqEE_ZD3xctLGJAE_Zw7U-QTowefth8TpvM_InHZh6XQ8pSGKWYJAoJI"
      }
    }
  },
  case4: {
    milspec: {
      weap1: {
        name: "UMP-45 | Delusion",
        price: 0.15,
        img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo7e1f1JfwOP3ZDBSuImJkM2dnuT9PLXCqWdY781lteXA54vwxgfnqhZrNmCmLNTDcAJrNFHXrFXowrrs0MO9vZ6czHNksiJz4nrbyUSpwUYbODub6t8"
      },
      weap2: {
        name: "MP9 | Dart",
        price: 0.23,
        img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou6r8FAR17P7YKAJB5Nmgho-FqPv9NLPFqWdQ-sJ0xL-YrY333Qzn_kBrNmqmcILHdQA4YAzTrALoxuu90JC-6p2anSQy6Ck8pSGKo7I07Pg"
      },
      weap3: {
        name: "MAG-7 | Firestarter",
        price: 0.17,
        img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou7uifDhzw8zFcDoV09q_hoWJnuPgNrXummJW4NFOhujT8om73gDkqhVuNj2hIYTEdVA_ZljW-FHrwOnq0cLt7ZifzCE1vSYh5n3YzQv330-fq6NOtQ"
      },
      weap4: {
        name: "G3SG1 | Murky",
        price: 0.20,
        img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposem2LFZf0v73dm5R642JmZWZnO7LP7LWnn9u5MRjjeyP94-hjQyw-xZrYz3xLYOXdwE4NV2D81e7wrq-gpfqvpybmnJh6Cgj5WGdwUKiw-CmAw"
      },
      weap5: {
        name: "Five-SeveN | Urban Hazard",
        price: 0.47,
        img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposLOzLhRlxfbGTj5X09q_goWYkuHxPYTEhGlQ5vp5i_PA54jKhF2zowcDPzixc9OLdgM4aF7WrlO9l7-5hJa_uM7MyCBruyMit3iMmBW1iBwdOOVngvWcT0LeWfIFPrcKKw"
      }
    },
    restricted: {
      weap1: {
        name: "Sawed-Off | Highwayman",
        price: 0.38,
        img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopbuyLgNv1fX3cCx9_92hkYSEkfHLMbfQlWBW58l1teXI8oTht1i1uRQ5fW2iLNWWIwQ5Ml_Y-gK8kOu61pXpuM_Pz3plvikqsSyImxa-1R0daeZxxavJyWv5Wgg"
      },
      weap2: {
        name: "M4A4 | Griffin",
        price: 1.07,
        img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhjxszFJTwW09uknYaNnvnLP7LWnn9u5MRjjeyPp9mgilDs-BU4YG3wcdedJw5qaVyB-wW7kufrjJO16J2by3Qw63ZzsGGdwUIIJNFlNw"
      },
      weap3: {
        name: "M4A1-S | Basilisk",
        price: 1.29,
        img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO3hb-Gw_alIITTl3hY5MxigdbN_Iv9nGu4qgE7NnfyLIWSclI4ZF3X_1G-wunp0Je_u87On3Qxuidx4iqJmxPkiEwfPbNtm7XAHjQFcBpg"
      },
      weap3: {
        name: "Glock-18 | Grinder",
        price: 0.53,
        img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposbaqKAxf0uL3djFN79eJl4-Cm_LwDLfYkWNF18lwmO7Eu4ihjFe2rUM4YW73I4_HewNvZQmE_lLtwui5hsS_6p6dmnpk6HJ27XvD30vg-FaCZJg"
      }
    },
    classified: {
      weap1: {
        name: "XM1014 | Tranquility",
        price: 2.54,
        img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgporrf0e1Y07PDdTiVPvYznwL-IluX9J7rCqWdY781lteXA54vwxgTi-xZqYG77coPHd1dsZw6D_1Lvw7q9gZO96p6dz3oxsiAh5inenxGpwUYbnX3d0Ig"
      },
      weap2: {
        name: "SCAR-20 | Cardiac",
        price: 2.09,
        img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopbmkOVUw7PDdTi5B7c7kxL-CmePxIa3UmH9Y58tOh-zF_Jn4t1i1uRQ5fTqgd9eWcAA8Y1rY-FK-wbvv0cXvuJrKwHFnvCZx43yPmUDj00lMPLZxxavJjrohnxA"
      },
      weap3: {
        name: "P250 | Cartel",
        price: 1.99,
        img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopujwezhhwszYI2gS09-3hpSOm8j5Nr_Yg2Zu5MRjjeyP8N-k3way-UM5NmCiLIeRIwQ4ZgvQq1O8k--7hp_vuZSdyXdrvnZx7WGdwUIdDe8uxA"
      }
    },
    covert: {
      weap1: {
        name: "P2000 | Fire Elemental",
        price: 7.39,
        img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovrG1eVcwg8zLZAJSvozmxL-NnuXxDL7dk2ZU5tFwhtbM8Ij8nVmLpxIuNDztLYGcJFVoZF3X-gO2x7y808K8vZ2cwHYxsigh4C7emkfm1BxOb7M80eveFwtKPv5lvA"
      },
      weap2: {
        name: "AK-47 | Wasteland Rebel",
        price: 15.67,
        img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszcYzRA-cizq4GAw6DLPr7Vn35c18lwmO7Eu9mhiwLnr0RvMWnxLdedIwY4YFCC_lnrk-28h5K675rIyntj6ygl4HnD30vgkRiUzqw"
      }
    }
  },
  case5: {
    milspec: {
      weap1: {
        name: "SCAR-20 | Grotto",
        price: 0.11,
        img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopbmkOVUw7PLZTi5B7c7kxL-Hkvb_DLfYkWNF18lwmO7Eu9yjig3m-EJqYGGhdYWRdVM3YAvW_VDrkrjt1pe_upnOzHZksyQq7HzD30vgqBRMdfs"
      },
      weap2: {
        name: "MP9 | Deadly Poison",
        price: 0.12,
        img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou6r8FAR17P7YKAJG6d2ymJm0h_j9ILTfqWdY781lteXA54vwxgTj_EVlZG-mI4acJ1U5M13Q-QXqxrvrgsS075TPy3FgsiYj4C3Yy0SpwUYb0AETg9w"
      },
      weap3: {
        name: "XM1014 | Quicksilver",
        price: 0.08,
        img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgporrf0e1Y07PLZTiVPvYznwL-YnvD4MoTdn2xZ_Pp9i_vG8MKi2Vfl80M_N2qhLNTBJ1c5NViC-1C3kLzt15_ouZnOwHAwvyFw5i6MgVXp1lnYE3jK"
      },
      weap4: {
        name: "M249 | System Lock",
        price: 0.09,
        img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-jxcjhjxszFI2kb08-zn5SEhcj4OrzZglRd6dd2j6fCrNmijQPkqEVpZWnxINSXIQY4Yw7Xqwe8we3u1JG678_Kmnpg7CFx-z-DyHq2In7y"
      },
      weap5: {
        name: "Glock-18 | Catacombs",
        price: 0.10,
        img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposbaqKAxf0Ob3djFN79eJkIWKg__gPLfdqWdY781lteXA54vwxleyqBBqMmj0JIWSIwU9MwqC_1O6kr_ujZO6753OmiRkvHR2tHvZlkGpwUYbVEIcxNs"
      }
    },
    restricted: {
      weap1: {
        name: "Desert Eagle | Naga",
        price: 0.32,
        img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposr-kLAtl7PLZTjlH7du6kb-FlvD1DLfYkWNF18lwmO7Eu46h2QS1r0tvZjvyLI-RIwI6aV7X_ADrwevmhZO0up_AwSM1uHNw5nzD30vgQ0tV-jw"
      },
      weap2: {
        name: "Dual Berettas | Urban Shock",
        price: 0.39,
        img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpos7asPwJf0Ob3dDFL-Nmlq5WZlfb6IK_ehGZu5Mx2gv3--Y3nj1H6r0BvMGCncICQdgU6NVCC8we6lOm9gJa1vsuamnA2uidz7XjZyhO1hAYMMLJ4pyETVQ"
      },
      weap3: {
        name: "Sawed-Off | Serenity",
        price: 0.38,
        img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopbuyLgNv1fX3cih9_92hkYSEkfHLN77Hl1Rc7cF4n-T--Y3nj1H6qks5YmihJoaRcFc4Yl6EqVXrwu_shJW4tJWfzHM3siYltnnUzka_gwYMMLK08M4Gpg"
      },
      weap3: {
        name: "MAC-10 | Malachite",
        price: 0.39,
        img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou7umeldf0v73fDxBvYyJmYGHlvT8Oq_UqWdY781lteXA54vwxg3srxBuYG_7JoSQJwdtMF2Dr1O5w-nshcDtv5-YwHBk6XYg5niPzUapwUYbFckqtmc"
      }
    },
    classified: {
      weap1: {
        name: "AK-47 | Cartel",
        price: 2.01,
        img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhhwszJemkV09-3hpSOm8j4OrzZglRd6dd2j6eT8Nv3jQ2y_xBrMT2iJ4aRJARvZgvT_VW8x-67jJPt6suamHtg7CBw-z-DyAdS0pUi"
      },
      weap2: {
        name: "M4A4 | 龍王 (Dragon King)",
        price: 3.21,
        img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhjxszFJTwW0924l4WYg-X1P4Tck29Y_chOhujT8om7jgex_RVkNWqlcYaSdgVoZljWqFnrkOrpjMK5tZ7MziQ36XYi7H6Lywv3308dOff4vw"
      },
      weap3: {
        name: "P250 | Muertos",
        price: 1.72,
        img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopujwezhjxszYI2gS09G3moSKm_bLP7LWnn9u5MRjjeyPpY32igHl_0VoMD30JoCRcVU4MFmGrwfvl-bohpC-tJWcm3c3uiJ04mGdwUJxLpw2dQ"
      }
    },
    covert: {
      weap1: {
        name: "AWP | Man-o'-war",
        price: 10.32,
        img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAZt7PLfYQJF4NOkjb-HnvD8J4Tdl3lW7Ysi3rHE9ImljgGw_xc9a2_0JY6ddA48Z17U8gXqxe_mgse1tJ_AyXtjpGB8srCcYzyi"
      },
      weap2: {
        name: "Galil AR | Chatterbox",
        price: 3.69,
        img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposbupIgthwczLZAJF7dC_mL-KleX1ILLemFRc7cF4n-T--Y3nj1H6_0Q6YWH0coTBdANoMlGG_gfrlLq9gcC6u8zMyXdh6HIk7XnYl0fliAYMMLLc6Xl8Aw"
      }
    }
  },
  case6: {
    milspec: {
      weap1: {
        name: "Galil AR | Rocket Pop",
        price: 0.09,
        img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposbupIgthwczLZAJF7dC_mIGZqOf1Ia_YlWdU-_p8j-3I4IHKhFWmrBZyMT-gcIHDdg42Y1mG8wS2kLvo1pXuupvOnSdgsyIg43iLn0Hj1ElJOvsv26IIRmYCig"
      },
      weap2: {
        name: "Glock-18 | Bunsen Burner",
        price: 0.10,
        img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposbaqKAxf0uL3djFN79fnzL-Nm_b5NqjulGdE7fp8j-3I4IHKhFWmrBZyY23zctKQdFU6Zg2EqwC7xe680cO8uZufyCAx63Eg7X_emUfliUtEb_sv26ID4uMQqQ"
      },
      weap3: {
        name: "Nova | Ranger",
        price: 0.09,
        img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpouLWzKjhjxszGfitD0863moeOhcj4OrzZglRd6dd2j6fEpomsjAew_0Q4Zm7zI4accAQ8YgnS_Fnrl-vm1MLuuZ6anHVluCcq-z-DyOIsbpmX"
      },
      weap4: {
        name: "P90 | Elite Build",
        price: 0.15,
        img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopuP1FAR17OORIQJP7c-ikZKSqPv9NLPFqWdQ-sJ0xO-UrYrz3AztqEpuNT-iLNWTJwJtZVrY-1XskLrvhMW_uZ-dn3Iy6CY8pSGK7PES7n8"
      },
      weap5: {
        name: "UMP-45 | Riot",
        price: 0.08,
        img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo7e1f1Jf0Ob3ZDBSuImJgZCZmPbmDLfYkWNF18lwmO7Eu9yhi1Ds_0BuYzr3J4GVIFVrNVnUq1K3yee9hcO9uJyanyRlvXVx7XfD30vggrNaWnM"
      },
      weap6: {
        name: "USP-S | Torque",
        price: 0.24,
        img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo6m1FBRp3_bGcjhQ09-jq5WYh8jkIbTWhG5C-8xnteXI8oTht1i1uRQ5fWDyd9LAdQ4_MgzQqVm7wey918TuupufynUw6Sd05C2MyRfmgBgfbuBxxavJa8F12Qc"
      }
    },
    restricted: {
      weap1: {
        name: "FAMAS | Neural Net",
        price: 0.37,
        img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposLuoKhRf0v73dzxP7c-JkI-fhMj4OrzZglRd6dd2j6fF9trz2Q3m_Es-Mjr2JtPEcgBsaQ3T_1a4l7_sh5K6vpmfyyRruHIm-z-DyAW7Mz8a"
      },
      weap2: {
        name: "M4A4 | Evil Daimyo",
        price: 1.01,
        img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhjxszFJTwW09mgnYy0k_b9PqLeqWdY781lteXA54vwxlfm-0s-Mmv2JtWVJg43YVqDqwC3xu2-g5W478-fmHtnvyUi7S7anhOpwUYbM4iiQZo"
      },
      weap3: {
        name: "MP9 | Ruby Poison Dart",
        price: 0.39,
        img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou6r8FAZt7P7YKAJM5cikm4eOmcj4OrzZglRd6dd2j6eS9Nz33VXjqBdvYjj0d9DBd1A-NVHQqFjvwb_u0cTq78mbz3Zh6XNz-z-DyBQ3E_ml"
      },
      weap4: {
        name: "Negev | Loudmouth",
        price: 0.62,
        img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpouL-iLhFf0Ob3fzhF6cqJlY6Fnv_9P7rFmXlu5Mx2gv3--Y3nj1H6_0FtY2r6J4OSIVVsMwuC8wPvwOrqg8Xt7ZycnXAy7yQq53aPmhG-hAYMMLJuiogy0Q"
      },
      weap5: {
        name: "P2000 | Handgun",
        price: 0.45,
        img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovrG1eVcwg8zJYAJSvozmxL-JmPj5DLfYkWNF18lwmO7Eu9-sjgTlqUM-a2-hI4-QIFNvZF7T-lG6wuy50MXq7svAynZiv3V34HfD30vgvQ9NEX0"
      }
    },
    classified: {
      weap1: {
        name: "CZ75-Auto | Yellow Jacket",
        price: 2.39,
        img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotaDyfgZf0Ob3cicVud2Jl4iKhOP9Kb7DqWZU7Mxkh9bN9J7yjRrmqUo6ZDrzLNDHdwVqMgrX-lC6lb-9gJ_v6J7Kn3dq7yl2s3iIykSyn1gSOaH4Qw9b"
      },
      weap2: {
        name: "MP7 | Nemesis",
        price: 3.33,
        img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou6ryFAR17P7YJgJM6dGlnZO0m_7zO6_ummpD78A_3buRotjw3wW1-URkYW6lIIfBIQNqZw7V-1Dqw7jvhZXvvc_PySZr6z5iuyjpCFO7dg"
      },
      weap3: {
        name: "SG 553 | Cyrex",
        price: 2.62,
        img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopb3wflFf0Ob3YjoXuY-Jl5mZku_LPr7Vn35c18lwmO7Eu9ii3lXgqRBpNzr2JICVdgU8Zl3Wq1e8wum9hJW86s7ByHU17iJxsHfD30vgJ6ERlcU"
      }
    },
    covert: {
      weap1: {
        name: "AK-47 | Aquamarine Revenge",
        price: 19.74,
        img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV09-5gZKKkPLLMrfFqWZU7Mxkh9bN9J7yjRrhrUFuazjzJteVJlQ6NVHTrFe3wObs15G06picwHFnvid25C3bnhSzn1gSOQz0szG-"
      },
      weap2: {
        name: "AWP | Hyper Beast",
        price: 27.48,
        img: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17PLfYQJK9cyzhr-JkvbnJ4Tck29Y_chOhujT8om7jQWwqhdoYmz0IIDEdgE7YFDTqQC7w-bs1Je6v8_AnCYxs3NzsCqPywv330-KxuSQ1w"
      }
    }
  }
};

/*===============STATISTICS===============*/
var totalMoneySpent = 0;
var totalCasesOpened = 0;
var totalBluesOpened = 0;
var totalPurplesOpened = 0;
var totalPinksOpened = 0;
var totalRedsOpened = 0;
var totalKnivesOpened = 0;


/*===============LOGIC===============*/

function beatboy() {
  money = 5000;
  inventoryMax = 200;
}

//cases -> case# -> rarity  -> weaponname, price, img
//cases -> case1 -> milspec -> weap1.name

//blues = 70%, purple = 20%, pink = 5%, red = 2.50%, knife = 0.50%

var rarityValue = {
  milspec: 0.75,
  restricted: 0.92,
  classified: 0.97,
  covert: 0.995,
};

function randSkin() {
     var skinsArray = [];
     var randSkin = "";
     var randNum = Math.random().toFixed(3); //rounded to 3 places to make it slightly easier to get certain rarities
     var rarity = "";
     var identifier;

     if (randNum <= rarityValue.milspec) {
       rarity = "milspec";
     } else if (randNum >= rarityValue.milspec && randNum <= rarityValue.restricted) {
       rarity = "restricted";
     } else if (randNum >= rarityValue.restricted && randNum <= rarityValue.classified) {
       rarity = "classified";
     } else if (randNum >= rarityValue.classified && randNum <= rarityValue.covert) {
       rarity = "covert";
     } else {
       rarity = "knife";
     }

     function skinChoose(r) {
       if (r === "knife") {
         var knifeCase = "";
         if (currentCase === "case5") {
           knifeCase = "chroma";
         } else if (currentCase === "sds") {
           knifeCase = "huntsman";
         } else if (currentCase === "sds") {
           knifeCase = "butterfly";
         } else if (currentCase === "sds") {
           knifeCase = "shadow";
         } else if (currentCase === "case6") {
           knifeCase = "falchion";
         } else {
           knifeCase = "regular";
         }

         skinsArray = Object.keys(knives[knifeCase]);

         randSkin = skinsArray[Math.floor(skinsArray.length * Math.random())];

         identifier = knives[knifeCase][randSkin];

         //console.log(identifier.name);
         //console.log(identifier.price);
         //console.log(identifier.img);
         var toEncode = "knives['" + knifeCase + "']" + "['" + randSkin + "']";
         inventory["item" + itemCounter] = window.btoa(toEncode);

         drawItem(itemDisp(identifier.name, identifier.price, identifier.img), rarity);

         if (popup) {
           caseModalDraw(identifier.name, identifier.img);
           $('.modalWindow').toggle();
         }

       } else {
         //console.log(r);
         skinsArray = Object.keys(cases[currentCase][r]);

         randSkin = skinsArray[Math.floor(skinsArray.length * Math.random())];

         identifier = cases[currentCase][r][randSkin];

         //console.log(identifier.name);
         //console.log(identifier.price);
         //console.log(identifier.img);
         var toEncode = "cases['" + currentCase + "']" + "['" + r + "']" + "['" + randSkin + "']";
         //console.log(toEncode);
         inventory["item" + itemCounter] = window.btoa(toEncode);
         //console.log(cases[currentCase][r][randSkin]);

         drawItem(itemDisp(identifier.name, identifier.price, identifier.img), rarity);

         if (popup) {
           caseModalDraw(identifier.name, identifier.img);
           $('.modalWindow').toggle();
         }


       }

       inventoryCurrent += 1;
       itemCounter += 1;
     }

     skinChoose(rarity);

}

function itemDisp(name, price, img) {
  var temp = [];

  temp.push(name, price, img);
  //console.log(temp);
  return temp;
}

function drawItem(array, rarity) {
    var name = array[0];
    var price = "$" + array[1].toFixed(2);
    var img = array[2] + "/70fx70f";

    $(".inventoryItemContainer").append('<div class="inventoryItem ' + rarity + '" id="'+ 'item' + itemCounter +'" title="' + name + '"><div class="itemPrice">' + price + '</div> <img src=' + img + '> </div>');
}

function inventoryClear() {
  inventory = {};
  $('.inventoryItemContainer').html("");
}

function drawInventory() {
  // I know this is cancer dont hate please
  var keys = Object.keys(inventory);

  for (var i = 0; i < keys.length; i++) {
    var rarity = atob(inventory[keys[i]]).replace(/\[[^\[]*$/g, "").match(/\[[^\[]*$/g).toString().match(/\b\w*\b/)[0];
    if (rarity === "regular" || rarity === "chroma" || rarity === "huntsman" || rarity === "butterfly" || rarity === "shadow" || rarity === "falchion") {
      rarity = "knife";
    }
    var item = eval(atob(inventory[keys[i]]));
    var name = item["name"];
    var price = "$" + item["price"].toFixed(2);
    var img = item["img"] + "/70fx70f";

    $(".inventoryItemContainer").append('<div class="inventoryItem ' + rarity + '" id="'+ keys[i] +'" title="' + name + '"><div class="itemPrice">' + price + '</div> <img src=' + img + '> </div>');
  }
}




/*===============CLICKS===============*/

$(".inventoryItemContainer").on("click", ".inventoryItem", function() {
  if (inventory[this.id]) {
    $(".tooltipAnchor").hide();
    var item = eval(atob(inventory[this.id]));
    //console.log(item);
    inventoryCurrent -= 1;
    money += (item['price']);
    //console.log(item['price']);
    delete inventory[this.id];
    $(this).remove();
    inventoryValue();
    skinOverflow();
  }
});


$("#case").click(function() {
  if (inventoryCurrent < inventoryMax) {
    var price = (operationCases[currentCase]["price"] - caseDiscount) + (keyPrice - keyDiscount);
    if (price >= 0 && money >= price) {
      money -= price;
      randSkin();
    } else if (price < 0 && money >= price) {
      randSkin();
    }
    inventoryValue();
  }
});

$(".jackpotDifficulty").click(function() {
  if (!jackpotInProgress) {
    $(".jackpotDifficultyContainer div").removeClass("active");
    $(this).addClass("active");

    jackpotDifficulty = this.id;

  }
});

$(".modalMain").on("click", ".modalClose", function() {
  $('.modalWindow').toggle();
});

$("#acceptButton").click(function() {
  money += acceptMoneyPerClick;
});

$(".about").click(function() {
  $(".main").toggleClass("small");
});

/*===============TABS===============*/

$("#caseTab").click(function() {
  if ($(".caseContainer").css('display') == 'none') {
    $(this).toggleClass("active");
    $("#jackpotTab").removeClass("active");
    $("#upgradeTab").removeClass("active");
    $("#inventoryTab").removeClass("active");
    $(".upgradeContainer").hide();
    $(".jackpotRightContainer").hide();
    $(".inventoryContainer").hide();
    $(".caseContainer").show();
    $(".rightMain").css("bottom","135px");
    $(".tradeButtonContainer").show();
    if ($(".unboxing").css('display') !== 'block') {
      $(".unboxing").show();
      $(".jackpot").hide();
    }
  }
});

$("#inventoryTab").click(function() {
  if ($(".inventoryContainer").css('display') == 'none') {
    $(this).toggleClass("active");
    $("#jackpotTab").removeClass("active");
    $("#upgradeTab").removeClass("active");
    $("#caseTab").removeClass("active");
    $(".upgradeContainer").hide();
    $(".jackpotRightContainer").hide();
    $(".inventoryContainer").show();
    $(".caseContainer").hide();
    $(".rightMain").css("bottom","135px");
    $(".tradeButtonContainer").show();
    if ($(".unboxing").css('display') !== 'block') {
      $(".unboxing").show();
      $(".jackpot").hide();
    }
  }
});

$("#upgradeTab").click(function() {
  if ($(".upgradeContainer").css('display') == 'none') {
    $(this).addClass("active");
    $("#jackpotTab").removeClass("active");
    $("#caseTab").removeClass("active");
    $("#inventoryTab").removeClass("active");
    $(".upgradeContainer").show();
    $(".jackpotRightContainer").hide();
    $(".inventoryContainer").hide();
    $(".caseContainer").hide();
    $(".rightMain").css("bottom","135px");
    $(".tradeButtonContainer").show();
    if ($(".unboxing").css('display') !== 'block') {
      $(".unboxing").show();
      $(".jackpot").hide();
    }
  }
});

$("#jackpotTab").click(function() {
  if (jackpotUnlocked) {
    if ($(".jackpotRightContainer").css('display') == 'none') {
      drawSwapInventory();
      $(this).addClass("active");
      $("#upgradeTab").removeClass("active");
      $("#caseTab").removeClass("active");
      $("#inventoryTab").removeClass("active");
      $(".upgradeContainer").hide();
      $(".jackpotRightContainer").show();
      $(".inventoryContainer").hide();
      $(".caseContainer").hide();
      $(".tradeButtonContainer").hide();
      $(".rightMain").css("bottom","0");
      if ($(".unboxing").css('display') == 'block') {
        $(".unboxing").hide();
        $(".jackpot").show();
      }
    }
  }
});

$('.settings').click(function() {
  $('.settingsList').toggleClass("hidden");
});

$('#popupCheckbox').change(function() {
  if (this.checked) {
    popup = false;
  } else {
    popup = true;
  }
});

$(".clearGameState").click(function() {
  clearGameState();
});

/*===============DOM MANIP===============*/

function caseInfo() {
  $('#caseDisplayImage').attr("src", operationCases[currentCase]["img"] + "/240fx182f");
  $('#caseName').html(operationCases[currentCase]["name"]);
  $('#casePrice').html("Case Price: $" + (operationCases[currentCase]["price"] - caseDiscount).toFixed(2) + "  |");
  $('#keyPrice').html("Key Price: $" + (keyPrice - keyDiscount).toFixed(2));
}

function update() {
  $('#money').html("$" + money.toFixed(2));
  $('#inventorySpace').html(inventoryCurrent + "/" + inventoryMax);
}

function caseModalDraw(name, img) {
  $(".modalMain").html("");
  if ($(".modalMain").hasClass("winner")) {
    $(".modalMain").removeClass("winner");
  }
  $(".modalMain").addClass("unbox");
  $(".modalMain").append('<img src="" id="modalImage"/> <div class="modalSkinName" id="modalSkinName"></div> <div class="modalClose unbox button" id="modalClose">Continue</div>');
  $("#modalImage").attr("src", img + "/360fx360f");
  $("#modalSkinName").html(name);
}

function inventoryValue() {
  var inventoryKeys = Object.keys(inventory);
  var totalValue = 0;
  for (var i = 0; i < inventoryKeys.length; i++) {
    totalValue += eval(atob(inventory[inventoryKeys[i]]))["price"];
  }
  $(".inventoryValue").html("Value: $" + totalValue.toFixed(2));
}

/*===============UPGRADES===============*/
function upgradeMultiplier(basePrice, amount) {
  var newPrice = basePrice * Math.pow(1.05, amount + 1).toFixed(2);
  console.log(newPrice);
  return newPrice;
}

$(".stackingUpgradeContainer").on("click", ".upgrade", function() {
  var name = stackingUpgrades[this.id]["name"];
  var desc = stackingUpgrades[this.id]["desc"];

  if (money >= stackingUpgrades[this.id]["price"]) {
    money -= stackingUpgrades[this.id]["price"];
    stackingUpgrades[this.id]["price"] = upgradeMultiplier(stackingUpgrades[this.id]["basePrice"], stackingUpgradesPurchased[this.id]);
    //console.log(upgradeMultiplier(stackingUpgrades[this.id]["basePrice"], stackingUpgradesPurchased[this.id]));
    keyDiscount += stackingUpgrades[this.id]["kp"];
    caseDiscount += stackingUpgrades[this.id]["cp"];
    inventoryMax += stackingUpgrades[this.id]["is"];
    stackingUpgradesPurchased[this.id] += 1;
  }
  caseInfo();
  $("#" + this.id).find(".upgradePrice").html("$" + stackingUpgrades[this.id]["price"].toFixed(2));
  $("#" + this.id).find(".upgradeAmount").html(stackingUpgradesPurchased[this.id]);
});


var stackingUpgrades = {
  upgrade1: {name: "Inventory Space", desc: "+1 to your max inventory space.", basePrice: 15, price: 15, cp: 0.00, kp: 0.00, is: 1, img: "https://steamcommunity-a.akamaihd.net/economy/image/U8721VM9p9C2v1o6cKJ4qEnGqnE7IoTQgZI-VTdwyTBeimAcIoxXpgK8bPeslY9pPJIvB5IWW2-452kaM8heLSRgleGAr7BMx-94b6MohOf-Xwsn7-USVDXgHhOG1zPDeLmsxwRtYpItIUb2wskZ6I0FWp9DdsKkOtQslw/100fx100f"},
  //upgrade2: {name: "Inventory Space", desc: "Inventory Space: +2", price: 45, cp: 0.00, kp: 0.00, is: 2, img: "https://steamcommunity-a.akamaihd.net/economy/image/U8721VM9p9C2v1o6cKJ4qEnGqnE7IoTQgZI-VTdwyTBeimAcIoxXpgK8bPeslY9pPJIvB5IWW2-452kaM8heLSRgleGAr7BMx-94b6MohOf-Xwsn7-USVDXgHhOG1zPDeLmsxwRtYpItIUb2wskZ6I0FWp9DdsKkOtQslw/100fx100f"},
  //upgrade3: {name: "Inventory Space II", desc: "Inventory Space: +5", price: 75, cp: 0.00, kp: 0.00, is: 5, img: "https://steamcommunity-a.akamaihd.net/economy/image/U8721VM9p9C2v1o6cKJ4qEnGqnE7IoTQgZI-VTdwyTBeimAcIoxXpgK8bPeslY9pPJIvB5IWW2-452kaM8heLSRgleGAr7BMx-94b6MohOf-Xwsn7-USVDXgHhOG1zPDeLmsxwRtYpItIUb2wskZ6I0FWp9DdsKkOtQslw/100fx100f"},
  //upgrade4: {name: "Inventory Space II", desc: "Inventory Space: +5", price: 75, cp: 0.00, kp: 0.00, is: 5, img: "https://steamcommunity-a.akamaihd.net/economy/image/U8721VM9p9C2v1o6cKJ4qEnGqnE7IoTQgZI-VTdwyTBeimAcIoxXpgK8bPeslY9pPJIvB5IWW2-452kaM8heLSRgleGAr7BMx-94b6MohOf-Xwsn7-USVDXgHhOG1zPDeLmsxwRtYpItIUb2wskZ6I0FWp9DdsKkOtQslw/100fx100f"}
};

var stackingUpgradesPurchased = {
  upgrade1: 0
};

function drawPermUpgradeContainer() {

}

function drawStackingUpgrades() {
  for (var upgrade in stackingUpgrades) {
    if (stackingUpgrades.hasOwnProperty(upgrade)) {
      //console.log(upgrade);
      if (stackingUpgradesPurchased[upgrade] > 0) {
        var upgradeTicker = stackingUpgradesPurchased[upgrade];
        for (var i = 0; i < upgradeTicker; i++) {
          buyUpgrade(upgrade);
        }
        $(upgrade).find(".upgradePrice").html("$" + stackingUpgrades[upgrade]["price"].toFixed(2));
        $(upgrade).find(".upgradeAmount").html(stackingUpgrades[upgrade]);
      }
      $(".stackingUpgradeContainer").append('<div class="upgrade" id="' + upgrade + '"> <div class="upgradePicture"> <img src="' + stackingUpgrades[upgrade]["img"] + '" id="upgradePicture"></div> <div class="upgradeInfo"> <div class="upgradeName">' + stackingUpgrades[upgrade]["name"] + '</div> <div class="upgradeDesc">' + stackingUpgrades[upgrade]["desc"] + '</div> <div class="upgradePriceLabel">Price: <span class="upgradePrice">' + "$" + stackingUpgrades[upgrade]["price"].toFixed(2) + '</span> </div> <div class="upgradeAmountLabel">Amount: <span class="upgradeAmount">'+ stackingUpgradesPurchased[upgrade] + '</span> </div> </div> </div>');
    }
  }
}


function buyUpgrade(id) {
  stackingUpgrades[id]["price"] = upgradeMultiplier(stackingUpgrades[id]["basePrice"], stackingUpgradesPurchased[id]);
  keyDiscount += stackingUpgrades[id]["kp"];
  caseDiscount += stackingUpgrades[id]["cp"];
  inventoryMax += stackingUpgrades[id]["is"];
  caseInfo();
}

/*===============CASES===============*/
function drawCases() {
  for (var crate in operationCases) {
    if (operationCases.hasOwnProperty(crate)) {
    $(".caseContainer").append('<div class="case" id="' + crate + '"> <div class="casePicture"> <img src="' + operationCases[crate]["img"] + '" id="casePicture"></div> <div class="caseInfo"> <div class="caseTitle">' + operationCases[crate]["name"] + '</div> <div class="caseValue">Value: ' + "$" + operationCases[crate]["price"].toFixed(2) + '</div> </div> </div>');
    }
  }
}

$(".caseContainer").on('click', '.case', function() {
  currentCase = this.id;
  caseInfo();
});


/*===============JACKPOT===============*/
var jackpotUnlocked = true;
var jackpotInProgress = false;
var swapSkins = 0;
var maxSwapSkins = 7;
var swapSkinsValue = 0;
var jackpotSelectedInventory = {};
var jackpotDifficulty = "low";

$(".jackpotRightPlayer").on("click", ".inventorySwapItem", function() {
  if (inventoryCurrent <= inventoryMax) {
    if (Object.keys(jackpotInventory).length < maxSwapSkins && jackpotInProgress == false) {
      if (inventory[this.id]) {
        var item = eval(atob(inventory[this.id]));
        //console.log(item);
        jackpotInventory[this.id] = inventory[this.id];
        drawSwappedItem(item.name, item.price, item.img, this.id);
        swapSkins += 1;
        swapSkinsValue += item.price;
        updateSwapInfo();
        //delete inventory[this.id];
        $(this).remove();
      }
    }
  }
});

$(".jackpotRightToBet").on("click", ".swappedItem", function() {
  if (inventoryCurrent <= inventoryMax) {
    if (jackpotInventory[this.id]) {
      var item = eval(atob(jackpotInventory[this.id]));
      //console.log(item);
      inventory[this.id] = jackpotInventory[this.id];
      drawJackpotSwapItem(item.name, item.price, item.img, this.id);
      swapSkins -= 1;
      swapSkinsValue -= item.price;
      updateSwapInfo();
      delete jackpotInventory[this.id];
      $(this).remove();
    }
  }
});

$(".jackpotRightStartButton").click(function() {
  if (Object.keys(jackpotInventory).length <= maxSwapSkins && swapSkins > 0 && jackpotInProgress == false) {
    $(".depositorContainer").html("");
    inventoryCurrent -= Object.keys(jackpotInventory).length;

    jackpotStart();
    inventoryReDraw();
  }
});

function drawJackpotSwapItem(name, price, img, id) {
      var keys = Object.keys(inventory);
      var rarity = atob(inventory[id]).replace(/\[[^\[]*$/g, "").match(/\[[^\[]*$/g).toString().match(/\b\w*\b/)[0];
      if (rarity === "regular" || rarity === "chroma" || rarity === "huntsman" || rarity === "butterfly" || rarity === "shadow" || rarity === "falchion") {
        rarity = "knife";
      }

      var name = name;
      var price = "$" + price.toFixed(2);
      var img = img + "/70fx70f";

      $(".jackpotRightPlayer").append('<div class="inventorySwapItem ' + rarity + '" id="' + id +'" title="' + name + '"><div class="itemPrice">' + price + '</div> <img src=' + img + '> </div>');
}

function drawSwappedItem(name, price, img, id) {
      var keys = Object.keys(inventory);
      var rarity = atob(inventory[id]).replace(/\[[^\[]*$/g, "").match(/\[[^\[]*$/g).toString().match(/\b\w*\b/)[0];
      if (rarity === "regular" || rarity === "chroma" || rarity === "huntsman" || rarity === "butterfly" || rarity === "shadow" || rarity === "falchion") {
        rarity = "knife";
      }

      var name = name;
      var price = "$" + price.toFixed(2);
      var img = img + "/70fx70f";

      $(".jackpotRightToBet").append('<div class="swappedItem ' + rarity + '" id="' + id +'" title="' + name + '"><div class="itemPrice">' + price + '</div> <img src=' + img + '> </div>');
}

function drawSwapInventory() {
  jackpotInventory = {};
  $(".jackpotRightToBet").html("");
  $(".jackpotRightPlayer").html("");
  swapSkinsValue = 0;
  swapSkins = 0;
  updateSwapInfo();
  // I know this is cancer dont hate please
  var keys = Object.keys(inventory);

  for (var i = 0; i < keys.length; i++) {
    var rarity = atob(inventory[keys[i]]).replace(/\[[^\[]*$/g, "").match(/\[[^\[]*$/g).toString().match(/\b\w*\b/)[0];
    if (rarity === "regular" || rarity === "chroma" || rarity === "huntsman" || rarity === "butterfly" || rarity === "shadow" || rarity === "falchion") {
      rarity = "knife";
    }
    var item = eval(atob(inventory[keys[i]]));
    var name = item["name"];
    var price = "$" + item["price"].toFixed(2);
    var img = item["img"] + "/70fx70f";

    $(".jackpotRightPlayer").append('<div class="inventorySwapItem ' + rarity + '" id="'+ keys[i] +'" title="' + name + '"><div class="itemPrice">' + price + '</div> <img src=' + img + '> </div>');
  }
}

function updateSwapInfo() {
  $(".jackpotRightValueTotal").html("$" + swapSkinsValue.toFixed(2))
  $(".jackpotRightSkinsTotal").html(swapSkins + "/" + maxSwapSkins);
}



//{name: "", difficulty: 1, profilePic: ""},
var jackpotAI = {
  bot1: ["jGal | CSGOClicker.net", 1, "https://i.imgur.com/WTjn0MM.png"],
  bot2: ["exochase", 1, "https://i.imgur.com/za6Y17z.png"],
  bot3: ["S5E3", 1, "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/62/62001ac6b067182b65f92fa07797c630af64bb4a_full.jpg"],
  bot4: ["MR.BEATS", 2, "https://i.imgur.com/dIs0yE8.png"],
  bot5: ["CockCrusher19", 2, "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/03/03b0621515c85e256c20a8f169737430fa57281d_full.jpg"],
  bot6: ["Octane | n OU", 2, "https://i.imgur.com/P2hwwIE.png"],
  bot7: ["Moon Cricket Butler", 3, "https://i.imgur.com/qNsPKRH.png"],
  bot8: ["filsmick", 3, "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/c3/c31d18ad931fd685ca3af5700db6a461e10bcfe8_full.jpg"],
  bot9: ["Nino Triste", 3, "https://i.imgur.com/n1iHk8a.png"],
  bot10: ["Lucky", 4, "https://i.imgur.com/Dg7cI81.png"],
  bot11: ["seif.", 4, "https://i.imgur.com/gcieULF.png"],
  bot12: ["Plebeian", 5, "https://i.imgur.com/ZjMTocK.png"],
  bot13: ["buckETS | Trading", 5, "https://i.imgur.com/wSVK1bt.png"],
  bot14: ["banned", 6, "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/57/575daf48a20828cb6470193b7067d2782aa5ff0f_full.jpg"],
  bot15: ["Roflzilla", 6, "https://i.imgur.com/prnsggZ.png"],
  bot16: ["Jainxu", 7, "https://i.imgur.com/nwEsAGH.png"],
  bot17: ["Platinum (diff7)", 7, "https://i.imgur.com/BzuCWzL.png"],
  bot18: ["sp00ky gh0stman", 8, "https://i.imgur.com/ISxQyow.png"],
  bot19: ["storM", 9, "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/e5/e51667b64e8591b8428b4fc268fc826f21a982cf_full.jpg"]
};

var jackpotPots = {
  low: ["bot1", "bot2", "bot3", "bot4", "bot5", "bot6", "bot7", "bot8", "bot9"],
  medium: ["bot7", "bot8", "bot9", "bot10", "bot11", "bot12", "bot13", "bot14"],
  high: ["bot15", "bot16", "bot17", "bot18", "bot19"]
}


//different version of difficulty
var jackpotAiDifficulty1 = {
  1: {freq: 0.20, milspec: 0.950, restricted: 0.975, classified: 0.998, covert: 0.999},
  2: {freq: 0.30, milspec: 0.750, restricted: 0.900, classified: 0.998, covert: 0.999},
  3: {freq: 0.35, milspec: 0.500, restricted: 0.600, classified: 0.950, covert: 0.999},
  4: {freq: 0.40, milspec: 0.350, restricted: 0.500, classified: 0.950, covert: 0.999},
  5: {freq: 0.50, milspec: 0.200, restricted: 0.400, classified: 0.600, covert: 0.800},
  6: {freq: 0.05, milspec: 0.150, restricted: 0.200, classified: 0.950, covert: 0.400},
  7: {freq: 0.05 ,milspec: 0.050, restricted: 0.150, classified: 0.950, covert: 0.350},
  8: {freq: 0.05, milspec: 0.025, restricted: 0.090, classified: 0.350, covert: 0.250},
  9: {freq: 0.05, milspec: 0.005, restricted: 0.010, classified: 0.015, covert: 0.050}
};


var jackpotAiDifficulty2 = {
  1: ["milspec"],
  2: ["milspec", "restricted"],
  3: ["milspec", "restricted", "classified"],
  4: ["milspec", "restricted", "classified", "covert"],
  5: ["milspec", "restricted", "classified", "covert", "knife"],
  6: ["restricted", "classified", "covert", "knife"],
  7: ["classified", "covert", "knife"],
  8: ["covert", "knife"],
  9: ["knife"]
};

function inventoryReDraw() {
  $(".jackpotRightPlayer").html("");
  $(".inventoryItemContainer").html("");
  $(".jackpotRightToBet").html("");
  drawInventory();
  drawSwapInventory();
  inventoryValue();
}

function jackpotStart() {
  $(".jackpotRightToBet").html("");
  $(".winnerIs").html("");
  jackpotInProgress = true;
  var skins = 0;
  var maxSkins = 60;
  var pot = {};
  var players = [];
  var botTickets = {
    bot1: 0,
    bot2: 0,
    bot3: 0,
    bot4: 0,
    bot5: 0,
    bot6: 0,
    bot7: 0,
    bot8: 0,
    bot9: 0,
    bot10: 0,
    bot11: 0,
    bot12: 0,
    bot13: 0,
    bot14: 0,
    bot15: 0,
    bot16: 0,
    bot17: 0,
    bot18: 0,
    bot19: 0
  };
  var playerTickets = 0;
  var totalTickets = 0;
  var jackpotItemCounter = 0;
  var jackpotTimerCounter = 25;
  var depositTicker = 0;
  var AIKeys = JSON.parse(JSON.stringify(jackpotPots[jackpotDifficulty]));

  for (var skin in jackpotInventory) {
    if (jackpotInventory.hasOwnProperty(skin)) {
      if (inventory.hasOwnProperty(skin)) {
        var item = eval(atob(jackpotInventory[skin]));
        playerTickets += item.price * 100;
        //console.log(skin);
        pot[skin] = jackpotInventory[skin];
        skins += 1;
        //console.log(skins);
        delete inventory[skin];
      } else {
        //delete jackpotInventory[skin];
      }
    }
  }
  jackpotInventory = {};

  totalTickets += playerTickets;

  function drawPlayerDepositor(playerName, playerValue, playerImg) {
    $(".depositorContainer").append('<div class="jackpotDepositor" id="playerDepositor"> <div class="depositorInfo"><img src="' + playerImg + '" class="depositorProPic"> <div class="depositorName">' + playerName + '</div> <div class="depositorValue" id="depositValue">$'+ playerValue +'</div> <div class="depositorSkinContainer" id="playerDeposit"> </div> </div> </div>');
    $("#playerDepositor").hide().fadeIn();
    var keys = Object.keys(pot);

    for (var i = 0; i < keys.length; i++) {
      var rarity = atob(pot[keys[i]]).replace(/\[[^\[]*$/g, "").match(/\[[^\[]*$/g).toString().match(/\b\w*\b/)[0];
      if (rarity === "regular" || rarity === "chroma" || rarity === "huntsman" || rarity === "butterfly" || rarity === "shadow" || rarity === "falchion") {
        rarity = "knife";
      }
      var item = eval(atob(pot[keys[i]]));
      var name = item["name"];
      var price = item["price"].toFixed(2);
      var img = item["img"] + "/70fx70f";

      $("#playerDeposit").append('<div class="depositorSkin ' + rarity + '" id="'+ keys[i] +'" title="' + name + '"><div class="itemPrice">$' + price + '</div> <img src=' + img + '> </div>');
    }

  }
  $(".jackpotCountDown").html(jackpotTimerCounter);
  drawPlayerDepositor("Player1 (You)", (playerTickets / 100).toFixed(2), "https://i.imgur.com/ICK2lr1.jpg");
  $(".jackpotCurrentWorth").html("Pot: $" + (totalTickets / 100).toFixed(2));
  $(".jackpotPercentOfTickets").html("Your odds to win: " + (playerTickets / totalTickets * 100).toFixed(2) + "%");

  var jackpotTimer = setInterval(function() {
    if (jackpotTimerCounter > 0) {
      if (skins < maxSkins) {
        jackpotAISkinDraw();
      } else {
        jackpotPickWinner();
        clearInterval(jackpotTimer);
      }
      jackpotTimerCounter -= 1;
    } else {
      jackpotPickWinner();
      clearInterval(jackpotTimer);
    }
    //console.log(jackpotTimerCounter);
    //console.log("Skins:" + skins);
    $(".jackpotCurrentWorth").html("Pot: $" + (totalTickets / 100).toFixed(2));
    $(".jackpotPercentOfTickets").html("Your odds to win: " + (playerTickets / totalTickets * 100).toFixed(2) + "%");
    $(".jackpotCountDown").html(jackpotTimerCounter);
  }, 1000);

  function jackpotAISkinDraw() {
    if (Math.random() > 0.85) {
      if (AIKeys.length > 0) {
        if (maxSkins - skins <= maxSwapSkins) {
          jackpotRandSkin();
          //skins += Math.round(Math.random() * (maxSkins - skins));
        } else {
          jackpotRandSkin();
        }
      } else {
        console.log("empty!");
      }
    }

    function jackpotRandSkin() {
      var jackpotCase = "";
      var skinsArray = [];
      var randSkin = "";
      var randNum = Math.random().toFixed(3); //rounded to 3 places to make it slightly easier to get certain rarities
      var numSkins = Math.ceil(Math.random() * 6);
      var identifier;

      //console.log(AIKeys);

      var randomBot = AIKeys[Math.floor(AIKeys.length * Math.random())];

      //console.log(randomBot);

      var botName = jackpotAI[randomBot][0];
      var botDiff = jackpotAI[randomBot][1];
      var botImg = jackpotAI[randomBot][2];


      players.push(randomBot);
      //console.log(botName);
      //console.log(jackpotAiDifficulty2[botDiff]);

      //sticks with same bot for the duration of # of skins they have, new rarity for each skin


      function skinChoose() {
        jackpotCase = Object.keys(cases)[Math.floor(Object.keys(cases).length * Math.random())];

        var rarity = jackpotAiDifficulty2[botDiff][Math.floor(jackpotAiDifficulty2[botDiff].length * Math.random())];

        if (rarity === "knife") {
          //var knifeCase = Object.keys(knives)[Math.floor(Math.random() * Object.keys(knives).length)];
          var enabledKnives = ["regular", "chroma", "falchion"];
          var knifeCase = enabledKnives[Math.floor(Math.random() * enabledKnives.length)];

          skinsArray = Object.keys(knives[knifeCase]);
          randSkin = skinsArray[Math.floor(skinsArray.length * Math.random())];
          identifier = knives[knifeCase][randSkin];

          //console.log(identifier.name);
          //console.log(identifier.price * 100);
          botTickets[randomBot] += Math.round(identifier.price * 100);
          totalTickets += Math.round(identifier.price * 100);
          var toEncode = "knives['" + knifeCase + "']" + "['" + randSkin + "']";
          //console.log(toEncode);
          pot["item" + itemCounter] = window.btoa(toEncode);

          //drawItem(itemDisp(identifier.name, identifier.price, identifier.img), rarity);
          drawBotItem(itemDisp(identifier.name, identifier.price, identifier.img), rarity);
        } else {

          skinsArray = Object.keys(cases[jackpotCase][rarity]);
          randSkin = skinsArray[Math.floor(skinsArray.length * Math.random())];
          identifier = cases[jackpotCase][rarity][randSkin];

          botTickets[randomBot] += Math.round(identifier.price * 100);
          totalTickets += Math.round(identifier.price * 100);

          var toEncode = "cases['" + jackpotCase + "']" + "['" + rarity + "']" + "['" + randSkin + "']";
          //console.log(toEncode);
          pot["item" + itemCounter] = window.btoa(toEncode);
          //console.log(cases[currentCase][rarity][randSkin]);

          drawBotItem(itemDisp(identifier.name, identifier.price, identifier.img), rarity);

        }
        skins += 1;
        jackpotItemCounter += 1;
        itemCounter += 1;
      }

      function drawBotItem(array, rarity) {
          var name = array[0];
          var price = "$" + array[1].toFixed(2);
          var img = array[2] + "/70fx70f";
          var rarity = rarity;
          var botSelector = "deposit" + depositTicker;

          $('#' + botSelector).append('<div class="depositorSkin ' + rarity + '" title="' + name + '"><div class="itemPrice">' + price + '</div> <img src=' + img + '> </div>');
          //console.log(randomBot);
      }

      var depositValueVar = "depositValue" + depositTicker;
      function drawDepositor(botName, botDrawPrice, botImg) {
        var depositorProPic = botImg;
        var depositorName = botName;

        $(".depositorContainer").append('<div class="jackpotDepositor" id="jackpotDepositor' + randomBot + '"> <div class="depositorInfo"><img src="' + depositorProPic + '" class="depositorProPic"> <div class="depositorName">' + depositorName + '</div> <div class="depositorValue" id="depositValue'+ depositTicker + '"></div> <div class="depositorSkinContainer" id="deposit' + depositTicker + '"> </div> </div> </div>');
        $("#jackpotDepositor" + randomBot).hide().fadeIn();
      }
      drawDepositor(botName, botDrawPrice, botImg);

      for (var i = 0; i < numSkins; i++) {
        skinChoose();
      }


      var botDrawPrice = botTickets[randomBot] / 100;
      //console.log(depositValueVar);
      $("#" + depositValueVar).html("$" + botDrawPrice.toFixed(2));
      depositTicker += 1;

      AIKeys.splice(AIKeys.indexOf(randomBot), 1);
    }

  }

  function jackpotPickWinner() {
    var ticketAdder = 0;
    var randTicket = Math.round(Math.random() * totalTickets);
    console.log("Random Ticket: " + randTicket);
    console.log("Player Tickets: " + playerTickets);
    console.log("Total Tickets: " + totalTickets);

    if (randTicket <= playerTickets && randTicket > 0) {
      $(".winnerIs").html("You Win!");
      $("#playerDepositor").addClass("winner");
      console.log("You Win!");
      inventoryCurrent += Object.keys(pot).length;
      $.extend(inventory, pot);
      skinOverflow();
      if (winnerModal) {
        winnerModalDraw();
      }

    } else {
      ticketAdder += playerTickets;
      for (var i = 0; i < players.length; i++) {
        var botTicketsOwned = botTickets[players[i]];
        if (randTicket <= (botTicketsOwned + ticketAdder) && randTicket > ticketAdder) {
          $(".winnerIs").html("Winner is: " + jackpotAI[players[i]][0]);
          $("#jackpotDepositor" + players[i]).addClass("winner");
          console.log(players[i]);
          itemCounter -= jackpotItemCounter;
          break;
        } else {
          ticketAdder += botTicketsOwned;
        }
      }
    }
    swapSkinsValue = 0;
    swapSkins = 0;
    inventoryReDraw();
    updateSwapInfo();
    $(".jackpotCountDown").html("00");
    //console.log(botTickets);
    //console.log(pot);
    jackpotInProgress = false;
    saveGameState();
  }

  var winnerModal = true;
  function winnerModalDraw() {
    //<img src="" id="modalImage"/> <div class="modalSkinName" id="modalSkinName"></div> <div class="unboxButton button" id="unboxButton">Continue</div>
    //<div class="winnerModalHeader">Congratulations</div> <div class="winnerModalMessage">You won <span class="winnerAmount">$586.14</span> worth of skins.</div> <div class="winnerModalWarnMessage"><i class="fa fa-exclamation-triangle"></i> You are over your max inventory space. Upgrade inventory space or sell some items to bet and unbox again.</div> <div class="winnerModalSkinContainer"> </div>
    var winningSkinsValue = (totalTickets / 100).toFixed(2);
    console.log(totalTickets / 100);
    console.log((totalTickets / 100).toFixed(2));
    $(".modalMain").html("");
    if ($(".modalMain").hasClass("unbox")) {
      $(".modalMain").removeClass("unbox");
    }
    $(".modalMain").addClass("winner");
    $(".modalMain").append('<div class="modalClose">X</div><div class="winnerModalHeader">Congratulations!</div> <div class="winnerModalMessage">You won <span class="winnerAmount">$' + winningSkinsValue + '</span> worth of skins.</div><div class="winnerModalWarnMessage"><i class="fa fa-exclamation-triangle"></i> You are over your max inventory space. Upgrade inventory space or sell some items to bet and unbox again.</div><div class="winnerModalSkinContainer"> </div>');
    if (inventoryCurrent < inventoryMax) {
      $(".winnerModalWarnMessage").toggle();
    }

    var keys = Object.keys(pot);
    for (var i = 0; i < keys.length; i++) {
      var rarity = atob(pot[keys[i]]).replace(/\[[^\[]*$/g, "").match(/\[[^\[]*$/g).toString().match(/\b\w*\b/)[0];
      if (rarity === "regular" || rarity === "chroma" || rarity === "huntsman" || rarity === "butterfly" || rarity === "shadow" || rarity === "falchion") {
        rarity = "knife";
      }
      var item = eval(atob(pot[keys[i]]));
      var name = item["name"];
      var price = "$" + item["price"].toFixed(2);
      var img = item["img"] + "/70fx70f";

      $(".winnerModalSkinContainer").append('<div class="inventoryItem ' + rarity + '" id="'+ keys[i] +'" title="' + name + '"><div class="itemPrice">' + price + '</div> <img src=' + img + '> </div>');
    }
    $('.modalWindow').toggle();
  }
}

/*===============VISUAL===============*/

function backgroundCheck() {
  $('.display').width($(window).width() - 575);
}

$(window).on('resize', function(){
    backgroundCheck();
});

function skinOverflow() {
  if (inventoryCurrent > inventoryMax) {
    $('.mainInfoLabelWarning').css('display','inline-block');
  } else if ($(".mainInfoLabelWarning:visible") && inventoryCurrent <= inventoryMax) {
    $('.mainInfoLabelWarning').css('display','none');
  }
}
/*
$(".inventoryContainer").on({mouseenter: function() {
  var item = eval(atob(inventory[this.id]));
  var name = item["name"];
  $(".tooltipAnchor").html(this.title);
  $(".tooltipAnchor").show();
  $(".tooltipAnchor").stop().animate({opacity:1}, 400);
}, mouseleave: function() {
  $(".tooltipAnchor").css("opacity", 0);
  $(".tooltipAnchor").hide();
}}, ".inventoryItem").mousemove(function() {
    $(".tooltipAnchor").css({top: event.clientY - 125, left: event.clientX - 100});
});
*/

$(".tt").on({ mouseenter: function() {
        $(".tooltipAnchor").html($(this).attr("data-tt"));
        var ele = $(this).offset();
        $(".tooltipAnchor").css({top: ele.top - 28, left: ele.left - 100 + ($(this).width() / 2)});
        //console.log($(this).width() / 2);
        $(".tooltipAnchor").show();
    }, mouseleave: function() {
        $(".tooltipAnchor").hide();
        $(".tooltipAnchor").html("");
    }
});

/*===============TICKERS===============*/

setInterval(function() {
  update();
}, 1000 / fps);

setTimeout(function() {
  $("#notif").toggleClass("hidden");
  setTimeout(function() {
    $("#notif").toggleClass("hidden");
  }, 5000);
}, 1500);

setInterval(function() {
  saveGameState();
}, 30000);

/*===============SAVEGAME===============*/
function saveGameState() {
  var string = {
    "money": money,
    "inventory": inventory,
    "itemCounter": itemCounter,
    "currentCase": currentCase,
    "stackingUpgradesPurchased": stackingUpgradesPurchased
  };

  localStorage.setItem("savegame", JSON.stringify(string));
  console.log("Game Saved.");
}

function loadGameState() {
  if (localStorage.getItem("savegame") !== null) {
    inventoryClear();
    var saveGame = JSON.parse(localStorage.getItem("savegame"));
    //console.log(saveGame);

    money = saveGame["money"];
    inventory = saveGame["inventory"];
    inventoryCurrent = Object.keys(inventory).length;
    itemCounter = saveGame["itemCounter"];
    currentCase = saveGame["currentCase"];
    stackingUpgradesPurchased = saveGame["stackingUpgradesPurchased"];
    drawInventory();
    inventoryValue();
    skinOverflow();
    console.log("Game Save found. Successfully loaded.");
  } else {
    console.log("No save game detected.")
  }

}

function clearGameState() {
  localStorage.removeItem("savegame");
  console.log("Game save deleted!");
  location.reload();
}

/*===============CANVAS===============*/


/*==============================================================================
Canvas
==============================================================================*/



/*
// "+1" popups
var canvas = document.getElementById("drawing");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth - $('.right').width();
canvas.height = window.innerHeight;
var tt = [];
function makeToolTip(element, ) {
}
*/


/*
$("#case").click(function() {
  var randX = Math.floor(Math.random() * 240);
  var randY = Math.floor(Math.random() * 180);
  var text = "+ $" + moneyPC;
  var alpha = 1.0;
  var interval = setInterval(function () {
    ctx.save();
    canvas.width = canvas.width;
    ctx.fillStyle = "rgba(255, 0, 0, " + alpha + ")";
    ctx.font = "20px Georgia";
    ctx.fillText(text, randX, randY);
    alpha -= 0.05;
    if (alpha < 0) {
      canvas.width = canvas.width;
      clear(interval);
    }
    ctx.restore();
  }, 50);
});
*/


/*
var fps = 1000 / 60;
var degrees = 0;
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth - $('.right').width();
canvas.height = window.innerHeight;
function drawBackground() {
  var image = new Image();
  image.onload = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(degrees * Math.PI / 180);
    ctx.drawImage(image, -image.width / 2, -image.height / 2);
    ctx.restore();
    degrees += 0.1;
    setTimeout(drawBackground, fps);
    //requestFrameAnimation(drawBackground);
  }
   image.src = "images/sunburst.png";
}
function drawCase() {
  var image = new Image();
  image.onload = function() {
    ctx.drawImage(image, canvas.width / 2 - image.width / 2, canvas.height / 2 - image.height / 2);
  }
  image.src = "images/case.png";
}
function drawOrder() {
  drawBackground();
}
drawOrder();
*/

function init() {
  loadGameState();
  caseInfo();
  backgroundCheck();
  drawCases();
  drawStackingUpgrades();
}
init();
})();
