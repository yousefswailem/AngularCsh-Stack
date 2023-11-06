using AngularC_.Data;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Table.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Table.Controllers
{
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
      var products = await _context.Products.ToListAsync(); // Asynchronously get the list of products

      if (products == null)
      {
        return NotFound();
      }

      return Ok(products);
    }
    [HttpPost("upsert")]
    public async Task<IActionResult> UpsertProduct([FromBody] Product product, [FromBody] List<int> colorIds)
    {
      if (product == null)
      {
        return BadRequest(new { message = "Product data is null" });
      }

      // This is the correct way to check if the product exists in a many-to-many context
      var existingProduct = await _context.Products
          .Include(p => p.ProductColors)
          .FirstOrDefaultAsync(p => p.Id == product.Id);

      if (existingProduct == null)
      {
        // Add new product if it doesn't exist
        _context.Products.Add(product);
        await _context.SaveChangesAsync();

        // Add color relations for the new product
        foreach (var colorId in colorIds)
        {
          _context.ProductColor.Add(new ProductColor { ProductId = product.Id, ColorId = colorId });
        }
        await _context.SaveChangesAsync();
      }
      else
      {
        // Update existing product properties
        existingProduct.Name = product.Name;
        existingProduct.Price = product.Price;
        existingProduct.StoreId = product.StoreId;
        _context.Products.Update(existingProduct);

        // Update color relationships for existing product
        existingProduct.ProductColors.Clear(); // Remove existing relationships
        foreach (var colorId in colorIds)
        {
          existingProduct.ProductColors.Add(new ProductColor { ProductId = existingProduct.Id, ColorId = colorId });
        }
        await _context.SaveChangesAsync();
      }

      return Ok(new { message = "Product upsert successful" });
    }


  }
}
