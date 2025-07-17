async function categories() {
    const categorie_url = `https://www.themealdb.com/api/json/v1/1/categories.php`;
    const category_res = await fetch(categorie_url);
    console.log(category_res)
    const categorie_data = await category_res.json();
    console.log(categorie_data)

    const category_size = categorie_data.categories.length;
    console.log(category_size);

    for(let c=0;c<category_size;c++){
        const category_title = categorie_data.categories[c].strCategory;
        const category_des = categorie_data.categories[c].strCategoryDescription;
        const category_image = categorie_data.categories[c].strCategoryThum;

        const category_main = document.getElementsByClassName("category_area")[0];
        const new_card = document.createElement('div');
        new_card.className = 'card';
        const card_body = document.createElement('div');
        card_body.className = 'card_body';
        const card_body_title = document.createElement("p");
        card_body_title.className = 'card_body_title';
        card_body_title.textContent = category_title;
        const card_body_des = document.createElement("p");
        card_body_des.className = 'card_body_des';
        card_body_des.textContent = category_des;
        const card_button = document.createElement("button");
        card_button.className = 'card_button';
        card_button.id = category_title;
        console.log(card_button.id);
        card_button.textContent = "See Items";
        card_body_des.textContent = category_des;
        const cat_img = document.createElement("img");
        cat_img.src = categorie_data.categories[c].strCategoryThumb;
        cat_img.alt = "Category Image";
        cat_img.className = "cat_img";
        const black_area = document.createElement('div');
        black_area.className = 'black_area';
        const black_area_P = document.createElement('p');
        black_area_P.textContent = category_title;

        category_main.appendChild(new_card);
        new_card.appendChild(card_body);
        card_body.appendChild(card_body_title);
        card_body.appendChild(card_body_des);
        card_body.appendChild(card_button);
        new_card.appendChild(cat_img);
        new_card.appendChild(black_area);
        black_area.appendChild(black_area_P);
        card_button.onclick = function () {
    window.location.href = `list.html?category=${encodeURIComponent(this.id)}`;
};
    }
}
categories()

function showElements() {
    const recipeMain = document.getElementsByClassName("recipe_main")[0];
    const recipeImage = document.getElementsByClassName("recipe_image_main")[0];
    const recipeDetail = document.getElementsByClassName("detail_cecipe")[0];
    recipeMain.classList.remove("main_hide");
    setTimeout(() => {
        recipeImage.classList.remove("hide_img");
    }, 2000);
    setTimeout(() => {
        recipeDetail.classList.remove("hide_recipe");
    }, 1500);
}


async function searchByName() {
    const meal_parent = document.getElementsByClassName("searchbar")[0];
    const meal_name = meal_parent.value;

    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${meal_name}`;
    const res = await fetch(url);
    console.log(res);
    const data = await res.json();
    console.log(data);

    const meal = data.meals[0]; 

    const ing_title = document.getElementsByClassName("ins_title")[0];
    ing_title.innerText = "Ingredients";
    const ins_title = document.getElementsByClassName("ing_title")[0];
    ins_title.innerText = "Instructions";

    const instruction = document.getElementsByClassName("ins")[0];
    const ins = meal.strInstructions;
    instruction.innerText = ins;

    const vdo_btn = document.getElementsByClassName("tutorial_buttton")[0];
    vdo_btn.classList.remove("btn_hide");

    const table = document.getElementsByClassName("ingredients-table")[0];

    for(let i = 0;i<20;i++){
        const ingredient = meal[`strIngredient${i}`];
        const count = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== "") {
            const tr = document.createElement("tr");
            const count_td = document.createElement("td");
            const ing_td = document.createElement("td");
            count_td.innerText = count;
            ing_td.innerText = ingredient;
            table.appendChild(tr);
            tr.appendChild(ing_td)
            tr.appendChild(count_td)
        }
    }

    const img = document.getElementById("thumb");
    img.src = meal.strMealThumb;
    const res_name = document.getElementsByClassName("rec_name")[0];
    const ret_cat = document.getElementsByClassName("recip_cat")[0];
    const res_area = document.getElementsByClassName("rec_area")[0];
    res_area.innerText = meal.strArea;
    ret_cat.innerText = meal.strCategory;
    res_name.innerText = meal.strMeal;
    const link = document.getElementsByClassName("tutorial")[0];
    link.href = meal.strYoutube;

    showElements()
}
async function filter(cat_name) {
    const filterUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(cat_name)}`;
    const res3 = await fetch(filterUrl);
    console.log(res3)
    data3 = await res3.json();
    console.log(data3);

    const fil_data = data3.meals;
    const length = fil_data.length;
    const filter_parent = document.getElementsByClassName("filter_main")[0];
    for(let a = 0;a<length;a++){
        const item = fil_data[a];
        const new_meal = document.createElement("div");
        new_meal.classList.add("filter_element");
        const filter_img_div = document.createElement("div");
        filter_img_div.classList.add("filter_img_div");
        const filter_img = document.createElement("img");
        filter_img.src = item.strMealThumb;
        const meal_name = document.createElement("p");
        meal_name.classList.add("filter_name");
        meal_name.textContent = item.strMeal;
        const filter_button = document.createElement("div");
    
        const find_from_filter = document.createElement("button");
        find_from_filter.classList.add("find_from_filter");
        find_from_filter.id = item.strMeal;
        find_from_filter.textContent = "View Recipe";
        filter_parent.appendChild(new_meal);
        new_meal.appendChild(filter_img_div);
        new_meal.appendChild(meal_name);
        new_meal.appendChild(filter_button);
        filter_img_div.appendChild(filter_img);
        filter_button.appendChild(find_from_filter)
        find_from_filter.onclick = function() {
        window.open(`home.html?meal=${encodeURIComponent(this.id)}`, "_blank");
        };
    }
    


}

window.addEventListener("load", () => {
  const params = new URLSearchParams(window.location.search);
  
  const category = params.get('category');
  if (category) {
    filter(category);
  }
  
  const mealName = params.get('meal');
  if (mealName) {
    searchByName_filter(mealName);  // call with mealName parameter
  }
});



async function searchByName_filter(search_meal) {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search_meal}`;
    const res = await fetch(url);
    console.log(res);
    const data = await res.json();
    console.log(data);

    const meal = data.meals[0]; 

    const ing_title = document.getElementsByClassName("ins_title")[0];
    ing_title.innerText = "Ingredients";
    const ins_title = document.getElementsByClassName("ing_title")[0];
    ins_title.innerText = "Instructions";

    const instruction = document.getElementsByClassName("ins")[0];
    const ins = meal.strInstructions;
    instruction.innerText = ins;

    const vdo_btn = document.getElementsByClassName("tutorial_buttton")[0];
    vdo_btn.classList.remove("btn_hide");

    const table = document.getElementsByClassName("ingredients-table")[0];

    for(let i = 0;i<20;i++){
        const ingredient = meal[`strIngredient${i}`];
        const count = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== "") {
            const tr = document.createElement("tr");
            const count_td = document.createElement("td");
            const ing_td = document.createElement("td");
            count_td.innerText = count;
            ing_td.innerText = ingredient;
            table.appendChild(tr);
            tr.appendChild(ing_td)
            tr.appendChild(count_td)
        }
    }

    const img = document.getElementById("thumb");
    img.src = meal.strMealThumb;
    const res_name = document.getElementsByClassName("rec_name")[0];
    const ret_cat = document.getElementsByClassName("recip_cat")[0];
    const res_area = document.getElementsByClassName("rec_area")[0];
    res_area.innerText = meal.strArea;
    ret_cat.innerText = meal.strCategory;
    res_name.innerText = meal.strMeal;
    const link = document.getElementsByClassName("tutorial")[0];
    link.href = meal.strYoutube;

    showElements()
}