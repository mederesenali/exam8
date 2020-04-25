package com.example.exam8;

import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

import java.util.logging.Logger;

@SpringBootApplication
public class Exam8Application {

    @Bean
    public RestTemplate getRestTemplate(){
        return new RestTemplate();
    }


        public static void main (String[]args){
            SpringApplication.run(Exam8Application.class, args);
        }

    }
