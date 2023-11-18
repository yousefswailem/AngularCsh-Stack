using AngularC_.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Table.Models;

namespace Table.Controllers
{
  [Authorize]
  [EnableCors("AllowAngularApp")]
  [Route("api/products")]
  [ApiController]
  public class ProductsController : ControllerBase
  {
    private readonly DataContext _context;

    public ProductsController(DataContext context)
    {
      _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetProducts()
    {
      var products = await _context.Products
              .Include(z => z.ColorProducts)
              .ThenInclude(z => z.Color)
              .ToListAsync();


      if (products == null)
      {
        return NotFound();
      }

      return Ok(products);
    }


    [HttpPost("upsert")]
    public async Task<IActionResult> UpsertProduct([FromBody] ProductDto productDto)
    {
      if (productDto == null)
      {
        return BadRequest(new { message = "Product data is required." });
      }

      if (productDto.ColorId == null || !productDto.ColorId.Any())
      {
        return BadRequest(new { message = "At least one color must be specified for the product." });
      }

      // Validate if all color IDs exist
      var validColorIds = _context.Colors.Where(c => productDto.ColorId.Contains(c.Id)).Select(c => c.Id).ToList();
      if (validColorIds.Count != productDto.ColorId.Count)
      {
        return BadRequest(new { message = "One or more colors are invalid." });
      }

      Product product;

      if (productDto.Id == 0) 
      {
        product = new Product
        {
          Name = productDto.Name ?? "Default Name",
          Price = productDto.Price,
          StoreId = productDto.StoreId,

        };

        _context.Products.Add(product);
        await _context.SaveChangesAsync(); 

      }
      else // Existing product case
      {
        product = await _context.Products.FindAsync(productDto.Id);
        if (product == null)
        {
          return NotFound(new { message = "Product not found" });
        }

        // Update product details
        product.Name = productDto.Name ?? product.Name; // Keep current name if null is provided
        product.Price = productDto.Price;
        product.StoreId = productDto.StoreId;
        _context.Products.Update(product);

        // Remove current color associations before adding new ones
        var existingColors = _context.ColorProduct.Where(cp => cp.ProductId == product.Id);
        _context.ColorProduct.RemoveRange(existingColors);
        await _context.SaveChangesAsync(); // Important to save changes here
      }

      // Add new color associations
      foreach (var colorId in validColorIds)
      {
        _context.ColorProduct.Add(new ColorProduct { ColorId = colorId, ProductId = product.Id });
      }

      await _context.SaveChangesAsync(); // Save color associations

      return Ok(new { message = $"Product {(productDto.Id == 0 ? "created" : "updated")} successfully" });
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetProduct(int id)
    {
      var product = await _context.Products.FindAsync(id);
      if (product == null)
      {
        return NotFound(new { message = "Product not found" });
      }
      return Ok(product);
    }


    // DELETE: api/Products/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProduct(int id)
    {
      var Product = await _context.Products.FindAsync(id);
      if (Product == null)
      {
        return NotFound(new { message = "Product not found" });
      }

      _context.Products.Remove(Product);
      await _context.SaveChangesAsync();

      return Ok(new { message = "Color deleted successfully" });
    }
  

  public class ProductDto
    {
      public int Id { get; set; }
      public string? Name { get; set; }
      public decimal Price { get; set; }
      public int StoreId { get; set; }
      public List<int>? ColorId { get; set; }

    }



  }
}
