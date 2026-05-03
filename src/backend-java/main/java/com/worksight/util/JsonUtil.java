package com.worksight.util;

public class JsonUtil {
    public static String toJson(String key, String value) {
        return "{\"" + key + "\":\"" + value + "\"}";
    }
}