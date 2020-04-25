package com.example.exam8;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
public class Controller  {
    @Autowired
    RestTemplate restTemplate;


    @RequestMapping(value = { "/index","/" }, method = RequestMethod.GET)
    public String index(Model model) {
        return "index";
    }


    @GetMapping("/country")
    public String country(@RequestParam String name){
        Country country=restTemplate.getForObject("https://restcountries.eu/rest/v2/name/{name}",Country.class);
        return country.getName()+"\n"+
                country.getCapital()+"\n"+
                country.getRegion()+"\n"+
                country.getCurrencies();
    }



}

