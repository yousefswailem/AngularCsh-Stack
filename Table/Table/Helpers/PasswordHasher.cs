using System;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;

public class PasswordHasher
{
  // Hashes a password
  public static string HashPassword(string password)
  {
    // Generate a random salt
    byte[] salt = new byte[128 / 8];
    using (var rng = RandomNumberGenerator.Create())
    {
      rng.GetBytes(salt);
    }

    // Derive a 256-bit subkey (use HMACSHA256 with 100,000 iterations)
    string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
        password: password,
        salt: salt,
        prf: KeyDerivationPrf.HMACSHA256,
        iterationCount: 100000,
        numBytesRequested: 256 / 8));

    // Return the salt and the hashed password, concatenated
    return $"{Convert.ToBase64String(salt)}:{hashed}";
  }

  // Verifies a password against a hash
  public static bool VerifyPassword(string hashedPassword, string password)
  {
    var parts = hashedPassword.Split(':');
    if (parts.Length != 2)
    {
      throw new FormatException("Invalid hashed password format.");
    }

    var salt = Convert.FromBase64String(parts[0]);
    var hash = parts[1];

    // Derive a 256-bit subkey (use HMACSHA256 with 100,000 iterations)
    string testHash = Convert.ToBase64String(KeyDerivation.Pbkdf2(
        password: password,
        salt: salt,
        prf: KeyDerivationPrf.HMACSHA256,
        iterationCount: 100000,
        numBytesRequested: 256 / 8));

    return hash == testHash;
  }
}
