package com.ashutosh.medicine.util;

import com.opencsv.CSVReader;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.InputStreamReader;
import java.util.List;

@Component
public class CsvReaderUtil {

    public List<String[]> readCsv(String fileName) {

        try {
            ClassPathResource resource = new ClassPathResource("data/" + fileName);

            CSVReader reader = new CSVReader(
                    new InputStreamReader(resource.getInputStream())
            );

            return reader.readAll();

        } catch (Exception e) {
            throw new RuntimeException("Unable to read CSV file: " + fileName, e);
        }

    }

}
