package com.ashutosh.medicine.controller;

import com.ashutosh.medicine.dto.InventoryResponse;
import com.ashutosh.medicine.service.InventoryService;
import org.springframework.web.bind.annotation.*;
import com.ashutosh.medicine.entity.Inventory;
import java.util.Optional;
import java.util.List;

@RestController
@RequestMapping("/api/inventory")
public class InventoryController {

    private final InventoryService inventoryService;

    public InventoryController(InventoryService inventoryService) {
        this.inventoryService = inventoryService;
    }

    @GetMapping("/medicine/{name}")
    public List<InventoryResponse> getMedicineAvailability(
            @PathVariable String name) {

        return inventoryService.getInventoryByMedicine(name);
    }

    // ===========================
// GET ALL INVENTORY
// ===========================
    @GetMapping
    public List<Inventory> getAllInventory() {

        return inventoryService.getAllInventory();

    }

    // ===========================
// GET INVENTORY BY ID
// ===========================
    @GetMapping("/{id}")
    public Optional<Inventory> getInventoryById(

            @PathVariable Long id

    ) {

        return inventoryService.getInventoryById(id);

    }

    // ===========================
// ADD INVENTORY
// ===========================
    @PostMapping
    public Inventory addInventory(

            @RequestBody Inventory inventory

    ) {

        return inventoryService.saveInventory(inventory);

    }

    // ===========================
// UPDATE INVENTORY
// ===========================
    @PutMapping("/{id}")
    public Inventory updateInventory(

            @PathVariable Long id,

            @RequestBody Inventory inventory

    ) {

        inventory.setId(id);

        return inventoryService.saveInventory(inventory);

    }

    // ===========================
// DELETE INVENTORY
// ===========================
    @DeleteMapping("/{id}")
    public void deleteInventory(

            @PathVariable Long id

    ) {

        inventoryService.deleteInventory(id);

    }

}