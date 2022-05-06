// Copyright (c) 2020, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

import 'dart:async';
import 'dart:html';
import 'package:markdown/markdown.dart' as md;

import 'highlight.dart';

final markdownInput = querySelector('#markdown') as TextAreaElement;
final htmlDiv = querySelector('#html') as DivElement;
final versionSpan = querySelector('.version') as SpanElement;

final nullSanitizer = NullTreeSanitizer();
const typing = Duration(milliseconds: 10 /*150*/);
final introText = '''
## All GitHub Emoji Shortcodes

:-1:
:100:
:1234:
:1st_place_medal:
:2nd_place_medal:
:3rd_place_medal:
:8ball:
:a:
:ab:
:abacus:
:abc:
:abcd:
:accept:
:accordion:
:adhesive_bandage:
:adult:
:aerial_tramway:
:afghanistan:
:airplane:
:aland_islands:
:alarm_clock:
:albania:
:alembic:
:algeria:
:alien:
:ambulance:
:american_samoa:
:amphora:
:anatomical_heart:
:anchor:
:andorra:
:angel:
:anger:
:angola:
:angry:
:anguilla:
:anguished:
:ant:
:antarctica:
:antigua_barbuda:
:apple:
:aquarius:
:argentina:
:aries:
:armenia:
:arrow_backward:
:arrow_double_down:
:arrow_double_up:
:arrow_down:
:arrow_down_small:
:arrow_forward:
:arrow_heading_down:
:arrow_heading_up:
:arrow_left:
:arrow_lower_left:
:arrow_lower_right:
:arrow_right:
:arrow_right_hook:
:arrow_up:
:arrow_up_down:
:arrow_up_small:
:arrow_upper_left:
:arrow_upper_right:
:arrows_clockwise:
:arrows_counterclockwise:
:art:
:articulated_lorry:
:artificial_satellite:
:artist:
:aruba:
:ascension_island:
:asterisk:
:astonished:
:astronaut:
:athletic_shoe:
:atm:
:atom_symbol:
:australia:
:austria:
:auto_rickshaw:
:avocado:
:axe:
:azerbaijan:
:b:
:baby:
:baby_bottle:
:baby_chick:
:baby_symbol:
:back:
:bacon:
:badger:
:badminton:
:bagel:
:baggage_claim:
:baguette_bread:
:bahamas:
:bahrain:
:balance_scale:
:bald_man:
:bald_woman:
:ballet_shoes:
:balloon:
:ballot_box:
:ballot_box_with_check:
:bamboo:
:banana:
:bangbang:
:bangladesh:
:banjo:
:bank:
:bar_chart:
:barbados:
:barber:
:baseball:
:basket:
:basketball:
:basketball_man:
:basketball_woman:
:bat:
:bath:
:bathtub:
:battery:
:beach_umbrella:
:bear:
:bearded_person:
:beaver:
:bed:
:bee:
:beer:
:beers:
:beetle:
:beginner:
:belarus:
:belgium:
:belize:
:bell:
:bell_pepper:
:bellhop_bell:
:benin:
:bento:
:bermuda:
:beverage_box:
:bhutan:
:bicyclist:
:bike:
:biking_man:
:biking_woman:
:bikini:
:billed_cap:
:billed_hat:
:biohazard:
:bird:
:birthday:
:bison:
:black_cat:
:black_circle:
:black_flag:
:black_heart:
:black_joker:
:black_large_square:
:black_medium_small_square:
:black_medium_square:
:black_nib:
:black_small_square:
:black_square_button:
:blond_haired_man:
:blond_haired_person:
:blond_haired_woman:
:blonde_man:
:blonde_woman:
:blossom:
:blowfish:
:blue_book:
:blue_car:
:blue_heart:
:blue_square:
:blueberries:
:blush:
:boar:
:boat:
:bolivia:
:bomb:
:bone:
:book:
:bookmark:
:bookmark_tabs:
:books:
:boom:
:boomerang:
:boot:
:bosnia_herzegovina:
:botswana:
:bouncing_ball_man:
:bouncing_ball_person:
:bouncing_ball_woman:
:bouquet:
:bouvet_island:
:bow:
:bow_and_arrow:
:bowing_man:
:bowing_woman:
:bowl_with_spoon:
:bowling:
:boxing_glove:
:boy:
:brain:
:brazil:
:bread:
:breast_feeding:
:breastfeeding:
:brick:
:bricks:
:bride_with_veil:
:bridge_at_night:
:briefcase:
:british_indian_ocean_territory:
:british_virgin_islands:
:broccoli:
:broken_heart:
:broom:
:brown_circle:
:brown_heart:
:brown_square:
:brunei:
:bubble_tea:
:bucket:
:bug:
:building_construction:
:bulb:
:bulgaria:
:bullettrain_front:
:bullettrain_side:
:burkina_faso:
:burrito:
:burundi:
:bus:
:business_suit_levitating:
:busstop:
:bust_in_silhouette:
:busts_in_silhouette:
:butter:
:butterfly:
:cactus:
:cake:
:calendar:
:call_me_hand:
:calling:
:cambodia:
:camel:
:camera:
:camera_flash:
:cameroon:
:camping:
:canada:
:canary_islands:
:cancer:
:candle:
:candy:
:canned_food:
:canoe:
:cape_verde:
:capital_abcd:
:capricorn:
:car:
:card_file_box:
:card_index:
:card_index_dividers:
:caribbean_netherlands:
:carousel_horse:
:carpentry_saw:
:carrot:
:cartwheeling:
:cat:
:cat2:
:cayman_islands:
:cd:
:central_african_republic:
:ceuta_melilla:
:chad:
:chains:
:chair:
:champagne:
:chart:
:chart_with_downwards_trend:
:chart_with_upwards_trend:
:checkered_flag:
:cheese:
:cherries:
:cherry_blossom:
:chess_pawn:
:chestnut:
:chicken:
:child:
:children_crossing:
:chile:
:chipmunk:
:chocolate_bar:
:chopsticks:
:christmas_island:
:christmas_tree:
:church:
:cinema:
:circus_tent:
:city_sunrise:
:city_sunset:
:cityscape:
:cl:
:clamp:
:clap:
:clapper:
:classical_building:
:climbing:
:climbing_man:
:climbing_woman:
:clinking_glasses:
:clipboard:
:clipperton_island:
:clock1:
:clock10:
:clock1030:
:clock11:
:clock1130:
:clock12:
:clock1230:
:clock130:
:clock2:
:clock230:
:clock3:
:clock330:
:clock4:
:clock430:
:clock5:
:clock530:
:clock6:
:clock630:
:clock7:
:clock730:
:clock8:
:clock830:
:clock9:
:clock930:
:closed_book:
:closed_lock_with_key:
:closed_umbrella:
:cloud:
:cloud_with_lightning:
:cloud_with_lightning_and_rain:
:cloud_with_rain:
:cloud_with_snow:
:clown_face:
:clubs:
:cn:
:coat:
:cockroach:
:cocktail:
:coconut:
:cocos_islands:
:coffee:
:coffin:
:coin:
:cold:
:cold_face:
:cold_sweat:
:collision:
:colombia:
:comet:
:comoros:
:compass:
:computer:
:computer_mouse:
:confetti_ball:
:confounded:
:confused:
:congo_brazzaville:
:congo_kinshasa:
:congratulations:
:construction:
:construction_worker:
:construction_worker_man:
:construction_worker_woman:
:control_knobs:
:convenience_store:
:cook:
:cook_islands:
:cookie:
:cool:
:cop:
:copyright:
:corn:
:costa_rica:
:cote_divoire:
:couch_and_lamp:
:couple:
:couple_with_heart:
:couple_with_heart_man_man:
:couple_with_heart_woman_man:
:couple_with_heart_woman_woman:
:couplekiss:
:couplekiss_man_man:
:couplekiss_man_woman:
:couplekiss_woman_woman:
:cow:
:cow2:
:cowboy_hat_face:
:crab:
:crayon:
:credit_card:
:crescent_moon:
:cricket:
:cricket_game:
:croatia:
:crocodile:
:croissant:
:crossed_fingers:
:crossed_flags:
:crossed_swords:
:crown:
:cry:
:crying_cat_face:
:crystal_ball:
:cuba:
:cucumber:
:cup_with_straw:
:cupcake:
:cupid:
:curacao:
:curling_stone:
:curly_haired_man:
:curly_haired_woman:
:curly_loop:
:currency_exchange:
:curry:
:cursing_face:
:custard:
:customs:
:cut_of_meat:
:cyclone:
:cyprus:
:czech_republic:
:dagger:
:dancer:
:dancers:
:dancing_men:
:dancing_women:
:dango:
:dark_sunglasses:
:dart:
:dash:
:date:
:de:
:deaf_man:
:deaf_person:
:deaf_woman:
:deciduous_tree:
:deer:
:denmark:
:department_store:
:derelict_house:
:desert:
:desert_island:
:desktop_computer:
:detective:
:diamond_shape_with_a_dot_inside:
:diamonds:
:diego_garcia:
:disappointed:
:disappointed_relieved:
:disguised_face:
:diving_mask:
:diya_lamp:
:dizzy:
:dizzy_face:
:djibouti:
:dna:
:do_not_litter:
:dodo:
:dog:
:dog2:
:dollar:
:dolls:
:dolphin:
:dominica:
:dominican_republic:
:door:
:doughnut:
:dove:
:dragon:
:dragon_face:
:dress:
:dromedary_camel:
:drooling_face:
:drop_of_blood:
:droplet:
:drum:
:duck:
:dumpling:
:dvd:
:e-mail:
:eagle:
:ear:
:ear_of_rice:
:ear_with_hearing_aid:
:earth_africa:
:earth_americas:
:earth_asia:
:ecuador:
:egg:
:eggplant:
:egypt:
:eight:
:eight_pointed_black_star:
:eight_spoked_asterisk:
:eject_button:
:el_salvador:
:electric_plug:
:elephant:
:elevator:
:elf:
:elf_man:
:elf_woman:
:email:
:end:
:england:
:envelope:
:envelope_with_arrow:
:equatorial_guinea:
:eritrea:
:es:
:estonia:
:ethiopia:
:eu:
:euro:
:european_castle:
:european_post_office:
:european_union:
:evergreen_tree:
:exclamation:
:exploding_head:
:expressionless:
:eye:
:eye_speech_bubble:
:eyeglasses:
:eyes:
:face_exhaling:
:face_in_clouds:
:face_with_head_bandage:
:face_with_spiral_eyes:
:face_with_thermometer:
:facepalm:
:facepunch:
:factory:
:factory_worker:
:fairy:
:fairy_man:
:fairy_woman:
:falafel:
:falkland_islands:
:fallen_leaf:
:family:
:family_man_boy:
:family_man_boy_boy:
:family_man_girl:
:family_man_girl_boy:
:family_man_girl_girl:
:family_man_man_boy:
:family_man_man_boy_boy:
:family_man_man_girl:
:family_man_man_girl_boy:
:family_man_man_girl_girl:
:family_man_woman_boy:
:family_man_woman_boy_boy:
:family_man_woman_girl:
:family_man_woman_girl_boy:
:family_man_woman_girl_girl:
:family_woman_boy:
:family_woman_boy_boy:
:family_woman_girl:
:family_woman_girl_boy:
:family_woman_girl_girl:
:family_woman_woman_boy:
:family_woman_woman_boy_boy:
:family_woman_woman_girl:
:family_woman_woman_girl_boy:
:family_woman_woman_girl_girl:
:farmer:
:faroe_islands:
:fast_forward:
:fax:
:fearful:
:feather:
:feet:
:female_detective:
:female_sign:
:ferris_wheel:
:ferry:
:field_hockey:
:fiji:
:file_cabinet:
:file_folder:
:film_projector:
:film_strip:
:finland:
:fire:
:fire_engine:
:fire_extinguisher:
:firecracker:
:firefighter:
:fireworks:
:first_quarter_moon:
:first_quarter_moon_with_face:
:fish:
:fish_cake:
:fishing_pole_and_fish:
:fist:
:fist_left:
:fist_oncoming:
:fist_raised:
:fist_right:
:five:
:flags:
:flamingo:
:flashlight:
:flat_shoe:
:flatbread:
:fleur_de_lis:
:flight_arrival:
:flight_departure:
:flipper:
:floppy_disk:
:flower_playing_cards:
:flushed:
:fly:
:flying_disc:
:flying_saucer:
:fog:
:foggy:
:fondue:
:foot:
:football:
:footprints:
:fork_and_knife:
:fortune_cookie:
:fountain:
:fountain_pen:
:four:
:four_leaf_clover:
:fox_face:
:fr:
:framed_picture:
:free:
:french_guiana:
:french_polynesia:
:french_southern_territories:
:fried_egg:
:fried_shrimp:
:fries:
:frog:
:frowning:
:frowning_face:
:frowning_man:
:frowning_person:
:frowning_woman:
:fu:
:fuelpump:
:full_moon:
:full_moon_with_face:
:funeral_urn:
:gabon:
:gambia:
:game_die:
:garlic:
:gb:
:gear:
:gem:
:gemini:
:genie:
:genie_man:
:genie_woman:
:georgia:
:ghana:
:ghost:
:gibraltar:
:gift:
:gift_heart:
:giraffe:
:girl:
:globe_with_meridians:
:gloves:
:goal_net:
:goat:
:goggles:
:golf:
:golfing:
:golfing_man:
:golfing_woman:
:gorilla:
:grapes:
:grasshopper:
:greece:
:green_apple:
:green_book:
:green_circle:
:green_heart:
:green_salad:
:green_square:
:greenland:
:grenada:
:grey_exclamation:
:grey_question:
:grimacing:
:grin:
:grinning:
:guadeloupe:
:guam:
:guard:
:guardsman:
:guardswoman:
:guatemala:
:guernsey:
:guide_dog:
:guinea:
:guinea_bissau:
:guitar:
:gun:
:guyana:
:haircut:
:haircut_man:
:haircut_woman:
:haiti:
:hamburger:
:hammer:
:hammer_and_pick:
:hammer_and_wrench:
:hamster:
:hand:
:hand_over_mouth:
:handbag:
:handball_person:
:handshake:
:hankey:
:hash:
:hatched_chick:
:hatching_chick:
:headphones:
:headstone:
:health_worker:
:hear_no_evil:
:heard_mcdonald_islands:
:heart:
:heart_decoration:
:heart_eyes:
:heart_eyes_cat:
:heart_on_fire:
:heartbeat:
:heartpulse:
:hearts:
:heavy_check_mark:
:heavy_division_sign:
:heavy_dollar_sign:
:heavy_exclamation_mark:
:heavy_heart_exclamation:
:heavy_minus_sign:
:heavy_multiplication_x:
:heavy_plus_sign:
:hedgehog:
:helicopter:
:herb:
:hibiscus:
:high_brightness:
:high_heel:
:hiking_boot:
:hindu_temple:
:hippopotamus:
:hocho:
:hole:
:honduras:
:honey_pot:
:honeybee:
:hong_kong:
:hook:
:horse:
:horse_racing:
:hospital:
:hot:
:hot_face:
:hot_pepper:
:hotdog:
:hotel:
:hotsprings:
:hourglass:
:hourglass_flowing_sand:
:house:
:house_with_garden:
:houses:
:hugs:
:hungary:
:hushed:
:hut:
:ice_cream:
:ice_cube:
:ice_hockey:
:ice_skate:
:icecream:
:iceland:
:id:
:ideograph_advantage:
:imp:
:inbox_tray:
:incoming_envelope:
:india:
:indonesia:
:infinity:
:information_desk_person:
:information_source:
:innocent:
:interrobang:
:iphone:
:iran:
:iraq:
:ireland:
:isle_of_man:
:israel:
:it:
:izakaya_lantern:
:jack_o_lantern:
:jamaica:
:japan:
:japanese_castle:
:japanese_goblin:
:japanese_ogre:
:jeans:
:jersey:
:jigsaw:
:jordan:
:joy:
:joy_cat:
:joystick:
:jp:
:judge:
:juggling_person:
:kaaba:
:kangaroo:
:kazakhstan:
:kenya:
:key:
:keyboard:
:keycap_ten:
:kick_scooter:
:kimono:
:kiribati:
:kiss:
:kissing:
:kissing_cat:
:kissing_closed_eyes:
:kissing_heart:
:kissing_smiling_eyes:
:kite:
:kiwi_fruit:
:kneeling_man:
:kneeling_person:
:kneeling_woman:
:knife:
:knot:
:koala:
:koko:
:kosovo:
:kr:
:kuwait:
:kyrgyzstan:
:lab_coat:
:labcoat:
:label:
:lacrosse:
:ladder:
:lady_beetle:
:lantern:
:laos:
:large_blue_circle:
:large_blue_diamond:
:large_orange_diamond:
:last_quarter_moon:
:last_quarter_moon_with_face:
:latin_cross:
:latvia:
:laughing:
:leafy_green:
:leafy_greens:
:leaves:
:lebanon:
:ledger:
:left_luggage:
:left_right_arrow:
:left_speech_bubble:
:leftwards_arrow_with_hook:
:leg:
:lemon:
:leo:
:leopard:
:lesotho:
:level_slider:
:liberia:
:libra:
:libya:
:liechtenstein:
:light_rail:
:link:
:lion:
:lips:
:lipstick:
:lithuania:
:lizard:
:llama:
:lobster:
:lock:
:lock_with_ink_pen:
:lollipop:
:long_drum:
:loop:
:lotion_bottle:
:lotus_position:
:lotus_position_man:
:lotus_position_woman:
:loud_sound:
:loudspeaker:
:love_hotel:
:love_letter:
:love_you:
:love_you_gesture:
:low_brightness:
:luggage:
:lungs:
:luxembourg:
:lying_face:
:m:
:macau:
:macedonia:
:madagascar:
:mag:
:mag_right:
:mage:
:mage_man:
:mage_woman:
:magic_wand:
:magnet:
:mahjong:
:mailbox:
:mailbox_closed:
:mailbox_with_mail:
:mailbox_with_no_mail:
:malawi:
:malaysia:
:maldives:
:male_detective:
:male_sign:
:mali:
:malta:
:mammoth:
:man:
:man_artist:
:man_astronaut:
:man_beard:
:man_cartwheeling:
:man_cook:
:man_dancing:
:man_elf:
:man_facepalming:
:man_factory_worker:
:man_fairy:
:man_farmer:
:man_feeding_baby:
:man_firefighter:
:man_genie:
:man_health_worker:
:man_in_lotus_position:
:man_in_manual_wheelchair:
:man_in_motorized_wheelchair:
:man_in_steamy_room:
:man_in_tuxedo:
:man_judge:
:man_juggling:
:man_mechanic:
:man_office_worker:
:man_pilot:
:man_playing_handball:
:man_playing_water_polo:
:man_scientist:
:man_shrugging:
:man_singer:
:man_student:
:man_superhero:
:man_supervillain:
:man_teacher:
:man_technologist:
:man_vampire:
:man_with_gua_pi_mao:
:man_with_probing_cane:
:man_with_turban:
:man_with_veil:
:man_zombie:
:mandarin:
:mango:
:mans_shoe:
:mantelpiece_clock:
:manual_wheelchair:
:maple_leaf:
:marshall_islands:
:martial_arts_uniform:
:martinique:
:mask:
:massage:
:massage_man:
:massage_woman:
:mate:
:mauritania:
:mauritius:
:mayotte:
:meat_on_bone:
:mechanic:
:mechanical_arm:
:mechanical_leg:
:medal_military:
:medal_sports:
:medical_symbol:
:mega:
:melon:
:memo:
:men_wrestling:
:mending_heart:
:menorah:
:mens:
:mermaid:
:merman:
:merperson:
:metal:
:metro:
:mexico:
:microbe:
:micronesia:
:microphone:
:microscope:
:middle_finger:
:military_helmet:
:milk_glass:
:milky_way:
:minibus:
:minidisc:
:mirror:
:mobile_phone_off:
:moldova:
:monaco:
:money_mouth_face:
:money_with_wings:
:moneybag:
:mongolia:
:monkey:
:monkey_face:
:monocle:
:monocle_face:
:monorail:
:montenegro:
:montserrat:
:moon:
:moon_cake:
:morocco:
:mortar_board:
:mosque:
:mosquito:
:motor_boat:
:motor_scooter:
:motorcycle:
:motorized_wheelchair:
:motorway:
:mount_fuji:
:mountain:
:mountain_bicyclist:
:mountain_biking_man:
:mountain_biking_woman:
:mountain_cableway:
:mountain_railway:
:mountain_snow:
:mouse:
:mouse2:
:mouse_trap:
:movie_camera:
:moyai:
:mozambique:
:mrs_claus:
:muscle:
:mushroom:
:musical_keyboard:
:musical_note:
:musical_score:
:mute:
:mx_claus:
:myanmar:
:nail_care:
:name_badge:
:namibia:
:national_park:
:nauru:
:nauseated_face:
:nazar_amulet:
:necktie:
:negative_squared_cross_mark:
:nepal:
:nerd_face:
:nesting_dolls:
:netherlands:
:neutral_face:
:new:
:new_caledonia:
:new_moon:
:new_moon_with_face:
:new_zealand:
:newspaper:
:newspaper_roll:
:next_track_button:
:ng:
:ng_man:
:ng_woman:
:nicaragua:
:niger:
:nigeria:
:night_with_stars:
:nine:
:ninja:
:niue:
:no_bell:
:no_bicycles:
:no_entry:
:no_entry_sign:
:no_good:
:no_good_man:
:no_good_woman:
:no_mobile_phones:
:no_mouth:
:no_pedestrians:
:no_smoking:
:non-potable_water:
:norfolk_island:
:north_korea:
:northern_mariana_islands:
:norway:
:nose:
:notebook:
:notebook_with_decorative_cover:
:notes:
:nut_and_bolt:
:o:
:o2:
:ocean:
:octopus:
:oden:
:office:
:office_worker:
:oil_drum:
:ok:
:ok_hand:
:ok_man:
:ok_person:
:ok_woman:
:old_key:
:older_adult:
:older_man:
:older_woman:
:olive:
:om:
:oman:
:on:
:oncoming_automobile:
:oncoming_bus:
:oncoming_police_car:
:oncoming_taxi:
:one:
:one_piece_swimsuit:
:onion:
:open_book:
:open_file_folder:
:open_hands:
:open_mouth:
:open_umbrella:
:ophiuchus:
:orange:
:orange_book:
:orange_circle:
:orange_heart:
:orange_square:
:orangutan:
:orthodox_cross:
:otter:
:outbox_tray:
:owl:
:ox:
:oyster:
:package:
:page_facing_up:
:page_with_curl:
:pager:
:paintbrush:
:pakistan:
:palau:
:palestinian_territories:
:palm_tree:
:palms_up:
:palms_up_together:
:panama:
:pancakes:
:panda_face:
:paperclip:
:paperclips:
:papua_new_guinea:
:parachute:
:paraguay:
:parasol_on_ground:
:parking:
:parrot:
:part_alternation_mark:
:partly_sunny:
:partying:
:partying_face:
:passenger_ship:
:passport_control:
:pause_button:
:paw_prints:
:peace_symbol:
:peach:
:peacock:
:peanuts:
:pear:
:pen:
:pencil:
:pencil2:
:penguin:
:pensive:
:people_holding_hands:
:people_hugging:
:performing_arts:
:persevere:
:person_bald:
:person_curly_hair:
:person_feeding_baby:
:person_fencing:
:person_in_manual_wheelchair:
:person_in_motorized_wheelchair:
:person_in_tuxedo:
:person_red_hair:
:person_white_hair:
:person_with_probing_cane:
:person_with_turban:
:person_with_veil:
:peru:
:petri_dish:
:philippines:
:phone:
:pick:
:pickup_truck:
:pie:
:pig:
:pig2:
:pig_nose:
:pill:
:pilot:
:pinata:
:pinched_fingers:
:pinching_hand:
:pineapple:
:ping_pong:
:pirate_flag:
:pisces:
:pitcairn_islands:
:pizza:
:placard:
:place_of_worship:
:plate_with_cutlery:
:play_or_pause_button:
:pleading:
:pleading_face:
:plunger:
:point_down:
:point_left:
:point_right:
:point_up:
:point_up_2:
:poland:
:polar_bear:
:police_car:
:police_officer:
:policeman:
:policewoman:
:poodle:
:poop:
:popcorn:
:portugal:
:post_office:
:postal_horn:
:postbox:
:potable_water:
:potato:
:potted_plant:
:pouch:
:poultry_leg:
:pound:
:pout:
:pouting_cat:
:pouting_face:
:pouting_man:
:pouting_woman:
:pray:
:prayer_beads:
:pregnant_woman:
:pretzel:
:previous_track_button:
:prince:
:princess:
:printer:
:probing_cane:
:puerto_rico:
:punch:
:purple_circle:
:purple_heart:
:purple_square:
:purse:
:pushpin:
:put_litter_in_its_place:
:qatar:
:question:
:rabbit:
:rabbit2:
:raccoon:
:racehorse:
:racing_car:
:radio:
:radio_button:
:radioactive:
:rage:
:railway_car:
:railway_track:
:rainbow:
:rainbow_flag:
:raised_back_of_hand:
:raised_eyebrow:
:raised_hand:
:raised_hand_with_fingers_splayed:
:raised_hands:
:raising_hand:
:raising_hand_man:
:raising_hand_woman:
:ram:
:ramen:
:rat:
:razor:
:receipt:
:record_button:
:recycle:
:red_car:
:red_circle:
:red_envelope:
:red_haired_man:
:red_haired_woman:
:red_square:
:registered:
:relaxed:
:relieved:
:reminder_ribbon:
:repeat:
:repeat_one:
:rescue_worker_helmet:
:restroom:
:reunion:
:revolving_hearts:
:rewind:
:rhinoceros:
:ribbon:
:rice:
:rice_ball:
:rice_cracker:
:rice_scene:
:right_anger_bubble:
:ring:
:ringed_planet:
:robot:
:rock:
:rocket:
:rofl:
:roll_eyes:
:roll_of_paper:
:roller_coaster:
:roller_skate:
:romania:
:rooster:
:rose:
:rosette:
:rotating_light:
:round_pushpin:
:rowboat:
:rowing_man:
:rowing_woman:
:ru:
:rugby_football:
:runner:
:running:
:running_man:
:running_shirt_with_sash:
:running_woman:
:rwanda:
:sa:
:safety_pin:
:safety_vest:
:sagittarius:
:sailboat:
:sake:
:salt:
:samoa:
:san_marino:
:sandal:
:sandwich:
:santa:
:sao_tome_principe:
:sari:
:sassy_man:
:sassy_woman:
:satellite:
:satisfied:
:saudi_arabia:
:sauna_man:
:sauna_person:
:sauna_woman:
:sauropod:
:saxophone:
:scarf:
:school:
:school_satchel:
:scientist:
:scissors:
:scorpion:
:scorpius:
:scotland:
:scream:
:scream_cat:
:screwdriver:
:scroll:
:seal:
:seat:
:secret:
:see_no_evil:
:seedling:
:selfie:
:senegal:
:serbia:
:service_dog:
:seven:
:sewing_needle:
:seychelles:
:shallow_pan_of_food:
:shamrock:
:shark:
:shaved_ice:
:sheep:
:shell:
:shield:
:shinto_shrine:
:ship:
:shirt:
:shit:
:shoe:
:shopping:
:shopping_cart:
:shorts:
:shower:
:shrimp:
:shrug:
:shushing:
:shushing_face:
:sierra_leone:
:signal_strength:
:singapore:
:singer:
:sint_maarten:
:six:
:six_pointed_star:
:skateboard:
:ski:
:skier:
:skull:
:skull_and_crossbones:
:skunk:
:sled:
:sleeping:
:sleeping_bed:
:sleepy:
:slightly_frowning_face:
:slightly_smiling_face:
:slot_machine:
:sloth:
:slovakia:
:slovenia:
:small_airplane:
:small_blue_diamond:
:small_orange_diamond:
:small_red_triangle:
:small_red_triangle_down:
:smile:
:smile_cat:
:smiley:
:smiley_cat:
:smiling_face_with_tear:
:smiling_face_with_three_hearts:
:smiling_imp:
:smirk:
:smirk_cat:
:smoking:
:snail:
:snake:
:sneezing_face:
:snowboarder:
:snowflake:
:snowman:
:snowman_with_snow:
:soap:
:sob:
:soccer:
:socks:
:softball:
:solomon_islands:
:somalia:
:soon:
:sorceress:
:sos:
:sound:
:south_africa:
:south_georgia_south_sandwich_islands:
:south_sudan:
:space_invader:
:spades:
:spaghetti:
:sparkle:
:sparkler:
:sparkles:
:sparkling_heart:
:speak_no_evil:
:speaker:
:speaking_head:
:speech_balloon:
:speedboat:
:spider:
:spider_web:
:spiral_calendar:
:spiral_notepad:
:sponge:
:spoon:
:squid:
:sri_lanka:
:st_barthelemy:
:st_helena:
:st_kitts_nevis:
:st_lucia:
:st_martin:
:st_pierre_miquelon:
:st_vincent_grenadines:
:stadium:
:standing_man:
:standing_person:
:standing_woman:
:star:
:star2:
:star_and_crescent:
:star_of_david:
:star_struck:
:stars:
:station:
:statue_of_liberty:
:steak:
:steam_locomotive:
:stethoscope:
:stew:
:stop_button:
:stop_sign:
:stopwatch:
:straight_ruler:
:strawberry:
:stuck_out_tongue:
:stuck_out_tongue_closed_eyes:
:stuck_out_tongue_winking_eye:
:student:
:studio_microphone:
:stuffed_flatbread:
:sudan:
:sun_behind_large_cloud:
:sun_behind_rain_cloud:
:sun_behind_small_cloud:
:sun_with_face:
:sunflower:
:sunglasses:
:sunny:
:sunrise:
:sunrise_over_mountains:
:superhero:
:superhero_man:
:superhero_woman:
:supervillain:
:supervillain_man:
:supervillain_woman:
:surfer:
:surfing_man:
:surfing_woman:
:suriname:
:sushi:
:suspension_railway:
:svalbard_jan_mayen:
:swan:
:swaziland:
:sweat:
:sweat_drops:
:sweat_smile:
:sweden:
:sweet_potato:
:swim_brief:
:swimmer:
:swimming_man:
:swimming_woman:
:switzerland:
:symbols:
:symbols_over_mouth:
:synagogue:
:syria:
:syringe:
:t-rex:
:taco:
:tada:
:taiwan:
:tajikistan:
:takeout_box:
:tamale:
:tanabata_tree:
:tangerine:
:tanzania:
:taurus:
:taxi:
:tea:
:teacher:
:teapot:
:technologist:
:teddy_bear:
:telephone:
:telephone_receiver:
:telescope:
:tennis:
:tent:
:test_tube:
:thailand:
:thermometer:
:thinking:
:thong_sandal:
:thought_balloon:
:thread:
:three:
:thumbsdown:
:thumbsup:
:ticket:
:tickets:
:tiger:
:tiger2:
:timer_clock:
:timor_leste:
:tipping_hand_man:
:tipping_hand_person:
:tipping_hand_woman:
:tired_face:
:tm:
:togo:
:toilet:
:toilet_paper:
:tokelau:
:tokyo_tower:
:tomato:
:tonga:
:tongue:
:toolbox:
:tooth:
:toothbrush:
:top:
:tophat:
:tornado:
:tr:
:trackball:
:tractor:
:traffic_light:
:train:
:train2:
:tram:
:transgender_flag:
:transgender_symbol:
:triangular_flag_on_post:
:triangular_ruler:
:trident:
:trinidad_tobago:
:tristan_da_cunha:
:triumph:
:trolleybus:
:trophy:
:tropical_drink:
:tropical_fish:
:truck:
:trumpet:
:tshirt:
:tulip:
:tumbler_glass:
:tunisia:
:turkey:
:turkmenistan:
:turks_caicos_islands:
:turtle:
:tuvalu:
:tv:
:twisted_rightwards_arrows:
:two:
:two_hearts:
:two_men_holding_hands:
:two_women_holding_hands:
:u5272:
:u5408:
:u55b6:
:u6307:
:u6708:
:u6709:
:u6e80:
:u7121:
:u7533:
:u7981:
:u7a7a:
:uganda:
:uk:
:ukraine:
:umbrella:
:unamused:
:underage:
:unicorn:
:united_arab_emirates:
:united_nations:
:unlock:
:up:
:upside_down_face:
:uruguay:
:us:
:us_outlying_islands:
:us_virgin_islands:
:uzbekistan:
:v:
:vampire:
:vampire_man:
:vampire_woman:
:vanuatu:
:vatican_city:
:venezuela:
:vertical_traffic_light:
:vhs:
:vibration_mode:
:video_camera:
:video_game:
:vietnam:
:violin:
:virgo:
:volcano:
:volleyball:
:vomiting:
:vomiting_face:
:vs:
:vulcan_salute:
:waffle:
:wales:
:walking:
:walking_man:
:walking_woman:
:wallis_futuna:
:waning_crescent_moon:
:waning_gibbous_moon:
:warning:
:wastebasket:
:watch:
:water_buffalo:
:water_polo:
:watermelon:
:wave:
:wavy_dash:
:waxing_crescent_moon:
:waxing_gibbous_moon:
:wc:
:weary:
:wedding:
:weight_lifting:
:weight_lifting_man:
:weight_lifting_woman:
:western_sahara:
:whale:
:whale2:
:wheel_of_dharma:
:wheelchair:
:white_check_mark:
:white_circle:
:white_flag:
:white_flower:
:white_haired_man:
:white_haired_woman:
:white_heart:
:white_large_square:
:white_medium_small_square:
:white_medium_square:
:white_small_square:
:white_square_button:
:wilted_flower:
:wind_chime:
:wind_face:
:window:
:wine_glass:
:wink:
:wizard:
:wolf:
:woman:
:woman_artist:
:woman_astronaut:
:woman_beard:
:woman_cartwheeling:
:woman_cook:
:woman_dancing:
:woman_elf:
:woman_facepalming:
:woman_factory_worker:
:woman_fairy:
:woman_farmer:
:woman_feeding_baby:
:woman_firefighter:
:woman_genie:
:woman_health_worker:
:woman_in_lotus_position:
:woman_in_manual_wheelchair:
:woman_in_motorized_wheelchair:
:woman_in_steamy_room:
:woman_in_tuxedo:
:woman_judge:
:woman_juggling:
:woman_mechanic:
:woman_office_worker:
:woman_pilot:
:woman_playing_handball:
:woman_playing_water_polo:
:woman_scientist:
:woman_shrugging:
:woman_singer:
:woman_student:
:woman_superhero:
:woman_supervillain:
:woman_teacher:
:woman_technologist:
:woman_vampire:
:woman_with_headscarf:
:woman_with_probing_cane:
:woman_with_turban:
:woman_with_veil:
:woman_zombie:
:womans_clothes:
:womans_hat:
:women_wrestling:
:womens:
:wood:
:woozy:
:woozy_face:
:world_map:
:worm:
:worried:
:wrench:
:wrestling:
:writing_hand:
:x:
:yarn:
:yawning_face:
:yellow_circle:
:yellow_heart:
:yellow_square:
:yemen:
:yen:
:yin_yang:
:yo_yo:
:yum:
:zambia:
:zany:
:zany_face:
:zap:
:zebra:
:zero:
:zimbabwe:
:zipper_mouth_face:
:zombie:
:zombie_man:
:zombie_woman:
:zzz:
''';

// Flavor support.
final basicRadio = querySelector('#basic-radio') as HtmlElement;
final commonmarkRadio = querySelector('#commonmark-radio') as HtmlElement;
final gfmRadio = querySelector('#gfm-radio') as HtmlElement;
md.ExtensionSet? extensionSet;

final extensionSets = {
  'basic-radio': md.ExtensionSet.none,
  'commonmark-radio': md.ExtensionSet.commonMark,
  'gfm-radio': md.ExtensionSet.gitHubWeb,
};

void main() {
  versionSpan.text = 'v${md.version}';
  markdownInput.onKeyUp.listen(_renderMarkdown);

  final savedMarkdown = window.localStorage['markdown'];

  if (savedMarkdown != null &&
      savedMarkdown.isNotEmpty &&
      savedMarkdown != introText) {
    markdownInput.value = savedMarkdown;
    markdownInput.focus();
    _renderMarkdown();
  } else {
    _typeItOut(introText, 40082);  // get it all there instantly
  }

  // GitHub is the default extension set.
  gfmRadio.attributes['checked'] = '';
  gfmRadio.querySelector('.glyph')!.text = 'radio_button_checked';
  extensionSet = extensionSets[gfmRadio.id];
  _renderMarkdown();

  basicRadio.onClick.listen(_switchFlavor);
  commonmarkRadio.onClick.listen(_switchFlavor);
  gfmRadio.onClick.listen(_switchFlavor);
}

void _renderMarkdown([Event? event]) {
  final markdown = markdownInput.value!;

  htmlDiv.setInnerHtml(
    md.markdownToHtml(markdown, extensionSet: extensionSet),
    treeSanitizer: nullSanitizer,
  );

  for (final block in htmlDiv.querySelectorAll('pre code')) {
    try {
      highlightElement(block);
    } catch (e) {
      window.console.error('Error highlighting markdown:');
      window.console.error(e);
    }
  }

  if (event != null) {
    // Not simulated typing. Store it.
    window.localStorage['markdown'] = markdown;
  }
}

void _typeItOut(String msg, int pos) {
  late Timer timer;
  markdownInput.onKeyUp.listen((_) {
    timer.cancel();
  });
  void addCharacter() {
    if (pos > msg.length) {
      return;
    }
    markdownInput.value = msg.substring(0, pos);
    markdownInput.focus();
    _renderMarkdown();
    pos++;
    timer = Timer(typing, addCharacter);
  }

  timer = Timer(typing, addCharacter);
}

void _switchFlavor(Event e) {
  final target = e.currentTarget as HtmlElement;
  if (!target.attributes.containsKey('checked')) {
    if (basicRadio != target) {
      basicRadio.attributes.remove('checked');
      basicRadio.querySelector('.glyph')!.text = 'radio_button_unchecked';
    }
    if (commonmarkRadio != target) {
      commonmarkRadio.attributes.remove('checked');
      commonmarkRadio.querySelector('.glyph')!.text = 'radio_button_unchecked';
    }
    if (gfmRadio != target) {
      gfmRadio.attributes.remove('checked');
      gfmRadio.querySelector('.glyph')!.text = 'radio_button_unchecked';
    }

    target.attributes['checked'] = '';
    target.querySelector('.glyph')!.text = 'radio_button_checked';
    extensionSet = extensionSets[target.id];
    _renderMarkdown();
  }
}

class NullTreeSanitizer implements NodeTreeSanitizer {
  @override
  void sanitizeTree(Node node) {}
}
