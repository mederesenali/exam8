package com.example.exam8;

import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class CallRestService {
    private static void callRestService(){
        RestTemplate restTemplate=new RestTemplate();
        Country country=restTemplate.getForObject("https://restcountries.eu/rest/v2/name",Country.class);
        System.out.println("Country name:"+country.getName());
    }
}
